import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import {Link} from 'react-router-dom';
import TopLevelMenuItem from './NavigationMenuItem';
import Chip from '@material-ui/core/Chip';
import Hidden from '@material-ui/core/Hidden';
import pxIcon from "../icons/pxblue.png";
import pxLogo from "../icons/pxblue.svg";
import {PX_BLUE_VERSION} from '../constants/ui';

import * as Colors from '@pxblue/colors';

const styles = theme => ({
  sidenav: {
    display: 'flex', 
    flexDirection: 'column', 
    height: '100%'
  },
  largeImage:{
    height: 'auto', 
    width: '300px',
    marginLeft: '-5px', 
    transition:'all 150ms ease-in-out'
  },
  smallImage:{
    height: '38px', 
    width: 'auto', 
    margin: '8px', 
    transition:'all 150ms ease-in-out'
  },
  chip:{
    height: 'auto',
    backgroundColor: theme.palette.primary[500],
    color: 'white'
  },
  float: {
    position: 'absolute',
    top: '12px',
    right: '46px'
  },
  routes:{
    overflowY: 'auto', 
    overflowX: 'hidden',
    marginLeft: '64px',
    flexGrow: 1
  },
  contactus:{
    flex: '0 0 auto', 
    background: Colors.gray[50],
    '& a':{
      marginLeft: '80px',
      lineHeight: '64px'
    }
  }
});

class SideNav extends Component {

  constructor(props){
    super(props);
    this.pagesOpen = [];
  }

  toggleList(index){
    this.pagesOpen[index] = !this.pagesOpen[index];
  }

  openAndCollapseOthers(index){
    for(let i=0; i < this.props.pages.length; i++){
      this.pagesOpen[i] = (i === index);
    }
  }

  render(){
    const {classes} = this.props;

    return(
    <div className={classes.sidenav}>
      <Link to="/" style={{textDecoration: 'none'}} onClick={this.props.close ? () => this.props.close() : null}>
        <Toolbar style={{height: 64}}>
          <Hidden smDown>
              <img className={classes.largeImage} src={pxLogo} alt="Power Xpert Blue"/>
            <Chip color={'primary'} className={classes.chip + ' ' + classes.float} label={`v${PX_BLUE_VERSION}`}/>
          </Hidden>
          <Hidden mdUp>
            <img className={classes.smallImage} src={pxIcon} alt=""/>
            <Typography variant="h6">
              Power Xpert <strong>Blue</strong>&nbsp;
            </Typography>
            <Chip className={classes.chip} label={`v${PX_BLUE_VERSION}`}/>
          </Hidden>
          <Divider absolute/>
        </Toolbar>
      </Link>
      <List className={classes.routes}>
        {this.props.pages.map((page, index) =>
          <TopLevelMenuItem key={page.displayName} config={page}/>
        )}
      </List>
      <div className={classes.contactus}>
        <Divider/>
        <a href="mailto:pxblue@eaton.com">Contact Us</a>
      </div>
    </div>);
  }
}

export default withStyles(styles)(SideNav);