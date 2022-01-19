import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  };
  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem('jokes')) || [],
      loading: window.localStorage.getItem('jokes') === null ? true : false
    };
    this.handleClick = this.handleClick.bind(this);
    this.seenJokes = new Set(this.state.jokes.map(j => j.text));
  }

  componentDidMount() {
    if (this.state.jokes.length === 0) this.getJokes();
  };

  async getJokes() {
    let j = [];
    try {
      while (j.length < this.props.numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
        });
        let newJoke = res.data.joke;
        if (!this.seenJokes.has(newJoke)) {
          j.push({ text: newJoke, votes: 0, id: res.data.id });
        };
      };
      this.setState(st => ({
        loading: false,
        jokes: [...st.jokes, ...j]
      }), () => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes)));
    } catch (e) {
      console.log(e);
    }
  }

  handleVote(id, delta) {
    this.setState(st => ({
      jokes: st.jokes.map(j => j.id === id ? { ...j, votes: j.votes + delta } : j)
    }), () => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes)));
  };

  handleClick() {
    this.setState({ loading: true }, this.getJokes);

  };

  render() {
    if (this.state.loading) {
      return (
        <div className="loading"><i className="fas fa-8x fa-hourglass fa-spin" /><h2>LOADING</h2></div>
      )
    }
    let jokes = this.state.jokes.sort((a, b) => b.votes - a.votes);
    return (
      <div className="JokeList">
        <h1>dad jokes</h1>
        <button className="JokeList-getmore" onClick={() => this.handleClick()}>New Jokes</button>
        <div >
          {jokes.map(j => (
            <Joke
              votes={j.votes}
              text={j.text}
              key={j.id} id={j.id}
              upvote={() => this.handleVote(j.id, 1)}
              downvote={() => this.handleVote(j.id, -1)}
            />
          ))}
        </div>
      </div>
    );
  };
};

export default JokeList;
