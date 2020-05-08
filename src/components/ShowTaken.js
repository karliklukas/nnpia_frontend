import React, {Component} from 'react'
import './style.css';
import AuthService from "../service/AuthService";
import CartService from "../service/CartService";
import Pagination from "react-js-pagination";
import {FormatDate} from "./FormatDate";


export class ShowTaken extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageNo: 0,
            pageSize: 2,
            sortBy: "time",
            size: 0,
            carts: [],
            activePage: 1,
            message: ''
        };
        this.onChangeValue = this.onChangeValue.bind(this);
        this.reloadCartList = this.reloadCartList.bind(this);
    }

    componentDidMount() {
        if (AuthService.getUserInfo().username == null){
            this.props.history.push('/');
        }
        this.reloadCartList(0,"time");
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.done !== this.props.done) {
            this.reloadCartList(0,"time");
            this.setState({sortBy: "time"});
        }
    }

    reloadCartList(page, sort) {
        CartService.fetchCartsByUser(page,this.state.pageSize,sort, AuthService.getUserInfo().id, this.props.done)
            .then((res) => {
                this.setState({carts: res.data.result, size: parseInt(res.data.message , 10 )})
            });

    }

    onChangeValue(event) {
        this.setState({sortBy: event.target.value, pageNo: 0, activePage: 1});
        this.reloadCartList(0 ,event.target.value);
    }

    handlePageChange(pageNumber) {
        this.setState({pageNo: pageNumber-1, activePage: pageNumber});
        this.reloadCartList(pageNumber-1,this.state.sortBy);
    }

    setDone = (id) => {

        var r = window.confirm("Are you sure?");
        if (r === true) {
            CartService.setCartDone(id).then(res => {
                if (res.data.status === 200) {
                    this.handlePageChange(1);
                }
            });
        }

    }

    render() {
        return (
            <div className="cardWrap">
                {this.props.done === true
                ?<h4>Look what you already done</h4>
                :<h4>Look what you committed to do</h4>
                }
                <h5 className="text-danger">{this.state.message}</h5>
                <div onChange={this.onChangeValue}>
                    <div className="form-check form-check-inline">
                        <input type="radio" value="time" className="form-check-input" name="sort" checked={this.state.sortBy === 'time'} readOnly/>
                        <label className="form-check-label" htmlFor="inlineCheckbox2">Oldest</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input type="radio" value="timeDesc" className="form-check-input" name="sort" checked={this.state.sortBy === 'timeDesc'} readOnly/>
                        <label className="form-check-label" htmlFor="inlineCheckbox1">Newest</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input type="radio" value="city" className="form-check-input" name="sort" checked={this.state.sortBy === 'city'} readOnly/>
                        <label className="form-check-label" htmlFor="inlineCheckbox3">City</label>
                    </div>
                </div>
                {this.state.carts.length
                    ?this.state.carts.map(row => (
                        <div className="card" key={row.id}>
                            <div className="card-header">
                                <h4>{row.senior.username} | {row.senior.city}</h4>
                            </div>
                            <div className="card-body">
                                <p className="card-text">Contact: {row.senior.email}.<br />Created <FormatDate dateTime={row.time}/>.<br />
                                    Items in shopping list: {row.items.length}</p>
                                {this.props.done === false
                                    ?<button className="btn btn-outline-primary"
                                             onClick={() => this.setDone(row.id)}>
                                        Mark as done
                                    </button>
                                    :<h5>Already done. Goog job.</h5>
                                }

                                <div className="cardWrap">
                                <ul className="list-group list-group-flush">
                                    {
                                        row.items.map(item => {
                                            return <li className="list-group-item" key={item.id}>
                                                {item.item}
                                            </li>
                                        })}
                                </ul>
                                </div>
                            </div>
                        </div>
                    ))
                    :<p>None</p>
                }
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.pageSize}
                    totalItemsCount={this.state.size}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange.bind(this)}
                />



            </div>
        );
    }

}