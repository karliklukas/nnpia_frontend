import React, {Component} from 'react'
import './style.css';
import AuthService from "../service/AuthService";
import CartService from "../service/CartService";
import Pagination from "react-js-pagination";
import {FormatDate} from "./FormatDate";
import {SorterBar} from "./SorterBar";

const options = [{key: "time", label: "Time"}, {key: "senior.city", label: "City"}]

export class ChooseList extends Component {

    constructor() {
        super();
        this.state = {
            pageNo: 0,
            pageSize: 3,
            sortBy: "idcart",
            sortType: "asc",
            size: 0,
            carts: [],
            message: '',
            countWaiting: 0,
        };
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onChangeValueType = this.onChangeValueType.bind(this);
        this.reloadCartList = this.reloadCartList.bind(this);
    }

    componentDidMount() {
        if (AuthService.getUserInfo() == null){
            this.props.history.push('/');
        }
        CartService.fetchCounts()
            .then((res) => {
                this.setState({countWaiting:res.data.result.countWait})
            });

        this.reloadCartList(0,"idcart");
    }

    reloadCartList(page, sort) {
        CartService.fetchCarts(page,this.state.pageSize,sort)
            .then((res) => {
                this.setState({carts: res.data.result.list, size: res.data.result.totalElements})
            });

    }

    onChangeValue(event) {
        this.setState({sortBy: event.target.value, pageNo: 0});
        this.reloadCartList(0 ,event.target.value+","+this.state.sortType);
    }

    onChangeValueType(event) {
        this.setState({sortType: event.target.value,pageNo: 0});
        this.reloadCartList(0 ,this.state.sortBy+","+event.target.value);
    }

    handlePageChange(pageNumber) {
        this.setState({pageNo: pageNumber-1});
        this.reloadCartList(pageNumber-1,this.state.sortBy+","+this.state.sortType);
    }

    takeList = (id) => {
        var first = Math.floor(Math.random() * 20) + 1;
        var second = Math.floor(Math.random() * 20) + 1;
        var resultIs = first+second
        var result = window.prompt("What is result of "+first+"+"+second);
        if (result==resultIs){
            CartService.takeCart(id).then(res => {
                if (res.data.status === 200) {
                    this.handlePageChange(1);
                } else {
                    this.setState({message: res.data.message});
                }
            });
        }else{
            window.alert("Wrong answer.")
        }

    }

    render() {
        return (
            <div className="cardWrap">
            <h4>Choose some list</h4>
            <h5 className="text-danger">{this.state.message}</h5>
            <div>
                <SorterBar sortType={this.state.sortType} onChangeType={this.onChangeValueType}
                           sortBy={this.state.sortBy} onChangeBy={this.onChangeValue} data={options}/>
            </div>
                {this.state.carts.length
                    ?this.state.carts.map(row => (
                        <div className="card" key={row.id}>
                            <div className="card-header">
                                <h4>{row.senior.username} | {row.senior.city}</h4>
                            </div>
                            <div className="card-body">
                                <p className="card-text">Created <FormatDate dateTime={row.time}/>.<br />
                                    Items in shopping list: {row.items.length}</p>
                                {this.state.countWaiting < 4
                                    ?<button className="btn btn-outline-primary"
                                             onClick={() => this.takeList(row.id)}>
                                        Take this list
                                    </button>
                                    :<h5>Sorry, you have too much waiting lists.</h5>
                                }

                            </div>
                        </div>
                ))
                :<p>None</p>
                }
                <Pagination
                    activePage={this.state.pageNo+1}
                    itemsCountPerPage={this.state.pageSize}
                    totalItemsCount={this.state.size}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange.bind(this)}
                />



            </div>
        );
    }

}