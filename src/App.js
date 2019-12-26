import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Poll from './components/Polls';
import PollAdmin from './components/PollAdmin';
import Footer from './components/Footer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

library.add(faEdit);


class App extends Component {
    state = {
        isAuthenticated: false,
        isAuthenticating: true,
        user : null

    }

    render() {
        const authProps ={
            isAuthenticated: this.state.isAuthenticated,
            user: this.state.user,
            setAuthStatus: this.setAuthStatus,
            setUser: this.setUser
        };



        return (
            
            <div className="App">
              <Router>
                <div>
                  <Navbar auth = {authProps}/>
                  <Switch>
                    <Route exact path="/" component = {Home} />
                    <Route exact path="/polls" component ={ Poll} />
                    <Route exact path="/admin"  component={ PollAdmin}/>
	           
                    
                    
                  </Switch>
                  <Footer />
                </div>
              </Router>
            </div>
        );
    }
}


export default App;
