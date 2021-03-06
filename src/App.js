import React, { Component } from 'react';
import FriendCard from './Components/FriendCard/FriendCard'
import Wrapper from "./Components/Wrapper/Wrapper"
import Title from './Components/Title/Title'
import friends from './friends.json'
import './App.css';
import Navbar from './Components/Navbar/navbar'

class App extends Component {
  state = {
    friends,
    score: 0,
    topScore: 0,
    alreadyChosenIds: [],
    correct: ""
  };

  //FISHER YATES SORTING FORMULA FOR SHUFFLING AN ARRAY
  shuffle = friendArray => {
    var i = 0
      , j = 0
      , temp = null

    for (i = friendArray.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = friendArray[i]
      friendArray[i] = friendArray[j]
      friendArray[j] = temp
    }
    // console.log("NEW ARRAY")
    return friendArray

  }

  handleClick = id => {

    console.log(id)
    if (this.state.alreadyChosenIds.indexOf(id) === -1) {
      this.handleScoring();
      this.setState({ alreadyChosenIds: this.state.alreadyChosenIds.concat(id) });
    } else
      if (this.state.alreadyChosenIds.indexOf(id) >= 0) {
        this.setState({correct: "Oops...Double Click! New Game!"})
        this.handleEndOfGame();
      }
  }

  handleScoring = () => {
    ////////******CHECK THE SCORING.************* */
    this.setState({correct: "YES! Good job"})
    const theScore =  this.state.score + 1 
    this.setState({score: theScore})
    if (theScore > this.state.topScore) {
      this.setState({ topScore: theScore })
    } else if (this.state.score === 15) {
    //  alert("WOW! WHAT A MEMORY!!")
    }
    this.setState({ friends: this.shuffle(this.state.friends) })
  }

  handleEndOfGame = () => {

  //  alert("I'm sorry. You clicked the same card twice. Please try again")
    this.setState({
      score: 0,
      topScore: this.state.topScore,
      alreadyChosenIds: [],
      // correct: ''
    });
    this.setState({ friends: this.shuffle(this.state.friends) })
  };


  render() {
    return (
      
        <Wrapper>
          <Navbar><span id="score"> Score: {this.state.score} </span>{"  "} <span id="topscore"> Top Score: {this.state.topScore}</span>{" "} <span id="correct"> Correct? {this.state.correct}{" "}</span></Navbar>
          <Title>Memory Game!</Title>

          <p>Directions: Click on any character. After you click, the characters will reshuffle. Don't click on a character you've already clicked on!</p>
          {this.state.friends.map(friend => (
            <FriendCard
              id={friend.id}
              key={friend.id}
              name={friend.name}
              image={friend.image}
              handleClick={this.handleClick}
              // handleScoring={this.handleScoring}
              // handleEndOfGame={this.handleEndOfGame}
        
            />
          ))}

                </Wrapper>

  
    );
  }
}

export default App;