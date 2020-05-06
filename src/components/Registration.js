import React from 'react';
import UserService from "../service/PublicService";

class Registration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            email: '',
            message: ''
        };
        this.register = this.register.bind(this);
    }

    componentDidMount() {
        localStorage.clear();

    }

    register = (e) => {
        e.preventDefault();
        const user = {username: this.state.username, password: this.state.password, email: this.state.email};
        UserService.addUser(user).then(res => {
            if(res.data.status === 200){
                this.props.history.push('/login');
            }else {
                this.setState({message: res.data.message});
            }
        });
    };

    handleChangeUser = (e) => {
        this.setState({
            username: e.target.value
        });
    }

    handleChangePass = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    handleChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    }


    render() {
        return (
            <div className="container">
                <h3>Registration</h3>
                <hr/>
                <form onSubmit={this.register}>
                    <h2 className="text-danger">{this.state.message}</h2>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Username</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" value={this.state.username} onChange={this.handleChangeUser}
                                   placeholder="Enter username" required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Email address</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" value={this.state.email} onChange={this.handleChangeEmail}
                                   placeholder="Enter email" required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" placeholder="Password" className="form-control" value={this.state.password} onChange={this.handleChangePass}
                                   required/>
                        </div>

                    </div>
                    <button type="submit" className="btn btn-primary" >Register</button>
                </form>
            </div>


        );
    }
}

export { Registration };