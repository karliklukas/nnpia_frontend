import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";



function App() {


  return (
    <div className="App">
        <Router>           
                <Switch>
                    <Route exact path="/" component={About} />

                    <Route path="/about" component={About} />

                    <Route path="/login" component={About} />

                    <Route path="/logout" component={About} />

                    <Route path="/registration" component={About} />

                    <Route path="/main" component={About} />

                    <Route path="/create" component={About} />

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
