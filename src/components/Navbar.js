import React, {Component} from 'react'
import {Link} from "react-router-dom";
import './style.css'

export class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">BuyForYou</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {this.props.loggedIn === false
                        ?
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/create">Create list</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/czech">Check list status</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/top">Hall of fame</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                        </ul>
                        : <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/main">Main page</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/choose">Choose new</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/showDone">Show done</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/showWait">Show waiting</Link>
                            </li>
                        </ul>
                    }
                </div>

                {this.props.loggedIn ?
                    <ul className="nav navbar-nav navbar-right">
                        <li className="nav-item"><Link className="nav-link" to="/edit">Edit</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/logout">Logout</Link></li>
                    </ul>
                    :<ul className="nav navbar-nav navbar-right">
                        <li className="nav-item"><Link className="nav-link" to="/registration">Sign Up</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                    </ul>
                }


            </nav>


        )
    }
}
