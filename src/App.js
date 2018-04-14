import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Nav from "./components/Nav";
import Title from "./components/Title";
import friends from "./friends.json";
import "./App.css";

function shuffleFriends(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    currentScore: 0,
    topScore: 0,
    rightWrong: "",
    clicked: []
  };

  removeFriend = id => {
    // Filter this.state.friends for friends with an id not equal to the id being removed
    const friends = this.state.friends.filter(friend => friend.id !== id);
    // Set this.state.friends equal to the new friends array
    this.setState({ friends });
  };
  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }
  };

  handleReset = () => {
    this.setState({
      currentScore: 0,
      topScore: this.state.topScore,
      rightWrong: "Fail Fail Fail",
      clicked: []
    });
    this.handleShuffle();
  };
  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      rightWrong: ""
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    } else if (newScore === 12) {
      this.setState({ rightWrong: "You win!" });
    }
    this.handleShuffle();
  };



  handleShuffle = () => {
    let shuffledFriends = shuffleFriends(friends);
    this.setState({ friends: shuffledFriends });
  };
  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return <Wrapper>
      <Nav title=" Friend Clicky Game" score={this.state.currentScore} topScore={this.state.topScore} rightWrong={this.state.rightWrong} />
      <Title>React Game</Title>
      {this.state.friends.map(friend => (
        <FriendCard
          // key={friend.id}
          handleClick={this.handleClick}
          handleIncrement={this.handleIncrement}
          handleReset={this.handleReset}
          handleShuffle={this.handleShuffle}
          id={friend.id}
          image={friend.image}
        />
      ))}
    </Wrapper>;
  }
}

export default App;
