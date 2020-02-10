import React, { Component } from 'react';
import { MSG } from '../../../config/language';
import Validator from "validator"

export default class Modal extends Component {
    state = {
        data: {
          AdminId:'',
          firstName:'',
          lastName:'',
          EmailId:'',
          Password:'',
          Gender:'',
          Dob:'',
          Department:'',
          Address:'',
          City:'',
          scheduleid:'',
          Phonenumber:''
        },
        edit: false,
        errors: {}
    }

    resetForm = () => {
        this.setState({
            data: {
                AdminId:'',
                firstName:'',
                lastName:'',
                EmailId:'',
                Password:'',
                Gender:'',
                Dob:'',
                Department:'',
                Address:'',
                City:'',
                scheduleid:'',
                Phonenumber:''
            },
            edit: false, 
            errors:{}
        })
    }

    modalClose = () => {
        this.resetForm();
        this.props.modalClose();
    }

    validate = data => {
        const errors = {};
        if (Validator.isEmpty(data.name)) {
            errors.firstName = MSG['name_cannot_empty'];
        }
        return errors;
    };

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
          if (Object.keys(errors).length === 0) {
            this.props.submit(this.state.data)
              .catch(err => {
                let globalErrors = { global: err.response.data.errors.global };
                this.setState({ errors: globalErrors })
              });
          }
    };

    handleUpdate = e => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
          if (Object.keys(errors).length === 0) {
            this.props.submit(this.state.data)
              .catch(err => {
                let globalErrors = { global: err.response.data.errors.global };
                this.setState({ errors: globalErrors })
              });
          }
    }
    handleChange = e => {
        this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } })
    }

    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     let editData = nextProps.edit
    //     if (Object.keys(editData).length !== 0) {
    //         this.setState({
    //             data: {
    //                 ...this.state.data,
    //                 name: editData.name
    //             },
    //             edit: true
    //         })
    //     }
    // }

    render() {
        const { data, edit, errors } = this.state
        let style, show;
        show = this.props.modalOpen ? 'show' : ''
        style = this.props.modalOpen ? { display: 'block', paddingLeft: '17px',     overflow: 'scroll' } : { display: 'none' }

        return (
            <div className={`modal fade ${show}`} id="sizedModalLg" tabIndex={-1} style={style} role="dialog" aria-modal="true">
                {errors.global && <div className="alert alert-danger text-center" style={{ margin: "20px", borderRadius: "5px", padding: "15px" }}>{errors.global}</div>}
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">New User</h5>
                            <button type="button" className="close" onClick={() => this.modalClose()} data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form className="form" onSubmit={this.handleSubmit}>
                            <div className="modal-body m-3">

                                <div className="form-group ">
                                    <label className="form-label">firstName</label>
                                    <input type="text" className="form-control textBox"  name="firstName" onChange={this.handleChange} placeholder="Name" />
                                    {errors.firstName && <span className="messages ">{errors.firstName}</span>}
                                </div>
                                <div className="form-group ">
                                    <label className="form-label">lastName</label>
                                    <input type="text" className="form-control textBox"  name="lastName" onChange={this.handleChange} placeholder="Name" />
                                </div>
                                <div className="form-group ">
                                    <label className="form-label">Password</label>
                                    <input type="text" className="form-control textBox"  name="Password" onChange={this.handleChange} placeholder="Name" />
                                </div>
                                <div className="form-group ">
                                    <label className="form-label">Gender</label>
                                    <input type="text" className="form-control textBox"  name="Gender" onChange={this.handleChange} placeholder="Name" />
                                </div>
                                <div className="form-group ">
                                    <label className="form-label">Dob</label>
                                    <input type="text" className="form-control textBox"  name="Dob" onChange={this.handleChange} placeholder="Name" />
                                </div>
                                <div className="form-group ">
                                    <label className="form-label">Department</label>
                                    <input type="text" className="form-control textBox"  name="Department" onChange={this.handleChange} placeholder="Name" />
                                </div>
                                <div className="form-group ">
                                    <label className="form-label">Address</label>
                                    <input type="text" className="form-control textBox"  name="Address" onChange={this.handleChange} placeholder="Name" />
                                </div>
                                <div className="form-group ">
                                    <label className="form-label">City</label>
                                    <input type="text" className="form-control textBox"  name="City" onChange={this.handleChange} placeholder="Name" />
                                </div>
                                <div className="form-group ">
                                    <label className="form-label">scheduleid</label>
                                    <input type="text" className="form-control textBox"  name="scheduleid" onChange={this.handleChange} placeholder="Name" />
                                </div>
                                <div className="form-group ">
                                    <label className="form-label">Phonenumber</label>
                                    <input type="text" className="form-control textBox"  name="Phonenumber" onChange={this.handleChange} placeholder="Name" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => this.modalClose()} data-dismiss="modal">Close</button>
                                {
                                    edit ? <button type="button" onClick={this.handleUpdate} className="btn btn-primary">Update</button>
                                        : (
                                            <div>
                                                <button type="submit" className="btn btn-primary">Save</button> {''}
                                            </div>
                                        )
                                }
                            </div>
                        </form>
                    </div>
                </div>
                {this.props.modalOpen && <div className="modal-backdrop fade show" />}
            </div>

        )
    }
}
