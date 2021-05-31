import { Button } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { Redirect, RouteComponentProps } from "react-router";
import Column from "../components/Column";
import ProfileUpload from "../components/ProfileUpload";
import Row from "../components/Row";
import StorageService from "../services/StorageService";
import UserService from "../services/UserService";
type Props = { uploadClick: () => void } & RouteComponentProps;
type State = {
    orderAddress: any;
    line1: string;
    line2: string;
    city: string;
    state: string;
    pincode: number;
    changed: boolean;
    productsFromApi: any;
    orderDate: any;
    shippingDate: any;
    orderIds: any;
    userProfileImage: string;
    userName: string;
    userEmail: string;
    hide: boolean;
    profileImage: any;
};

class Orders extends React.Component<Props, State> {
    state: State = {
        orderAddress: [],
        line1: "",
        line2: "",
        city: "",
        state: "",
        pincode: 0,
        changed: false,
        productsFromApi: [],
        orderIds: [],
        orderDate: [],
        shippingDate: [],
        userProfileImage: "",
        userName: "",
        userEmail: "",
        hide: true,
        profileImage: "",
    };

    ordersData = [];

    async componentDidMount() {
        this.getData();
    }

    getData = async () => {
        this.setState({ productsFromApi: [] });
        this.setState({ orderIds: [] });
        this.setState({ orderDate: [] });
        this.setState({ shippingDate: [] });
        this.setState({
            hide: true,
        });

        try {
            const { data } = await UserService.profile();
            this.setState({ userName: data.userName.toUpperCase() });
            this.setState({ userEmail: data.userEmail });
            this.setState({ userProfileImage: data.profileImage });

            data.order.map((data: any) => {
                this.setState({
                    productsFromApi: [
                        ...this.state.productsFromApi,
                        JSON.parse(data.products),
                    ],
                });

                if (data.isCancelled == false) {
                    this.setState({
                        orderIds: [
                            ...this.state.orderIds,
                            JSON.parse(data.orderId),
                        ],
                    });
                } else {
                    this.setState({
                        orderIds: [...this.state.orderIds, 0],
                    });
                }

                this.setState({
                    orderDate: [...this.state.orderDate, data.orderDate],
                });

                this.setState({
                    shippingDate: [
                        ...this.state.shippingDate,
                        data.shippingDate,
                    ],
                });
            });

            this.setState({ orderAddress: data.address });
        } catch (e) {
            console.log(e.response.data);
        }

        axios
            .get(
                `http://localhost:5000/auth/profileImage/${this.state.userProfileImage}`
            )
            .then((response) =>
                this.setState({
                    profileImage: response.request.responseURL,
                })
            );
    };

    addAddress = (e: any) => {
        e.preventDefault();
        let dataPass = {
            line1: this.state.line1,
            line2: this.state.line2,
            city: this.state.city,
            state: this.state.state,
            pincode: this.state.pincode,
        };

        return StorageService.getData("token").then((token) =>
            axios
                .post("http://localhost:5000/address", dataPass, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(() => {
                    this.getData();
                })
        );
    };

    delete = (e: any) => {
        let deleteId = e.target.value;
        return StorageService.getData("token").then((token) =>
            axios
                .delete(`http://localhost:5000/address/${deleteId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(() => {
                    this.getData();
                })
        );
    };

    redirecting = () => {
        if (this.state.changed === true) {
            return <Redirect to="/profile" />;
        }
    };

    cancelOrder = (e: any) => {
        let cancelId = parseInt(e.target.value);
        console.log(cancelId);

        let dataPass = {
            isCancelled: true,
        };

        return StorageService.getData("token").then((token) =>
            axios
                .patch(`http://localhost:5000/order/${cancelId}`, dataPass, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(() => {
                    this.getData();
                })
        );
    };

    iconClicked = () => {
        this.setState({
            hide: false,
        });
    };

    render() {
        return (
            <>
                {this.redirecting()}
                <Row>
                    
                    <h3 className="text-center mt-5">My Orders</h3>
                   
                     <div className="col-md-8  text-center">
                        {this.state.productsFromApi.map(
                            (data: any, index: number) => (
                                <Row>
                                    <div className="offset-md-1 shadow-sm border p-2 text-center rounded mt-2 p-3">
                                        <h3>Order {index + 1}</h3>
                                        <h4>
                                            Order Date :{" "}
                                            {new Date(
                                                this.state.orderDate[index]
                                            ).toLocaleString()}
                                        </h4>
                                        {data.map((data: any) => (
                                            <>
                                                <tr
                                                    className={
                                                        this.state.orderIds[
                                                            index
                                                        ] == 0
                                                            ? " flexDisplay"
                                                            : " flexDisplay"
                                                    }
                                                >
                                                    <td className="imageDivThum p-2 flex-auto flexDisplay">
                                                        <img
                                                            className="img-thumbnail"
                                                            src={
                                                                data.productImage
                                                            }
                                                        />
                                                    </td>
                                                    <td className="full-width col-4">
                                                        <p>
                                                            {" "}
                                                            <b>Product Name</b>
                                                        </p>
                                                        {data.productName}
                                                    </td>
                                                    <td className="full-width col-2">
                                                        <p>
                                                            <b>Price Per Qty</b>
                                                        </p>
                                                        {data.productSalePrice}
                                                    </td>
                                                    <td className="full-width col-2">
                                                        <p>
                                                            <b>
                                                                Product Quantity
                                                            </b>
                                                        </p>
                                                        {data.productQty}
                                                    </td>
                                                    <td className="full-width col-2">
                                                        <p>
                                                            <b>Total Amount</b>
                                                        </p>
                                                        {data.productSalePrice *
                                                            data.productQty}
                                                    </td>
                                                </tr>
                                            </>
                                        ))}
                                        {this.state.orderIds[index] == 0 ? (
                                            <Button className=" shadow-sm border p-2">
                                                Order Cancelled
                                            </Button>
                                        ) : (
                                            <button
                                                value={
                                                    this.state.orderIds[index]
                                                }
                                                onClick={this.cancelOrder}
                                                className="btn btn-danger"
                                            >
                                                Cancel Order
                                            </button>
                                        )}
                                    </div>
                                </Row>
                            )
                        )}
                    </div>

                </Row>
                
            </>
        );
    }
}
export default Orders;
