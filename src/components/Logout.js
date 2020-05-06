import React from 'react';
import AuthService from '../service/AuthService';


export class Logout extends React.Component {

    componentDidMount() {
        AuthService.logOut();
        this.props.setLoggedIn(false)
        this.props.history.push('/login');
    }

    render() {
        return (
            <div>
                <div className="card">
                    <h1 className="h1">Logged out!</h1>
                </div>
            </div>
        )
    }
}