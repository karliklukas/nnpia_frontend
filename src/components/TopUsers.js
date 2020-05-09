import React from 'react';
import PublicService from "../service/PublicService";
import './style.css';

class TopUsers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            message: ''
        };
    }

    componentDidMount() {
        PublicService.getTopUsers()
            .then(res => {
                if (res.data.status === 200) {
                    this.setState({
                        users: res.data.result
                    });
                    console.log(res.data.result)
                } else {
                    this.setState({message: res.data.message});
                }

            });
    }


    render() {
        return (
            <div className="container">
                <h3>Top 3 users</h3>
                <hr/>
                <h2 className="text-danger">{this.state.message}</h2>

                <div className={"wrapList"}>
                    {this.state.users.length === 3
                        ? <div className="card">
                            <img alt="Gold medal" src={process.env.PUBLIC_URL + '/gold.png'} />
                            <h1 className="bg-warning">Number 1 <br /> {this.state.users[2].username} with {this.state.users[2].count} deliveries
                                done</h1>
                            <br />
                            <br />
                            <img alt="Silver medal" src={process.env.PUBLIC_URL + '/silver.png'} />
                            <h1 className="bg-secondary">Number 2 <br /> {this.state.users[1].username} with {this.state.users[1].count} deliveries
                                done</h1>
                            <br />
                            <br />
                            <img alt="Bronze medal" src={process.env.PUBLIC_URL + '/bronz.png'} />
                            <h1 className="bg-danger">Number 3 <br /> {this.state.users[0].username} with {this.state.users[0].count} deliveries
                                done</h1>

                        </div>
                        : <div></div>
                    }

                </div>
            </div>


        );
    }
}

export {TopUsers};