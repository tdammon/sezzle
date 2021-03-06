import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getCurrentPlayers,
  getCurrentColors,
  sendNewPlayerToServer,
  sendNewNumberToServer,
  sendResetToServer
} from './socket';
import style from "./Board.module.css"
import poke from "./poke.jpg"
import Draggable from 'react-draggable';
import { Dialog } from '@material-ui/core';


class Board extends Component {

    state ={
        randomInt:'',
        open: false,
        pass: '',
        background: 'white'
    }

    handleClickAway = () => {
        this.setState({...this.state, open:false, background: 'white'})
    }
      
      onStop = color => (e,position) => {
          const {x,y} = position
          console.log(x, y, color)
          sendNewPlayerToServer({[color]: {x:x, y:y}});

        }

     rollDice = () => {
        for(let i=1;i<20;i++){
            setTimeout(()=> {
                this.setState({...this.state, randomInt: Math.floor(Math.random() * 6)+1})
                sendNewNumberToServer(this.state.randomInt)
            }, 100)
            
        }
        
     }
     
     resetBoard = () => {
         this.setState({...this.state, open:true})
        //  sendResetToServer()
     }

     submitReset =() => {
         if(this.state.pass == 'Friend and Enter'){
             sendResetToServer()
             this.setState({...this.state, pass: '', background: 'green'})    
         } else {
             this.setState({...this.state, pass: '', background: 'red'})
         }
     }
      

      componentDidMount() {
        const { dispatch } = this.props;
        // when our app mounts, it should always be updated with the current equation list
        // getCurrentPlayers(dispatch);
        getCurrentColors(dispatch)
      }  

      updateName = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
      }
      
      submitPlayer = () => {
          if(this.state.name !== '' && this.state.piece !== ''){
            this.setState({ name: '', piece: ''})
            sendNewPlayerToServer({name: this.state.name, piece: this.state.piece, position: 0});
          }
      }
    render() {
        return (
        <div className={style.app}>
        <div>
        <Draggable  onStop={this.onStop('red')} position={{x:this.props.colors[0].red.x, y:this.props.colors[0].red.y}}>
        <div className={style.redball}></div>
        </Draggable>
        <Draggable  onStop={this.onStop('blue')} position={{x:this.props.colors[0].blue.x, y:this.props.colors[0].blue.y}}>
            <div className={style.blueball}></div>
        </Draggable>
        <Draggable  onStop={this.onStop('green')} position={{x:this.props.colors[0].green.x, y:this.props.colors[0].green.y}}>
            <div className={style.greenball}></div>
        </Draggable>
        <Draggable  onStop={this.onStop('purple')} position={{x:this.props.colors[0].purple.x, y:this.props.colors[0].purple.y}}>
            <div className={style.purpleball}></div>
        </Draggable>
        <Draggable  onStop={this.onStop('pink')} position={{x:this.props.colors[0].pink.x, y:this.props.colors[0].pink.y}}>
            <div className={style.pinkball}></div>
        </Draggable>
        <Draggable  onStop={this.onStop('black')} position={{x:this.props.colors[0].black.x, y:this.props.colors[0].black.y}}>
            <div className={style.blackball}></div>
        </Draggable>
        <Draggable  onStop={this.onStop('grey')} position={{x:this.props.colors[0].grey.x, y:this.props.colors[0].grey.y}}>
            <div className={style.greyball} ></div>
        </Draggable>
        <Draggable  onStop={this.onStop('yellow')} position={{x:this.props.colors[0].yellow.x, y:this.props.colors[0].yellow.y}}>
            <div className={style.yellowball} ></div>
        </Draggable>
        <Draggable  onStop={this.onStop('brown')} position={{x:this.props.colors[0].brown.x, y:this.props.colors[0].brown.y}}>
            <div className={style.brownball} ></div>
        </Draggable>
        <Draggable  onStop={this.onStop('turquoise')} position={{x:this.props.colors[0].turquoise.x, y:this.props.colors[0].turquoise.y}}>
            <div className={style.turquoiseball} ></div>
        </Draggable>
        <button className={style.diceButton} onClick={()=>this.rollDice()}>
            Roll Dice
        </button>
        <div className={style.dice}>
            {this.props.number}
        </div>
        </div>
        
        <img  src={poke}/>
        <div>
            <Dialog
              onClose={()=>this.handleClickAway()}
              open={this.state.open}
              >
              <div>
                  <div className={style.modalHeader}>
                    <div  className={style.elven} style={{backgroundColor:`${this.state.background}`}} >
                      Speak Friend and Enter
                    </div>
                  </div>
                  <div className={style.modalBody}>
                    <input className={style.modalInput}  value={this.state.pass} onChange={this.updateName('pass')}/>
                    <button className={style.modalButton} onClick={()=>this.submitReset()}>Enter</button>
                  </div>
              </div>
              </Dialog>
        </div>
        <button className={style.reset} onClick={()=>{this.resetBoard()}}>Reset</button>
        {/* <div> */}
          {/* <div className={style.board}>
          <div className={style.row}>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
           </div>
           <div className={style.row}>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
           </div>
           <div className={style.row}>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
           </div>
           <div className={style.row}>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
           </div>
           <div className={style.row}>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
           </div>
           <div className={style.row}>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
           </div>
           <div className={style.row}>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
           </div>
           <div className={style.row}>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
           </div>
           <div className={style.row}>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
             <div className={style.tile}></div>
           </div> */}
          {/* </div> */}
          <div className={style.playerInfo}>
              {/* <input placeholder="Enter Name" value={this.state.name} onChange={this.updateName('name')} onSubmit={()=>this.submitPlayer()}/>
              <select value={this.state.piece} onChange={this.updateName('piece')}>
              <option value=''>Select a Color</option>
                  {this.props.colors.map(color => {
                      return(
                         <option value={color}>{color}</option>   
                      )
                  })}
              </select>
              <button onClick={()=>this.submitPlayer()}>Submit</button>
             <div>
                 {this.props.playerList.map(player => {
                     return(
                         <div>
                             {player.name}<br></br>
                             {player.piece}<br></br>
                             {player.position}
                        </div>
                     )
                 })} 
                 {JSON.stringify(this.state)}
             </div> */}
          </div>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    number: state.playerReducer,
    colors: state.colorReducer,
  });

export default connect(mapStateToProps)(Board);
