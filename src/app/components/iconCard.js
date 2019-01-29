import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// Material-UI Components
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  wrapper:{
    width: '100px', 
    display:'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    margin:'0 15px 30px 15px'
  },
  label:{
    cursor: 'default', 
    width: '100%', 
    //overflow: 'hidden', 
    textAlign: 'center', 
    //whiteSpace: 'nowrap', 
    //textOverflow: 'ellipsis', 
    wordBreak: 'break-word',
    marginTop: '5px'
  }
});


class IconCard extends React.Component {
  render() {
    const {component:Component, name, classes} = this.props;
    return (
      <div className={classes.wrapper}>
        <Component fontSize={'inherit'}/> 
        <Typography title={name} variant="subtitle2" className={classes.label}>{name}</Typography>
      </div>
    );
  }
}
export default withStyles(styles)(IconCard);
