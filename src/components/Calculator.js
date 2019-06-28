import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, TextField, Typography, Button} from '@material-ui/core';
import EquationList from './EquationList';
import {
  getCurrentEquations,
  sendEquationToServer,
} from './socket';

const styles = theme => ({
  root : {
    height: '100%',
    width: '100%',
    display : 'flex',
    aligntContent: 'center',
    justifyContent: 'center',
  },
  calculator : {
    height: '100%',
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-around',
    justifyContent: 'space-around',
  },
  row: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    margin: 10,
  },
  equation : {
    border: '1px solid black',
    width: '65%',
    margin: 0,
  },
  button : {
    height: '50%',
  }
})

class Calculator extends Component {

  state = {
    equation : '',
    solution : '',
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // when our app mounts, it should always be updated with the current equation list
    getCurrentEquations(dispatch);
  }

  makeEquation=(number) => {
    this.setState({
      ...this.state,
      equation: this.state.equation + number
    })
    console.log(this.state.equation)
  }

  clearEquation=()=> {
    this.setState({
      ...this.state,
      equation: '',
      solution: '',
    })
  }

  //This function runs when the '=' button is pressed
  //First we make sure the equation returns a number
  //If it does then we dispatch the answer to the server
  solveEquation=() => {
    
    if(typeof eval(this.state.equation)== 'number'){
      let solution = eval(this.state.equation)
      // sendEquationToServer(this.state.equation, solution);

      this.props.dispatch({type: 'ADD_EQUATION', payload: {equation: this.state.equation, solution: solution}})
      console.log(eval(this.state.equation))
    } else {
      console.log('Invalid Equation')
    }
  }

  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <div className={classes.calculator}>
          <div className={classes.row}>
            <TextField
              id="equation"
              label="Enter an Equation"
              InputProps={{
              disableUnderline: true,
              }}
              className={classes.equation}
              value={this.state.equation}
              margin="normal"
              />    
            <Button 
              variant="outlined"
              className={classes.button}
              onClick={()=>this.clearEquation()}
            >
              C
            </Button>
          </div>
          <div className={classes.row}>
            <Button 
              variant="outlined"
              className={classes.button}
              onClick={()=>this.makeEquation('7')}
            >
              7
            </Button>     
            <Button 
              variant="outlined"
              className={classes.button}
              onClick={()=>this.makeEquation('8')}
            >
              8
            </Button>     
            <Button 
              variant="outlined"
              className={classes.button}
              onClick={()=>this.makeEquation('9')}
            >
              9
            </Button>     
            <Button 
              variant="outlined"
              className={classes.button}
              onClick={()=>this.makeEquation('+')}
            >
              +
            </Button>   
          </div>           
          <div className={classes.row}>
            <Button 
              variant="outlined"
              className={classes.button}
              onClick={()=>this.makeEquation('4')}
            >
              4
            </Button>     
            <Button 
              variant="outlined"
              className={classes.button}
              onClick={()=>this.makeEquation('5')}
            >
              5
            </Button>     
            <Button 
              variant="outlined"
              className={classes.button}
              onClick={()=>this.makeEquation('6')}
            >
              6
            </Button>     
            <Button 
              variant="outlined"
              className={classes.button}
              onClick={()=>this.makeEquation('-')}
            >
              -
            </Button>   
          </div>         
          <div className={classes.row}>
            <Button 
              variant="outlined"
              className={classes.button}
              onClick={()=>this.makeEquation('1')}
            >
              1
            </Button>     
            <Button 
              variant="outlined"
              className={classes.button}
              onClick={()=>this.makeEquation('2')}
            >
              2
            </Button>     
            <Button 
              variant="outlined"
              className={classes.button}
              onClick={()=>this.makeEquation('3')}
            >
              3
            </Button>     
            <Button 
              variant="outlined"
              className={classes.button}
              onClick={()=>this.makeEquation('*')}
            >
              *
            </Button>   
          </div>           
          <div className={classes.row}>
            <Button 
              variant="outlined"
              className={classes.button}
              onClick={()=>this.makeEquation('0')}
            >
              0
            </Button>     
            <Button 
              variant="outlined"
              className={classes.button}
              onClick={()=>this.makeEquation('.')}
            >
              .
            </Button>     
            <Button 
              variant="outlined"
              className={classes.button}
              onClick={()=>this.solveEquation()}
            >
              =
            </Button>     
            <Button 
              variant="outlined"
              className={classes.button}
              onClick={()=>this.makeEquation('/')}
            >
              /
            </Button>   
          </div>          
              <EquationList/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  equationList: state,
});

export default connect(mapStateToProps) (withStyles(styles)(Calculator));
