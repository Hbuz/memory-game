import React, { PureComponent } from 'react'
import request from 'superagent'
import NumberCards from './NumberCards'
import FlipCards from './FlipCards'
import Grid from '@material-ui/core/Grid'

const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:4001";

class GameContainer extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      sorted: [],
      moves: null,
      newGame: false,
      result: null,
      flipped: null
    }
    this.chooseNumber = this.chooseNumber.bind(this)
    this.playerMove = this.playerMove.bind(this)
    this.startGame = this.startGame.bind(this)
    this.handleClick = this.handleClick.bind(this);
  }

  chooseNumber(event) {
    const number = event.target.value
    request(`${baseUrl}/cards`)
      .query({ number })
      .then(response => {
        const cards = [...response.body.cards]
        this.setState({ cards: response.body.cards })
        this.setState({ sorted: cards.sort((a, b) => a - b) },
            () => this.setFlipped(true))
        })
  }

  setFlipped(flip) {
    const cards = this.state.cards
    let flipped
    for (let i = 0; i < cards.length; i++) {
      flipped = { ...flipped, [cards[i]]: flip }
    }
    this.setState({ flipped: flipped })
  }


  playerMove(card) {
    this.setState({ moves: [...this.state.moves, card] }, () => this.checkMatch())

  }

  checkMatch() {
    const index = this.state.moves.length - 1
    if (this.state.sorted[index] === this.state.moves[index]) {
      if (this.state.sorted.length === this.state.moves.length) {
        this.setState({ result: "You won!" })
        this.setState({ newGame: true })
      }
    } else {
      this.setState({ result: "Wrong card!" })
      this.setState({ newGame: true })
      this.setFlipped(true)
    }
  }


  startGame() {
    this.setState({ moves: [] })
    this.setFlipped(false)
  }

  newGame() {
    this.setState({
      cards: [],
      sorted: [],
      moves: null,
      newGame: false,
      result: null
    })
  }

  handleClick(e) {
    e.preventDefault();
    const card = e.target.value
    let toFlip = {...this.state.flipped}
    toFlip[card] = true;
    this.setState({ flipped: toFlip })
    this.playerMove(Number(card))
  }


  render() {

    if (this.state.cards.length === 0) {
      return (
        <NumberCards chooseNumber={this.chooseNumber} />
      )

    } else {
      return (
        <div>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <FlipCards cards={this.state.cards} playerMove={this.playerMove} startGame={this.startGame}
                moves={this.state.moves} result={this.state.result} flipped={this.state.flipped}
                handleClick={this.handleClick} />
            </Grid>
            <Grid item>
              {
                this.state.newGame &&
                <button onClick={() => this.newGame()}> NEW GAME</button>
              }
            </Grid>
          </Grid>
        </div>
      )
    }

  }

}

export default GameContainer