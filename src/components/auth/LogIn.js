import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import {Auth} from 'aws-amplify';

class LogIn extends Component {
    state = {
	username: "",
	password: "",
	isAdmin: false,
	errors: {
	    cognito: null,
	    blankfield: false
	}
    };

    clearErrorState = () => {
	this.setState({
	    errors: {
		cognito: null,
		blankfield: false
	    }
	});
    };

  handleSubmit = async event => {
    event.preventDefault();

    // Form validation
    this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }

      // AWS Cognito integration here
      try{
          const user = await Auth.signIn(this.state.username, this.state.password);
          console.log(user);
	  this.props.auth.setAuthStatus(true);
	  this.props.auth.setUser(user)
	  if (this.state.username == "admin_user") this.state.isAdmin = true;

            this.props.history.push("/");
        }catch(error){
            let err = null;
            !error.message ? err = {"message": error} : err = error;
            this.setState({
                ...this.state.errors,
                cognito: error
            });
        }
  };

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1>Вход</h1>
          <FormErrors formerrors={this.state.errors} />

          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  id="username"
                  aria-describedby="usernameHelp"
                  placeholder="Введите имя пользователя или email"
                  value={this.state.username}
                  onChange={this.onInputChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  id="password"
                  placeholder="Пароль"
                  value={this.state.password}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <a href="/forgotpassword">Забыли пароль?</a>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-success">
                  Войти
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default LogIn;
