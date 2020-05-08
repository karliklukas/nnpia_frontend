import React from 'react';
import UserService from "../service/UserService";
import AuthService from "../service/AuthService";

class EditUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            passwordOld: '',
            passwordNew: '',
            message: ''
        };
        this.edit = this.edit.bind(this);
    }

    edit = (e) => {
        e.preventDefault();

        const user = {username: AuthService.getUserInfo().username, passwordNew: this.state.passwordNew,  passwordOld: this.state.passwordOld};
        UserService.editUser(user).then(res => {
            if(res.data.status === 200){
                this.props.history.push('/logout');
            }else {
                this.setState({message: res.data.message, passwordOld: '', passwordNew: ''});
            }
        });
    };

    handleChangePassOld = (e) => {
        this.setState({
            passwordOld: e.target.value
        });
    }

    handleChangePassNew = (e) => {
        this.setState({
            passwordNew: e.target.value
        });
    }


    render() {
        return (
            <div className="container">
                <h3>Change password</h3>
                <hr/>
                <form onSubmit={this.edit}>
                    <h2 className="text-danger">{this.state.message}</h2>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Password old</label>
                        <div className="col-sm-10">
                            <input type="password" placeholder="Password" minLength="6" className="form-control" value={this.state.passwordOld} onChange={this.handleChangePassOld}
                                   required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Password new</label>
                        <div className="col-sm-10">
                            <input type="password" placeholder="Password" minLength="6" className="form-control" value={this.state.passwordNew} onChange={this.handleChangePassNew}
                                   required/>
                        </div>

                    </div>
                    <button type="submit" className="btn btn-primary" >Change</button>
                </form>
            </div>


        );
    }
}

export { EditUser };