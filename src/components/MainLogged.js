import React, { Component } from 'react'
import {Link} from "react-router-dom";
import './style.css';
import AuthService from "../service/AuthService";
import CartService from "../service/CartService";


export class MainLogged extends Component {

    constructor() {
        super();
        this.state = {
            countFree: 0,
            countDone: 0,
            countWaiting: 0
        };
    }

    componentDidMount() {
        if (AuthService.getUserInfo().username === null){
            this.props.history.push('/');
        }

        CartService.fetchCounts()
            .then((res) => {
                this.setState({countFree: res.data.result.countFree, countDone: res.data.result.countDone, countWaiting: res.data.result.countWait})
            });

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
                            <p className="card-text"><small className="text-muted">Count: {this.state.countFree}</small></p>
                            <Link to="/choose" className="btn btn-primary">Choose!</Link>
                        </div>
                </div>
                <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Show what you done</h5>
                            <p className="card-text">Browse the list of shopping lists that you have successfully buy and deliver.</p>
                            <p className="card-text"><small className="text-muted">You already bought {this.state.countDone} lists.</small></p>
                            <Link to="/showDone" className="btn btn-primary">Show what you done!</Link>
                        </div>
                </div>
                <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Show all waiting lists</h5>
                            <p className="card-text">Browse the list of your chooses shopping lists that are waiting for buy them and deliver to the seniors. ASAP.</p>
                            <p className="card-text"><small className="text-muted">{this.state.countWaiting} list are waiting for deliver!</small></p>
                            <Link to="/showWait" className="btn btn-primary">Show shopping lists!</Link>
                        </div>
                </div>
            </div>
            </div>
        )
    }
}