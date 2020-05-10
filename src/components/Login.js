import React from 'react';
import AuthService from '../service/AuthService';


class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            message: ''
        };
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        localStorage.clear();
        this.props.setLoggedIn(false)

    }

    login = (e) => {
        e.preventDefault();

        const credentials = {username: this.state.username, password: this.state.password};
        AuthService.login(credentials).then(res => {
            if(res.data.status === 200){
                localStorage.setItem("userInfo", JSON.stringify(res.data.result));
                this.props.setLoggedIn(true)
                this.props.history.push('/main');
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

    render() {

        return (

            <div className="container">
            <h3>Login</h3>
            <hr />
                <form>
                    <h2 className="text-danger">{this.state.message}</h2>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Username</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" placeholder="Enter username" name="username"
                               value={this.state.username} onChange={this.handleChangeUser} required={ true }/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" placeholder="Password" name="password"
                                   value={this.state.password} onChange={this.handleChangePass} required={ true }/>
                        </div>

                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.login}>Login</button>
                </form>
            </div>
        );
    }
}

export { Login };