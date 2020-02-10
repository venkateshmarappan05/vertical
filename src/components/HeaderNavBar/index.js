import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
    }
    toggleMenu() {
        this.setState({ menu: !this.state.menu })
    }
    componentDidMount() {
        document.body.addEventListener('click', this.handleGlobalClick);
    }
    handleGlobalClick = e => {
        if(e.target.id !== 'megaMenu'){
            this.setState({
                menu: false
            })
        }
    }
    render() {
        return (
            <nav className="navbar navbar-expand navbar-light bg-white">
                <Link to={"#"} className="sidebar-toggle d-flex mr-2">
                    <i className="hamburger align-self-center" />
                </Link>
                {/* <form className="form-inline d-none d-sm-inline-block">
                    <input className="form-control form-control-no-border mr-sm-2" type="text" placeholder="Search projects..." aria-label="Search" />
                </form> */}
                <div className="navbar-collapse collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className={`nav-item dropdown ${this.state.menu ? 'show' : ''}`} >
                            <Link to={"#"}  onClick={this.toggleMenu} className="nav-link dropdown-toggle d-none d-sm-inline-block" data-toggle="dropdown">
                                <i className="align-middle" data-feather="users" /> {' '}
                                <span id="megaMenu" className="align-middle">User Name</span>
                            </Link>
                            <div className={`dropdown-menu dropdown-menu-right ${this.state.menu ? 'show' : ''}`}>
                                <Link className="dropdown-item" to={"#"}><i className="fa fa-user-o align-middle mr-1" aria-hidden="true" /> Profile</Link>
                                {/* <Link  className="dropdown-item" to={"#"}><i className="fa fa-pie-chart align-middle mr-1" aria-hidden="true" /> Analytics</Link>
                                <div className="dropdown-divider" />
                                <Link className="dropdown-item" to={"#"}>Settings &amp; Privacy</Link>
                                <Link className="dropdown-item" to={"#"}>Help</Link> */}
                                <Link className="dropdown-item" to={"#"}>Sign out</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
