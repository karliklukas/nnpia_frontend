import React, { Component } from 'react'
import {Link} from "react-router-dom";
import './style.css';


export class Main extends Component {


    render() {
        return (
            <div>
                <div className="card">
                    <h1 className="h1">Welcome!</h1>
                    <hr />
                    <div className="card-body">
                        <h5 className="card-title">Project main site.</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <hr />
                        <Link to="/create" className="btnBig">Create shopping list</Link>
                    </div>
                </div>

            </div>
        )
    }
}

