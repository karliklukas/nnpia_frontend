import React, {Component} from 'react'
import './style.css';
import AuthService from "../service/AuthService";
import CartService from "../service/CartService";
import Pagination from "react-js-pagination";
import {FormatDate} from "./FormatDate";
import {SorterBar} from "./SorterBar";

const optionDone = [{key: "time", label: "Time"}, {key: "senior.city", label: "City"}, {
    key: "timeDone",
    label: "Done time"
}]
const optionWait = [{key: "time", label: "Time"}, {key: "senior.city", label: "City"}]

export class ShowTaken extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageNo: 0,
            pageSize: 2,
            sortBy: "time",
            sortType: "asc",
            size: 0,
            carts: [],
            message: ''
        };
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onChangeValueType = this.onChangeValueType.bind(this);
        this.reloadCartList = this.reloadCartList.bind(this);
    }

    componentDidMount() {
        if (AuthService.getUserInfo().username == null) {
            this.props.history.push('/');
        }
        this.reloadCartList(0, "time,asc");
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.done !== this.props.done) {
            this.setState({sortBy: "time", sortType: "asc", carts: []});
            this.reloadCartList(0, "time,asc");
        }
    }

    reloadCartList(page, sort) {
        CartService.fetchCartsByUser(page, this.state.pageSize, sort, AuthService.getUserInfo().id, this.props.done)
            .then((res) => {
                this.setState({carts: res.data.result.list, size: res.data.result.totalElements})
            });
    }

    onChangeValue(event) {
        this.setState({sortBy: event.target.value, pageNo: 0});
        this.reloadCartList(0, event.target.value + "," + this.state.sortType);
    }

    onChangeValueType(event) {
        this.setState({sortType: event.target.value, pageNo: 0});
        this.reloadCartList(0, this.state.sortBy + "," + event.target.value);
    }

    handlePageChange(pageNumber) {
        this.setState({pageNo: pageNumber - 1});
        this.reloadCartList(pageNumber - 1, this.state.sortBy + "," + this.state.sortType);
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
                    ? <h4>Look what you already done</h4>
                    : <h4>Look what you committed to do</h4>
                }
                <h5 className="text-danger">{this.state.message}</h5>
                <div>
                    <SorterBar sortType={this.state.sortType} onChangeType={this.onChangeValueType}
                               sortBy={this.state.sortBy} onChangeBy={this.onChangeValue}
                               data={this.props.done && optionDone || optionWait}/>
                </div>
                {this.state.carts.length
                    ? this.state.carts.map(row => (
                        <div className="card" key={row.id}>
                            <div className="card-header">
                                <h4>{row.senior.username} | {row.senior.city}</h4>
                            </div>
                            <div className="card-body">
                                <p className="card-text">Contact: {row.senior.email}.<br/>
                                    Created <FormatDate dateTime={row.time}/>.<br/>
                                    Items in shopping list: {row.items.length}</p>
                                {this.props.done === false
                                    ? <button className="btn btn-outline-primary"
                                              onClick={() => this.setDone(row.id)}>
                                        Mark as done
                                    </button>
                                    : <h4>Done time <FormatDate dateTime={row.timeDone}/> Goog job.</h4>
                                }

                                <div className="cardWrap">
                                    <ul className="list-group list-group-flush">
                                        {
                                            row.items.sort((a, b) => a.id > b.id ? 1 : -1).map(item => {
                                                return <li className="list-group-item" key={item.id}>
                                                    {item.item}
                                                </li>
                                            })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))
                    : <p>None</p>
                }
                <Pagination
                    activePage={this.state.pageNo + 1}
                    itemsCountPerPage={this.state.pageSize}
                    totalItemsCount={this.state.size}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange.bind(this)}
                />


            </div>
        );
    }

}