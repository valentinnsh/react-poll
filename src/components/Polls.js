import React, { Component, Fragment } from 'react';
import Poll from './Poll';
import axios from "axios";
const config = require('../config.json');

export default class Polls extends Component {

  state = {
    newpoll: null,
    polls: []
  }

  fetchPolls = async () => {
    // add call to AWS API Gateway to fetch polls here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/poll`);
      const polls = res.data;
      this.setState({ polls: polls });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  componentDidMount = () => {
    this.fetchPolls();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Доступные опросы:</h1>
            <p className="subtitle is-5">Нажмите, чтобы пройти:</p>
            <br />
            <div className="columns">
              <div className="column">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    {
                      this.state.polls && this.state.polls.length > 0
                      ? this.state.polls.map(poll => <Poll name={poll.name} id={poll.id} key={poll.id} />)
                      : <div className="tile notification is-warning">No polls available</div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
