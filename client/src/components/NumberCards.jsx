import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
  container: {
    padding: 120,
  },
  buttonAlign: {
    padding: 30
  },
  button: {
    padding: "40px 40px",
    textAlign: "center",
    display: "inline-block",
    fontSize: "25px"
  }
}))

export default function NumberCards(props) {

  const classes = useStyles();

  return (
    <Grid container className={classes.container} direction="column" alignItems="center">
      <Grid item>
        <h1>
          Choose the number of cards to play
            </h1>
      </Grid>
      <Grid item >
        <Grid container>
          <Grid item className={classes.buttonAlign}>
            <button className={classes.button} onClick={props.chooseNumber} value={4}>4</button>
          </Grid>
          <Grid item className={classes.buttonAlign}>
            <button className={classes.button} onClick={props.chooseNumber} value={8}>8</button>
          </Grid>
          <Grid item className={classes.buttonAlign}>
            <button className={classes.button} onClick={props.chooseNumber} value={12}>12</button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

  )
}