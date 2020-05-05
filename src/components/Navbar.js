import React, {Component} from 'react'
import {Link} from "react-router-dom";
import AuthService from '../service/AuthService';
import './style.css'

export class Navbar extends Component {


    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">BuyForYou</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {AuthService.getUserInfo() == null
                        ?
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/create">Create list</Link>
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
                                <Link className="nav-link" href="/choose">Choose new</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/showDone">Show done</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/showWait">Show waiting</Link>
                            </li>
                        </ul>
                    }
                </div>

                {AuthService.getUserInfo() == null
                    ? <ul className="nav navbar-nav navbar-right">
                        <li className="nav-item"><Link className="nav-link" to="/registration">Sign Up</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                    </ul>
                    : <ul className="nav navbar-nav navbar-right">
                        <li className="nav-item"><Link className="nav-link" to="/logout">Logout</Link></li>
                    </ul>
                }


            </nav>


        )
    }
}
