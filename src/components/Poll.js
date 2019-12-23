import React, { Component, Fragment }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class PollAdmin extends Component {

  state = {
    isEditMode: false,
    question: ""
  }

  handleAddQuestion = event => {
    event.preventDefault();
    this.setState({ isEditMode: true });
  }

  handleEditSave = event => {
    event.preventDefault();
    this.setState({ isEditMode: false });
    this.props.handleAddQuestion(this.props.id, this.state.question);
  }


  onAddQuestion = event => this.setState({ "question": event.target.value });

  render() {
    return (
      <div className="tile is-child box notification is-success">
        {
          this.props.isAdmin &&
          <Fragment>
            <a href="/" onClick={this.handleAddQuestion} className="poll-edit-icon">
              <FontAwesomeIcon icon="edit" />
            </a>
          </Fragment>
        }
        {
          this.state.isEditMode
          ? <div>
              <p className="poll-title">{ this.props.name }</p>
              <p>Add Question</p>
              <input
                className="input is-medium"
                type="text"
                placeholder="Ввдедите вопрос"
                value={this.state.updatedpollname}
                onChange={this.onAddQuestion}
              />
              <p className="poll-id">id: { this.props.id }</p>
              <button type="submit"
                className="button is-info is-small"
                onClick={ this.handleEditSave }
              >save</button>
            </div>
          : <div>
              <p className="poll-title">{ this.props.name }</p>
              {
                this.props.questions && this.props.questions.length > 0
    ? this.props.questions.map((realquestion, index) => (<p>{realquestion.name}</p>))
                      : <p>No questions yet</p>
              }
              <p className="poll -id">id: { this.props.id }</p>
            </div>
        }
      </div>
    );
  }
}
