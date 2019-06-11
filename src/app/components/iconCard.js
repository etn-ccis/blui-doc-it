import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import * as PXBColors from '@pxblue/colors';

// Material-UI Components
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  wrapper:{
    width: '100px', 
    display:'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    margin:'0 15px 30px 15px',
    color: PXBColors.black[900]
  },
  wrapperDrawer:{
    width: '100px', 
    display:'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    margin:'5 5px 5px 5px',
    color: PXBColors.black[900]
  },
  label:{
    cursor: 'default', 
    width: '100%', 
    //overflow: 'hidden', 
    textAlign: 'center', 
    //whiteSpace: 'nowrap', 
    //textOverflow: 'ellipsis', 
    wordBreak: 'break-word',
    marginTop: '5px',
    color: '#1d2529'
  },
  hidden:{
    display: 'none'
  },
  iconSizeMain:{
    fontSize: 'inherit'
  },
  iconSizeDrawer:{
    fontSize: '40px'
    
  }
});


class IconCard extends React.Component {
  render() {
    const {component:Component, name, type, classes} = this.props;
    return (
      <div className={type ? classes.wrapper : classes.wrapperDrawer}>
        <Component className={type ? classes.iconSizeMain : classes.iconSizeDrawer}/> 
        <Typography title={name} variant="subtitle2" className={type ? classes.label : classes.hidden}>{name}</Typography>
      </div>
    );
  }
}
export default withStyles(styles)(IconCard);
