import React, { Component } from 'react'
import {Link} from "react-router-dom";
import './style.css';
import AuthService from "../service/AuthService";


export class MainLogged extends Component {

    componentDidMount() {
        if (AuthService.getUserInfo() == null){
            this.props.history.push('/');
        }

    }

    render() {
        return (
            <div className="cardWrap">
                <h1>Main page for logged user </h1>
                <h2>Welcome {AuthService.getUserInfo().username}</h2>
            <div className="card-group">
                <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Choose new shopping list</h5>
                            <p className="card-text">Browse a list of shopping lists and choose one that you will buy for some needy senior.</p>
                            <p className="card-text"><small className="text-muted">Count: 10</small></p>
                            <Link to="/choose" className="btn btn-primary">Choose!</Link>
                        </div>
                </div>
                <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Show what you done</h5>
                            <p className="card-text">Browse the list of shopping lists that you have successfully buy and deliver.</p>
                            <p className="card-text"><small className="text-muted">You already bought 10 lists.</small></p>
                            <Link to="/showDone" className="btn btn-primary">Show what you done!</Link>
                        </div>
                </div>
                <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Show all waiting lists</h5>
                            <p className="card-text">Browse the list of your chooses shopping lists that are waiting for buy them and deliver to the seniors. ASAP.</p>
                            <p className="card-text"><small className="text-muted">5 list are waiting for deliver!</small></p>
                            <Link to="/showWait" className="btn btn-primary">Show shopping lists!</Link>
                        </div>
                </div>
            </div>
            </div>
        )
    }
}