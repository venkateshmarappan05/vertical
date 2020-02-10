import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class index extends Component {
    state = {
        menu: false
    }

    toggleMenu = e => {
        e.preventDefault();
        this.setState({ menu: !this.state.menu })
    }
    render() {
        return (
            <nav id="sidebar" className="sidebar">
                <div className="sidebar-content ">
                    <Link to="/" className="sidebar-brand" >
                        {/* <img src={logo}/> */}
                    </Link>
                    <ul className="sidebar-nav">
                        
                        <li className="sidebar-item active">
                            <Link to="/" className="sidebar-link">
                                <i className="fa fa-user align-middle" /> <span className="align-middle">User</span>
                            </Link>
                        </li>
                        {/* {
                        <li className="sidebar-item">
                            <Link to="/inventory" className="sidebar-link">
                                <i className="fa fa-file-o align-middle" aria-hidden="true" /> <span className="align-middle">Inventory</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link to="/transction" className="sidebar-link">
                                <i className="fa fa-truck align-middle" /> <span className="align-middle">Transction</span>
                            </Link>
                        </li>
                        <li className="sidebar-header">
                            Master
                     </li>
                        <li className="sidebar-item">
                            <div onClick={this.toggleMenu} data-toggle="collapse" className={`sidebar-link ${!this.state.menu ? 'collapsed' : ''}`} aria-expanded={this.state.menu} >
                                <i className="fa fa-th-large align-middle" aria-hidden="true" /> <span className="align-middle">Master</span>
                            </div>
                            <ul id="ui" className={`sidebar-dropdown list-unstyled ${this.state.menu ? 'collapsed show' : "collapse"} `} data-parent="#sidebar">
                                <li className="sidebar-item"><Link className="sidebar-link" to={"/master/brand"}>Brand</Link></li>
                                <li className="sidebar-item"><Link className="sidebar-link" to="/master/category">Category</Link></li>
                                <li className="sidebar-item"><Link className="sidebar-link" to="/master/customer">Customer</Link></li>
                                <li className="sidebar-item"><Link className="sidebar-link" to="/master/user">User</Link></li>
                                <li className="sidebar-item"><Link className="sidebar-link" to="/master/product">Product</Link></li>
                            </ul>
                        </li>} */}
                    </ul>
                </div>
            </nav>
        )
    }
}
