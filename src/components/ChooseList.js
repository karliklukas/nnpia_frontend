import React, {Component} from 'react'
import './style.css';
import AuthService from "../service/AuthService";
import CartService from "../service/CartService";
import Pagination from "react-js-pagination";


export class ChooseList extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            pageNo: 0,
            pageSize: 3,
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
        if (AuthService.getUserInfo() == null){
            this.props.history.push('/');
        }
        this.reloadCartList(0,"time");
    }

    reloadCartList(page, sort) {
        CartService.fetchCarts(page,this.state.pageSize,sort)
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

    formatDate(dateTime){
        let date = dateTime.substr(0,10);
        let time = dateTime.substr(11,8);
        const [year, month, day] = [...date.split('-')]
        const [hour, minute] = [...time.split(':')]

        return day + ". " + month + ". " + year + " at " + hour + ":" + minute;
    }

    takeList = (id) => {
        CartService.takeCart(id).then(res => {
            if (res.data.status === 200) {
                this.handlePageChange(1);
            } else {
                this.setState({message: res.data.message});
            }

        });
        console.log(id+" asd")
    }

    render() {
        return (
            <div className="cardWrap">
            <h4>Choose some list</h4>
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
                                <p className="card-text">{row.id}Created {this.formatDate(row.time)}.<br />
                                    Items in shopping list: {row.items.length}</p>
                                <button className="btn btn-outline-primary"
                                        onClick={() => this.takeList(row.id)}>
                                    Take this list
                                </button>
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