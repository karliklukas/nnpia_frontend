import React from 'react';
import {CreateItem} from "./CreateItem";
import PublicService from "../service/PublicService";

class Create extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shopList: [],
            index: 1,
            username: '',
            email: '',
            city: '',
            seniorId: null,
            message: ''
        };
    }

    deleteItem = (id) => {
        const list = this.state.shopList.filter(item => {
            return item.id !== id
        });
        this.setState({
            shopList: list
        });
    }

    addItem = (item) => {
        item.id = this.state.index;
        this.setState({index: this.state.index + 1})
        let list = [...this.state.shopList, item];
        this.setState({
            shopList: list
        });
    }

    handleChangeUser = (e) => {
        this.setState({
            username: e.target.value
        });
    }

    handleChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    handleChangeCity = (e) => {
        this.setState({
            city: e.target.value
        });
    }

    onKeyPress(event) {
        if (event.which === 13 /* Enter */) {
            event.preventDefault();
        }
    }

    handleSubmitCart = (e) => {
        e.preventDefault();

        let cart = {
            list: this.state.shopList,
            senior: {username: this.state.username, email: this.state.email, city: this.state.city}
        }
        PublicService.addCart(cart)
            .then(res => {
                if (res.data.status === 200) {
                    this.setState({
                        shopList: [],
                        username: '',
                        email: '',
                        city: '',
                        index: 1,
                        seniorId: null,
                        message: res.data.result
                    });
                } else {
                    this.setState({message: res.data.message});
                }

            });
    }


    render() {
        return (
            <div className="container">
                <h3>Create shopping list</h3>
                <hr/>
                <form onKeyPress={this.onKeyPress} onSubmit={this.handleSubmitCart}>
                    <h2 className="text-danger">{this.state.message}</h2>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Your name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" onChange={this.handleChangeUser}
                                   value={this.state.username}
                                   placeholder="Enter name" required={true}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Email address</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" onChange={this.handleChangeEmail}
                                   value={this.state.email}
                                   placeholder="Enter email" required={true}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">City</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" onChange={this.handleChangeCity}
                                   value={this.state.city}
                                   placeholder="Enter city" required={true}/>
                        </div>
                    </div>

                    {this.state.shopList.length > 0
                        ? <button type="submit" className="btn btn-primary">Create list</button>
                        : <button type="submit" disabled={true} className="btn btn-primary"
                                  title='Add some items to the list'>Create list</button>
                    }

                </form>
                <hr/>
                <CreateItem addItem={this.addItem}/>
                <div className={"wrapList"}>
                    <div className="card">
                        <ul className="list-group list-group-flush">
                            {
                                this.state.shopList.map(item => {
                                    return <li className="list-group-item" key={item.id}>
                                        {item.item}
                                        <button className="btn btn-outline-danger float-sm-right"
                                                onClick={() => this.deleteItem(item.id)}>
                                            Delete
                                        </button>
                                    </li>
                                })}
                        </ul>
                    </div>
                </div>
            </div>


        );
    }
}

export {Create};