import React from 'react';
import PublicService from "../service/PublicService";

class CheckListStatus extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cartId: '',
            done: false,
            haveUser: false,
            message: '',
            fetch: false
        };
    }

    handleChangeId = (e) => {
        this.setState({
            cartId: e.target.value,
            fetch: false
        });

    }

    handleSubmit = (e) => {
        e.preventDefault();

        PublicService.fetchStatus(this.state.cartId).then(res => {
            if (res.data.status === 200) {
                this.setState({
                    done: res.data.result.done,
                    haveUser: res.data.result.haveUser,
                    fetch: true
                });
            } else {
                this.setState({message: res.data.message});
            }

        });
    }


    render() {
        return (
            <div className="container">
                <h3>Check shopping list status.</h3>
                <hr/>
                <form onSubmit={this.handleSubmit}>
                    <h2 className="text-danger">{this.state.message}</h2>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">List ID</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" onChange={this.handleChangeId}
                                   value={this.state.cartId}
                                   placeholder="Enter list ID" required={true}/>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Check</button>


                </form>
                <hr/>
                <div className={"wrapList"}>{console.log(this.state.done + "---" + this.state.haveUser)}
                    {this.state.fetch
                        ? <div className="card">
                            <h3>Status of your order:</h3>
                            {this.state.haveUser
                                ? <div><h5>Your order has been taken by some volunteer. For more information check email.</h5>
                                    {this.state.done && this.state.haveUser
                                        ? <h5>By our information your order has been already delivered.</h5>
                                        : <h5>Now wait till you have been contacted by volunteer due to delivery
                                            details.</h5>
                                    }
                                </div>
                                : <h5>Your order is waiting for some volunteer to take it.</h5>
                            }

                        </div>
                        : <div></div>

                    }


                </div>
            </div>


        );
    }
}

export {CheckListStatus};