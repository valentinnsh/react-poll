import React, { Component } from 'react';
import { Auth } from 'aws-amplify';



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
              
                  <a href="/admin" className="navbar-item">
                    Админ
                  </a>
            </div>
            <div className="navbar-end">
            <div className="navbar-item">
	    
		        <p>
                Привет,
                </p>
	  
	      <div className="buttons">
               
                    <div>
                    <a href="/register" className="button is-primary">
                      <strong>Зарегистрироваться</strong>
                    </a>
                    <a href="/login" className="button is-light">
                Войти
                    </a>
                    </div>
               
                
                    <a href="/" onClick  = {this.handleLogOut} className="button is-light">
                  Выйти
                    </a>
                
            </div>
            </div>
            </div>
            </div>
            </nav>
        );
  }
}
