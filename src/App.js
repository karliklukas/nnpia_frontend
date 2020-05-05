import React from 'react';
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


function App() {


  return (
    <div className="App">
        <Router>
            <Switch>
                <Navbar/>
            </Switch>
                <Switch>
                    <Route exact path="/" component={Main} />

                    <Route path="/about" component={About} />

                    <Route path="/login" component={Login} />

                    <Route path="/logout" component={Logout} />

                    <Route path="/registration" component={Registration} />

                    <Route path="/main" component={MainLogged} />

                    <Route path="/create" component={Create} />

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
            <iframe src="https://ourworldindata.org/grapher/total-cases-covid-19?tab=map" width="80%" height="600px"></iframe>
        </div>
    );
}


export default App;
