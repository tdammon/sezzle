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
    height: 'auto',
    width: 'auto',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-around',
    justifyContent: 'space-around',
    background:'black',
    boxShadow:'0 10px 15px rgba(0,0,0,.2)',
  },
  row: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    margin: 0,
  },
  equation : {
    border: '1px solid black',
    fontWeight:'bold',
    fontSize: '30px',
    color: 'white',
	  textAlign:'right',
    width: '75%',
    height: '36px',
    margin: 1,
    background:'#4D4E4F',
  },
  buttonNumber : {
    height: '50%',
    background:'#d8d9db',
    margin: 1,
    '&:hover': {
      background: 'white',
    },
  },
  button : {
    height: '50%',
    background:'#f89112',
    margin: 1,
    '&:hover': {
      background: 'white',
    },
  },
  text :{
    margin:'0px',
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
      this.clearEquation()
      let equation= this.state.equation +' = '+ eval(this.state.equation)
      sendEquationToServer(equation);

      // this.props.dispatch({type: 'SEND_EQUATION_TO_SERVER', payload: {equation: this.state.equation, solution: solution}})
      // console.log(eval(this.state.equation))
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
            <div
              id="equation"
              className={classes.equation}
              value={this.state.equation}
              margin="normal"
              > 
              <p className={classes.text}>{this.state.equation}</p>
            </div>   
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
              className={classes.buttonNumber}
              onClick={()=>this.makeEquation('7')}
            >
              7
            </Button>     
            <Button 
              variant="outlined"
              className={classes.buttonNumber}
              onClick={()=>this.makeEquation('8')}
            >
              8
            </Button>     
            <Button 
              variant="outlined"
              className={classes.buttonNumber}
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
              className={classes.buttonNumber}
              onClick={()=>this.makeEquation('4')}
            >
              4
            </Button>     
            <Button 
              variant="outlined"
              className={classes.buttonNumber}
              onClick={()=>this.makeEquation('5')}
            >
              5
            </Button>     
            <Button 
              variant="outlined"
              className={classes.buttonNumber}
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
              className={classes.buttonNumber}
              onClick={()=>this.makeEquation('1')}
            >
              1
            </Button>     
            <Button 
              variant="outlined"
              className={classes.buttonNumber}
              onClick={()=>this.makeEquation('2')}
            >
              2
            </Button>     
            <Button 
              variant="outlined"
              className={classes.buttonNumber}
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
              className={classes.buttonNumber}
              onClick={()=>this.makeEquation('0')}
            >
              0
            </Button>     
            <Button 
              variant="outlined"
              className={classes.buttonNumber}
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
          
        </div>
        <EquationList/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  equationList: state,
});

export default connect(mapStateToProps) (withStyles(styles)(Calculator));
