import React, { Component, Fragment } from 'react';
import Poll from './Poll';
import axios from "axios";

const config = require('../config.json');

export default class PollAdmin extends Component {

  state = {
    newpoll: {
      "name": "",
      "id": "",
      "questions": []
    },
    polls: []
  }

  handleAddPoll = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway add poll endpoint here
    try {
      const params = {
        "id": id,
        "name": this.state.newpoll.name
      };
      await axios.post(`${config.api.invokeUrl}/poll`, params);
      this.setState({ polls: [...this.state.polls, this.state.newpoll] });
      this.setState({ newpoll: { "name": "", "id": "", "questions": [] }});
    }catch (err) {
      console.log('An error has occurred: ${err}');
    }
  }


  handleAddQuestion = async (id, name) => {
    try {
      const params = {
        "id": id,
        "name": name
      };
      await axios.post(`${config.api.invokeUrl}/poll/${id}`, params);
      const question = {
        "name": name,
        "varients": []
      };
      const pollToUpdate = [...this.state.polls].find(poll => poll.id === id);
      const updatedPolls = [...this.state.polls].filter(poll => poll.id !== id);
      pollToUpdate.questions.push(question);
      updatedPolls.push(pollToUpdate);
      this.setState({polls: updatedPolls});
    }catch (err) {
      console.log('Error updating poll: ${err}');
    }
  }

  handleVarientAdd = event => {
    event.preventDefault();
    this.setState({ isEditMode: false });
    this.props.handleUpdatePoll(this.props.id, this.state.updatedpollname);
  }

  fetchPolls = async () => {
    // add call to AWS API Gateway to fetch polls here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/poll`);
      const polls = res.data;
      this.setState({ polls: polls });
    } catch (err) {
      console.log('An error has occurred: ${err}');
    }
  }

  onAddPollNameChange = event => this.setState({ newpoll: { ...this.state.newpoll, "name": event.target.value } });
  onAddPollIdChange = event => this.setState({ newpoll: { ...this.state.newpoll, "id": event.target.value } });

  componentDidMount = () => {
    this.fetchPolls();
  };

    render() {
	return (
      <Fragment>
	    {
        <section className="section">
          <div className="container">
            <h1>Опросники (админ)</h1>
            <p className="subtitle is-5">Добавляйте опросники пользуясь следующей формой:</p>
            <br />
            <div className="columns">
              <div className="column is-one-third">
                <form onSubmit={event => this.handleAddPoll(this.state.newpoll.id, event)}>
                  <div className="field has-addons">
                    <div className="control">
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Enter name"
                        value={this.state.newpoll.name}
                        onChange={this.onAddPollNameChange}
                      />
                    </div>
                    <div className="control">
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Enter id"
                        value={this.state.newpoll.id}
                        onChange={this.onAddPollIdChange}
                      />
                    </div>
                    <div className="control">
                      <button type="submit" className="button is-primary is-medium">
                        Add poll
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="column is-two-thirds">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    {
                      this.state.polls.map((poll, index) =>
                        <Poll
                          
                          handleAddQuestion={this.handleAddQuestion}
                          name={poll.name}
                          id={poll.id}
                          questions={poll.questions}
                          key={index}
                        />)
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
	    }
	    </Fragment>

    )
  }
}
