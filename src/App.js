import React, {useState} from 'react';
import './App.css';
import {Main} from './components/Main';
import {MainLogged} from './components/MainLogged';
import {Navbar} from "./components/Navbar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Login} from "./components/Login";
import {Registration} from "./components/Registration";
import {Create} from "./components/Create";
import {Footer} from "./components/Footer"
import {Logout} from "./components/Logout"
import {ChooseList} from "./components/ChooseList";
import {ShowTaken} from "./components/ShowTaken";
import {CheckListStatus} from "./components/CheckListStatus";
import {EditUser} from "./components/EditUser";
import AuthService from "./service/AuthService";


function App() {
    const [loggedIn, setLoggedIn] = useState(AuthService.getUserInfo.username != null);

  return (
    <div className="App">
        <Router>

                <Navbar {...{loggedIn}}/>

                <Switch>
                    <Route exact path="/" component={Main} />

                    <Route path="/about" component={About} />

                    <Route path="/login" render={
                        (routeProps) => <Login {...{setLoggedIn, ...routeProps}} />
                    } />

                    <Route path="/logout" render={
                        (routeProps) => <Logout {...{setLoggedIn, ...routeProps}} />
                    } />

                    <Route path="/registration" component={Registration} />

                    <Route path="/edit" component={EditUser} />

                    <Route path="/main" component={MainLogged} />

                    <Route path="/create" component={Create} />

                    <Route path="/czech" component={CheckListStatus} />

                    <Route path="/choose" component={ChooseList} />

                    <Route path="/showDone" render={
                        (routeProps) => <ShowTaken {...routeProps} done={true} />
                    } />

                    <Route path="/showWait" render={
                        (routeProps) => <ShowTaken {...routeProps} done={false} />
                    } />

                </Switch>
                <Footer/>
        </Router>
    </div>
  );
}
function About() {
    return (
        <div>
            <h2>About</h2>
            <p>Simple app to help seniors in this thought times. Made as term paper from one student. Lets hope this will help.</p>
            <iframe  title="map" src="https://ourworldindata.org/grapher/total-cases-covid-19?tab=map" width="80%" height="600px"></iframe>
        </div>
    );
}


export default App;
