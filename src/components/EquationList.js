import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, List, ListItem, ListItemIcon, ListItemText, Typography} from '@material-ui/core';
import Brightness1 from '@material-ui/icons/Brightness1';

const styles = theme => ({
    root : {
        background : 'white',
        float: 'left',
    },

})



class EquationList extends Component {

  render() {
    const classes = styles();
    return(
        <div className={classes.root}>
        <Typography variant="h5">
          User Submitted Equations
        </Typography>
        <List>
        {this.props.equationList.map( equation => {
            return(
            <ListItem>
            <ListItemIcon>
                <Brightness1/>
            </ListItemIcon>
            <ListItemText primary= {equation} />
          </ListItem>
            )
        })}
          
        </List>
      </div>
    )
  }
};

const mapStateToProps = state => ({
    equationList: state,
  });

export default connect(mapStateToProps) (withStyles(styles)(EquationList));
