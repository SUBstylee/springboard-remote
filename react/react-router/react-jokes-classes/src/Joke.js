import React, { Component } from "react";
import "./Joke.css";

class Joke extends Component {

  render() {
    return (
      <div className="Joke" >
        <div className="Joke-votearea">
          <button >
            <i className="fas fa-thumbs-up" onClick={this.props.upvote} />
          </button>

          <button >
            <i className="fas fa-thumbs-down" onClick={this.props.downvote} />
          </button>

          {this.props.votes}
        </div>

        <div className="Joke-text">{this.props.text}</div>
      </div>
    );
  };
};

export default Joke;
