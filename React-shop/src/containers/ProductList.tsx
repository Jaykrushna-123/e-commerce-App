import React from "react";
import Column from "../components/Column";
import Product from "../components/Product";
import Row from "../components/Row";
import ProductService from "../services/ProductService";
import { ProductType, StoreType } from "../types";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import CartActions from "../store/actions/CartActions";
import Paginate from "../components/Paginate";
import LoadingWrapper from "../components/LoadingWrapper";
import LoadingActions from "../store/actions/LoadingActions";
import classes from "../components/Filter.module.css";
import { Slider } from "@material-ui/core";

type Props = {
    selectedCurrency: string;
    showLoader: () => void;
    hideLoader: () => void;
    addItem: (product: ProductType) => void;
    selecterSearch: string;
} & RouteComponentProps;
type State = {
    plist: ProductType[];
    totalPages: number;
    pageNumber: number;
    value: any;
    searchData: string;
    sortName: string;
    sortPrice: string;
};
class ProductList extends React.PureComponent<Props, State> {
    state: State = {
        plist: [],
        totalPages: 0,
        pageNumber: 1,
        value: [0, 100000],
        searchData: "",
        sortName: "productId",
        sortPrice: "ASC",
    };
    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps, prevState) {
        // this.getData();
        if (this.props.selecterSearch !== prevProps.selecterSearch) {
            this.getData();
        }
        if (
            this.state.sortName !== prevState.sortName ||
            this.state.sortPrice !== prevState.sortPrice
        ) {
            this.getData();
        }
    }

    async getData() {
        try {
            this.props.showLoader();
            const { data } = await ProductService.getProducts(
                this.state.pageNumber,
                this.state.value[0],
                this.state.value[1],
                this.props.selecterSearch,
                this.state.sortName,
                this.state.sortPrice
            );
            this.setState({
                plist: data.data,
                totalPages: data.totalPages,
                pageNumber: data.currentPage,
            });
            this.props.hideLoader();
        } catch (e) {
            console.log("error", e);
            this.props.hideLoader();
        }
    }
    addToCart(product: ProductType) {
        this.props.addItem(product); // add to cart logic
        this.props.history.push("/cart"); // redirect to cart page
    }
    updateData = (page: number) =>
        this.setState({ pageNumber: page }, () => this.getData());

    rangeSelector = (event: any, newValue: any) => {
        this.setState({ value: newValue });
        this.getData();
    };

    changeRedux = () => {
        this.getData();
    };

    sort = (e: any) => {
        console.log(e.target.value);
        if (e.target.value === "PriceLowHigh") {
            this.setState({ sortName: "productSalePrice" });
            this.setState({ sortPrice: "ASC" });
        } else if (e.target.value === "PriceHighLow") {
            this.setState({ sortName: "productSalePrice" });
            this.setState({ sortPrice: "DESC" });
        } else if (e.target.value === "NameLowHigh") {
            this.setState({ sortName: "productName" });
            this.setState({ sortPrice: "ASC" });
        } else if (e.target.value === "NameHighLow") {
            this.setState({ sortName: "productName" });
            this.setState({ sortPrice: "DESC" });
        } else {
            this.setState({ sortName: "productId" });
            this.setState({ sortPrice: "nodata" });
        }
    };

    render() {
        console.log(this.props.selecterSearch);
        // this.getData();
        this.setState({ searchData: this.props.selecterSearch });

        return (
            <>

                <h3 className={classes.head}>FILTER</h3>
                <div className={classes.slidermain}>
                    <Slider
                        max={100000}
                        value={this.state.value}
                        onChange={this.rangeSelector}
                        valueLabelDisplay="auto"
                    />
                    <h5 className="text-primary">
                        {this.state.value[0]}-{this.state.value[1]}
                    </h5>
                    <div className={classes.sort}>
                    <select name="sort" id="sort" onChange={this.sort}>
                        <option value="">-- SORT By Price --</option>
                        <option value="PriceLowHigh">Low-High</option>
                        <option value="PriceHighLow">High-Low</option>
                   
                    </select>
                   
                    <select name="sort" id="sort" onChange={this.sort}>
                        <option value="">-- SORT By Name --</option>
                        
                        <option value="NameLowHigh">ASC</option>
                        <option value="NameHighLow">DES</option>
                    </select>
                    </div>
                </div>
                <LoadingWrapper>
                    <Row>
                        {this.state.plist.map((val) =>
                            JSON.parse(val.productSalePrice) >
                                this.state.value[0] &&
                            JSON.parse(val.productSalePrice) <
                                this.state.value[1] ? (
                                <Column
                                    size={3}
                                    classes={"my-3"}
                                    key={val.productId}
                                >
                                    <Product
                                        btnClick={() => this.addToCart(val)}
                                        pdata={val}
                                        key={val.productId}
                                        currencyCode={
                                            this.props.selectedCurrency
                                        }
                                    />
                                    {console.log(val.productPrice)}
                                </Column>
                            ) : null
                        )}
                        <Column size={12} classes={"text-center"}>
                            <Paginate
                                itemCountPerPage={10}
                                totalPages={this.state.totalPages}
                                currentPage={this.state.pageNumber}
                                changePage={this.updateData}
                            />
                        </Column>
                    </Row>
                </LoadingWrapper>
            </>
        );
    }
}

const mapStoreToProps = (store: StoreType) => {
    return {
        selectedCurrency: store.currency,
        selecterSearch: store.search,
    };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        hideLoader: () => dispatch(LoadingActions.hideLoader()),
        showLoader: () => dispatch(LoadingActions.showLoader()),
        addItem: (p: ProductType) => dispatch(CartActions.addToCart(p)),
    };
};
export default connect(mapStoreToProps, mapDispatchToProps)(ProductList);
