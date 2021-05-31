import React, { RefObject, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { CartType } from "../types";
import { Redirect, RouteComponentProps } from "react-router";
import axios from "axios";
import StorageService from "../services/StorageService";
import Column from "../components/Column";
import Row from "../components/Row";

type Props = { cartData: any } & RouteComponentProps;
type State = {
    paymentMethod: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    address: string;
    country: string;
    state: string;
    zip: number;
    reRender: boolean;
};
class Checkout extends React.Component<Props, State> {
    emailRef: RefObject<HTMLInputElement>;
    state: State = {
        paymentMethod: "",
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        address: "",
        country: "",
        state: "",
        zip: 0,
        reRender: false,
    };
    constructor(props: any) {
        super(props);
        this.emailRef = React.createRef<HTMLInputElement>();
    }

    totalPrice = 0;

    blur = (e: any) => {
        if (e.target.value === "") {
            e.target.style.borderColor = "red";
        } else {
            e.target.style.borderColor = "green";
        }
    };


    formSubmitting = (e: any) => {
        e.preventDefault();
        let emailValid = this.emailValidate();
        let mobileValid = this.mobileValidate();
        if (emailValid === true && mobileValid === true) {
             

            let paymentDataPass = {
                amountPaid: this.totalPrice,
                paymentMethod: this.state.paymentMethod,
            };
            let dataPass = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                mobileNo: JSON.parse(this.state.mobile),
                line1: this.state.address,
                city: this.state.country,
                state: this.state.state,
                pincode: this.state.zip,
            };

            StorageService.getData("token").then((token) =>
                axios.post("http://localhost:5000/payment", paymentDataPass, {
                    headers: { Authorization: `Bearer ${token}` },
                })
            );
            return StorageService.getData("token").then((token) =>
                axios
                    .post("http://localhost:5000/address", dataPass, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((res) =>
                        res.status === 201
                            ? this.setState({ reRender: true })
                            : this.setState({ reRender: false })
                    )
            );
        } else {
            alert("Order Place successfully");
        }
    };

    emailValidate = () => {
        let validRegex: any =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (this.state.email.match(validRegex)) {
            return true;
        } else {
            return false;
        }
    };

    mobileValidate = () => {
        let phoneno = /^\d{10}$/;
        if (
            this.state.mobile.match(phoneno)
        ) {
            return true;
        } else {
            return false;
        }
    };

    redirecting = () => {
        if (this.state.reRender === true) {
            return <Redirect to="/" />;
        }
    };

    render() {
        this.totalPrice = 0;
        return (
            <>
                <h1 className= " text-center" >Place Order</h1>
                {this.redirecting()}
                <Row>
                    <Column size={6}
                        classes={
                            "offset-md-1 shadow-sm border p-2 text-center rounded mt-2" }>
                            <h3>Billing address</h3>
                            <hr></hr>
                            <form
                                className="needs-validation"
                                id="form2"
                                onSubmit={this.formSubmitting} >
                                <div className="row mt-3 ">
                                
                                        <label>
                                            <h6 className="text-start">First name</h6>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="firstName"
                                                name="firstName"
                                                placeholder="First name"
                                                value={this.state.firstName}
                                                required
                                                onChange={(e: any) => {
                                                    this.setState({
                                                        firstName:
                                                            e.target.value,
                                                    });
                                                }}
                                                onBlur={this.blur}
                                            />
                                        </label>
                                    
                                 
                                        <label>
                                        <h6 className="text-start">Last name</h6>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="lastName"
                                                name="lastName"
                                                placeholder="Last name"
                                                value={this.state.lastName}
                                                required
                                                onChange={(e: any) => {
                                                    this.setState({
                                                        lastName:
                                                            e.target.value,
                                                    });
                                                }}
                                                onBlur={this.blur}
                                            />
                                        </label>
                                    <label>
                                    <h6 className="text-start">Email</h6>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={this.state.email}
                                            placeholder="Enter your Email"
                                            required
                                            onChange={(e: any) => {
                                                this.setState({
                                                    email: e.target.value,
                                                });
                                            }}
                                            onBlur={this.blur}
                                        />
                                    </label>

                                    <label>
                                    <h6 className="text-start"> Mobile number</h6>
                                   
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="mobile"
                                            name="mobile"
                                            value={this.state.mobile}
                                            placeholder="Mobile"
                                            required
                                            onChange={(e: any) => {
                                                this.setState({
                                                    mobile: e.target.value,
                                                });
                                            }}
                                            onBlur={this.blur}
                                        />
                                    </label>
                                      <label>
                                      <h6 className="text-start"> Flat, House no., Building, Company, Apartment</h6>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            name="address"
                                            value={this.state.address}
                                            placeholder="Address"
                                            required
                                            onChange={(e: any) => {
                                                this.setState({
                                                    address: e.target.value,
                                                });
                                            }}
                                            onBlur={this.blur}
                                        />
                                    </label>
                                        <label>
                                        <h6 className="text-start"> Town/City</h6>
                                            <select
                                                className="custom-select d-block w-100"
                                                id="country"
                                                name="country"
                                                value={this.state.country}
                                                required
                                                onChange={(e: any) => {
                                                    this.setState({
                                                        country: e.target.value,
                                                    });
                                                }}
                                                onBlur={this.blur}>
                                                <option value="">
                                                  Select  City
                                                </option>
                                                <option value="Mumbai">
                                                    Mumbai
                                                </option>
                                                <option value="Bangalore">
                                                    Bangalore
                                                </option>
                                                <option value="Bhubaneswar">
                                                    Bhubaneswar
                                                </option>
                                            </select>
                                        </label>
                                        </div>

                                        <hr></hr>
                                <h3 >Payment</h3>
                                <hr></hr>
                 
                        <label>
                            Payment Method{" "}
                            <select
                                className="custom-select d-block w-100"
                                id="paymentMethod"
                                name="paymentMethod"
                                value={this.state.paymentMethod}
                                required
                                onChange={(e: any) => {
                                    this.setState({
                                        paymentMethod: e.target.value,
                                    });
                                    console.log(e.target.value);
                                }}
                                onBlur={this.blur} >

                                <option value="">Choose</option>
                                <option value="Cash">Cash on delivery</option>

                                <option value="UPI">
                                    BHIM UPI
                                </option>
                                <option value="Debit">
                                    Debit Card
                                </option>
                                <option value="Credit">
                                    Credit Card
                                </option>
                            </select>
                        </label>
                              <button
                                    className="btn btn-success mt-5 "
                                    id="btn"
                                    //  onSubmit={this.formSubmitting}
                                >
                                    Continue to checkout
                                </button>
                            </form>
                            </Column>
                        
                        <div className="col-md-4 order-md-2 mb-4 after_order">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">Your cart</span>
                                {/* <span className="badge badge-secondary badge-pill">
                                    3
                                </span> */}
                            </h4>
                            <ul className="list-group mb-3">
                                {this.props.cartData.cart.map((data) =>
                                    data.productQty > 0 ? (
                                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                                            <div>
                                                <h6 className="my-0">
                                                    {data.productName}
                                                </h6>
                                            </div>
                                            <span className="text-muted">
                                                Qty {data.productQty}
                                            </span>
                                            <span className="text-muted">
                                                INR{" "}
                                                {data.productSalePrice *
                                                    data.productQty}
                                            </span>
                                            <span style={{ display: "none" }}>
                                                {
                                                    (this.totalPrice =
                                                        this.totalPrice +
                                                        data.productSalePrice *
                                                            data.productQty)
                                                }
                                            </span>
                                        </li>
                                    ) : null
                                )}

                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Total (INR)</span>
                                    <strong>INR {this.totalPrice}</strong>
                                </li>
                            </ul>
                        </div>
                        </Row>
            </>
        );
    }
}

const mapStoreToProps = (store: CartType) => {
    return {
        cartData: store,
    };
};

export default connect(mapStoreToProps, null)(Checkout);
