import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import {isAdmin} from "../App.js";


export default class Navbar extends Component {

    handleLogOut = async event => {
        event.preventDefault();
        try{
            Auth.signOut();
            this.props.auth.setAuthStatus(false);
	    this.props.auth.setUser(null);

        }catch(error){
            console.log(error.message);
        }
    }
    render() {

        return(
            <nav className="navbar" role="navigation" aria-label="main navigation">

            <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
            <a href="/" className="navbar-item">
            Домой
            </a>
            <a href="/polls" className="navbar-item">
            Опросы
            </a>
              {isAdmin &&
                  <a href="/admin" className="navbar-item">
                    Админ
                  </a>
              }
            </div>

            <div className="navbar-end">
            <div className="navbar-item">
	    {this.props.auth.isAuthenticated && this.props.auth.user &&(
		<p>
                Привет,{this.props.auth.user.username}
                </p>
	    )}
	      <div className="buttons">
                {!this.props.auth.isAuthenticated && (
                    <div>
                    <a href="/register" className="button is-primary">
                      <strong>Зарегистрироваться</strong>
                    </a>
                    <a href="/login" className="button is-light">
                Войти
                    </a>
                    </div>
                )}
                {this.props.auth.isAuthenticated && (
                    <a href="/" onClick  = {this.handleLogOut} className="button is-light">
                  Выйти
                    </a>
                )}
            </div>
            </div>
            </div>
            </div>
            </nav>
        );
  }
}
