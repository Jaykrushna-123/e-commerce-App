import axios from "axios";
import React from "react";
import {  Redirect} from "react-router-dom";
import Column from "../components/Column";
import Row from "../components/Row";


type RegisterState = {
    email: any;
    name: any;
    password: any;
    conformpassword: any;
    redirect: boolean;
};
class Register extends React.Component {
    state: RegisterState = {
        email: "",
        name: "",
        password: "",
        conformpassword: "",
        redirect: false,
    };

    submitting = (e: any) => {
        e.preventDefault();

        if (this.state.conformpassword === this.state.password) {
            const user = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
            };
            axios.post("http://localhost:5000/auth/register", user).then(
                (response) => console.log(response.status === 201)
                // history.state("/login")
            );
            this.setState({ redirect: true });
        }
    };

    redirecting = () => {
        if (this.state.redirect) {
            return <Redirect to="/login" />;
        }
    };

    change = (event: any) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        return (

            <Row>
                <Column size={4}
                        classes={
                            "offset-md-4 shadow-sm border p-4 text-center rounded mt-5"
                        }>
            <div className=" ">
                {this.redirecting()}
                <h2>Register</h2>
                <hr />
                        <form onSubmit={this.submitting}>
                         
                                <div className="col-md-12">
                                
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Your Name *"
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.change}
                                        />
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Email Id *"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.change}
                                        />
                            </div>
                                <div className="col-md-12"><input
                                            type="password"
                                            className="form-control"
                                            placeholder="Your Password *"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.change}/>
                                         <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Confirm Password *"
                                            name="conformpassword"
                                            value={this.state.conformpassword}
                                            onChange={this.change}/>
                                        {this.state.conformpassword ===
                                        this.state.password ? null : (
                                            <p>Password is not Matching</p>
                                        )}
                                </div>         
                            <button className={"btn btn-success w-100 text-uppercase"}>Submit</button>
                        </form>
            </div>
            </Column>
            </Row>
        );
    }
}

export default Register;
