import React, { Component } from 'react'
import { login } from './service'
import { connect } from "react-redux";
import Validator from "validator"
import { Link } from 'react-router-dom'
class Login extends Component {
    state = {
        data: {
            EmailId:'',
           Password:''
        },
        edit: false,
        errors: {}
    }

    resetForm = () => {
        this.setState({
             data: {
            EmailId:'',
           Password:''
        },
            errors:{}
        })
    }
    validate = data => {
        const errors = {};
        if (Validator.isEmpty(data.EmailId)) {
            errors.EmailId ='email id cannot be empty';
        }
        if (Validator.isEmpty(data.Password)) {
            errors.Password ='password id cannot be empty';
        }
        return errors;
    };

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
          if (Object.keys(errors).length === 0) {
            this.props.submit(this.state.data)
                .then(res => {
                    this.props.navigation('/admin/user')
                })
              .catch(err => {
                let globalErrors = { global: err.response.data.errors.global };
                this.setState({ errors: globalErrors })
              });
          }
    };
    render() {
        const { data,  errors } = this.state
        return (
            <main className="main d-flex w-100">
                <div className="container d-flex flex-column">
                    <div className="row h-100">
                        <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                            <div className="d-table-cell align-middle">
                                <div className="text-center mt-4">
                                    <p className="lead">
                                        Sign in to your account to continue
                                    </p>
                                </div>
                                <div className="card">
                                    {errors.global && <div className="alert alert-danger text-center" style={{ margin: "20px", borderRadius: "5px", padding: "15px" }}>{errors.global}</div>}
                                    <div className="card-body">
                                        <div className="m-sm-4">
                                            <form  onSubmit={this.handleSubmit}>
                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <input className="form-control form-control-lg" type="email" onChange={this.handleChange} name="EmailId" placeholder="Enter your email" />
                                                    {errors.EmailId && <span className="messages ">{errors.EmailId}</span>}
                                                    </div>
                                                <div className="form-group">
                                                    <label>Password</label>
                                                    <input className="form-control form-control-lg" type="password" onChange={this.handleChange} name="Password" placeholder="Enter your password" />
                                                    {errors.Password && <span className="messages ">{errors.Password}</span>}
                                                  {/* {  <small>
                                                        <Link to={"#"} >Forgot password?</Link>
                                                    </small>} */}
                                                </div>
                                                <div className="text-center mt-3">
                                                    <button type="submit" class="btn btn-lg btn-primary">Sign in</button>
                                                </div>
                                                 <small>
                                                        <Link to="/signup" >create new account</Link>
                                                    </small>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        //getBrandList: () => dispatch(getBrandList()),
        submit: (data) => dispatch(login(data)),
    }
}
export default connect(null, mapDispatchToProps)(Login)