import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import ReactCardFlip from 'react-card-flip';


const useStyles = makeStyles( () => ({
  cardContainer: {
    padding: 32
  },
  outerContainer: {
    padding: 24,
    maxWidth: 800,
  },
  button: {
    position: "absolute",
    bottom: 6,
    left: 33
  },
  cardNumber: {
    position: "absolute",
    top: 30,
    width: "100%",
    textAlign: "center"
  },
  flipCard: {
    height: "140px",
    width: "100px",
    border: "2px solid",
  }
}));


export default function CardsNumber(props) {

  const classes = useStyles();

  if (!props.flipped) return "Loading cards"


  return (
    <div>
      <Grid container className={classes.outerContainer} direction="column" alignItems="center">
        <Grid item>
          <Grid container className={classes.cardContainer}>

            {props.cards && props.cards.map(card => (
              <Grid item key={card}>
                <div className={classes.cardContainer}>
                  <ReactCardFlip isFlipped={props.flipped[card]} flipDirection="horizontal">
                    <div key="front" className={classes.flipCard}>
                      {props.moves && !props.result &&
                        <button className={classes.button} onClick={props.handleClick} value={card}>Flip</button>
                      }
                    </div>
                    <div key="back" className={classes.flipCard}>
                      <div className={classes.cardNumber}>
                        <h1>{card}</h1>
                      </div>
                    </div>
                  </ReactCardFlip>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item>

          {!props.moves &&
            <button onClick={() => props.startGame()}>PLAY</button>
          }
        </Grid>
        <Grid item>
          {props.result && <span style={{ color: 'red' }}>{props.result}</span>}
        </Grid>
      </Grid>
    </div>
  )
}