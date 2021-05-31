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
// type uploadFile = () => void;
class Upload extends React.Component<Props, State> {
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

                // this.ordersData.push()

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
                    <h2 className="text-primary mb-4">Profile Upload</h2>
                    <Column size={12}>
                        <div className="container user text-center">
                            <div className="profileImage" id="profileImage">
                                <img
                                    src={this.state.profileImage}
                                    alt="Profile Image"
                                    className="img-thumbnail"
                                    width="250px"
                                />

                                <i
                                    className="fas fa-upload"
                                    onClick={this.iconClicked}
                                ></i>
                                {this.state.hide ? null : (
                                    <ProfileUpload getData={this.getData} />
                                )}
                            </div>
                            
                        </div>
                    </Column>

                </Row>
                
            </>
        );
    }
}
export default Upload;
