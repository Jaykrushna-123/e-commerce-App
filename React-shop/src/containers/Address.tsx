import axios from "axios";
import React from "react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import Column from "../components/Column";
import Row from "../components/Row";
import StorageService from "../services/StorageService";
import ProfileUpload from "../components/ProfileUpload";
import UserService from "../services/UserService";
type Props = {} & RouteComponentProps;
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

class Profile extends React.Component<Props, State> {
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
            console.log(data.address);
            console.log(data.order);
            this.setState({ userName: data.userName.toUpperCase() });
            this.setState({ userEmail: data.userEmail });

            data.order.map((data: any, index: number) => {
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

            // this.state.productsFromApi.map((data) => console.log(data));
            console.log(this.state.productsFromApi);
            console.log(this.state.orderIds);

            this.setState({ orderAddress: data.address });
        } catch (e) {
            console.log(e.response.data);
        }
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
                  

                    <Column size={12}>
                        <h1 className="pt-5 mt-2 text-center" >Address</h1>
                        <div className="bg-light-gray text-center">
                            {this.state.orderAddress.map((data: any) => (
                                <div
                                    className="container order bg-gray m-5 p-3 text-capitalize"
                                    id={data.id}
                                    key={data.id}
                                >
                                    <h5>
                                        {data.firstName !== null ? (
                                            <p>
                                                NAME: {data.firstName}{" "}
                                                {data.lastName}
                                            </p>
                                        ) : null}
                                        {data.mobileNo !== null ? (
                                            <p>Mobile No: {data.mobileNo}</p>
                                        ) : null}
                                        ADDRESS: {data.line1}
                                        {data.line2} , {data.city}, {data.state}{" "}
                                        ,{data.pincode}
                                    </h5>
                                    <button
                                        onClick={this.delete}
                                        value={data.id}
                                        className="btn btn-danger"
                                    >
                                        DELETE
                                    </button>
                                </div>
                            ))}
                        </div>
                    </Column>
                </Row>
                <Row>
                    <Column size={2}></Column>
                    <Column size={8}>
                        <form className="offset-md-1 shadow-sm border p-2 text-start rounded mt-2"  onSubmit={this.addAddress}>
                            <div className="mb-2">
                                Address 1
                                <input
                                    type="text"
                                    className="form-control"
                                    id="line1"
                                    value={this.state.line1}
                                    placeholder="line1"
                                    onChange={(e: any) =>
                                        this.setState({ line1: e.target.value })
                                    }
                                ></input>
                            </div>

                            <div className="mb-3">
                                Address (Flat, House no., Building, Company, Apartment)
                                <input
                                    type="text"
                                    className="form-control"
                                    id="line2"
                                    value={this.state.line2}
                                    placeholder="line2"
                                    onChange={(e: any) =>
                                        this.setState({ line2: e.target.value })
                                    }
                                ></input>
                            </div>

                            <div className="mb-3">
                                City
                                <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    value={this.state.city}
                                    placeholder="city"
                                    onChange={(e: any) =>
                                        this.setState({ city: e.target.value })
                                    }
                                ></input>
                            </div>

                            <div className="mb-3">
                                State
                                <input
                                    type="text"
                                    className="form-control"
                                    id="state"
                                    value={this.state.state}
                                    placeholder="state"
                                    onChange={(e: any) =>
                                        this.setState({ state: e.target.value })
                                    }
                                ></input>
                            </div>

                            <div className="mb-3">
                                PinCode
                                <input
                                    type="text"
                                    className="form-control"
                                    id="pincode"
                                    value={this.state.pincode}
                                    placeholder="pincode"
                                    onChange={(e: any) =>
                                        this.setState({
                                            pincode: e.target.value,
                                        })
                                    }
                                ></input>
                            </div>
                            <button className="btn btn-success ">
                                Add Address
                            </button>
                        </form>
                    </Column>
                    <Column size={2}></Column>
                </Row>
            </>
        );
    }
}
export default Profile;
