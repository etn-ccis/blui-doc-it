import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import { connect } from "react-redux";
import { updateTitle } from "../actions/ui";
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import pxIcon from '../icons/pxblue-white.svg';
// import interaction from "../icons/interaction.svg";
import reuse from "../icons/reuse.svg";
import mobile from "../icons/mobile.svg";
// import cybersecurity from "../icons/cybersecurity.svg";
import design from "../icons/design.svg";
// import tested from "../icons/tested.svg";
import ux from "../icons/ux.svg";
import visual from "../icons/visual.svg";
import circles from "../icons/circles-bg.svg";
import code from "../icons/code.svg";
import patterns from "../icons/patterns.svg";
import Hidden from '@material-ui/core/Hidden';

import * as Colors from '@pxblue/colors';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignContent: 'center',
    width: '100%',
  },
  listBar: {
    whiteSpace: 'normal',
    textOverflow: 'unset',
  },
  listTile: {
    width: '50%',
    textDecoration: 'none'
  },
  jumboHeader: {
    backgroundImage: `url(${circles})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    position: 'relative',
    padding: '4rem',
    display: 'flex',
    alignItems: 'start',
    marginTop: 0,//'-64px',
    zIndex: '0',
    minHeight: '40vh',
    [theme.breakpoints.down('xs')]: {
      padding: '1rem',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  spinningLogo:{
    height: '5rem', 
    width: '5rem', 
    animation: 'spin 3s linear infinite'
  },
  title:{
    color: 'white', 
    fontSize: '3rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.9rem',
      textAlign: 'center'
    }
  },
  subtitle:{
    color: 'white', 
    fontSize: '2rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '.9rem',
      textAlign: 'center'
    }
  }
});

const tileData = [
  {
    img: code,
    title: 'Get Started Guides',
    description: 'Instructions for developers to prepare for PX Blue development',
    url: '/development/environment'
  },
  {
    img: mobile,
    title: 'Framework Flexibility',
    description: 'Support for multiple JavaScript frameworks for both web and mobile',
    url: '/development/frameworks-web/intro'
  },
  {
    img: ux,
    title: 'Component Libraries',
    description: 'Well-maintained, open source components for use in your applications',
    url: '/development/frameworks-web/intro'
  },
  {
    img: design,
    title: 'Design Patterns',
    description: 'Explanations for common interface elements and interactions',
    url: '/patterns/appbar'
  },
  {
    img: patterns,
    title: 'Code Samples',
    description: 'Live examples of how to implement various design patterns',
    url: '/patterns/appbar'
  },
  {
    img: visual,
    title: 'Style Guide',
    description: 'Information about our color palette, typography, and iconography',
    url: '/style/color'
  },
  {
    img: reuse,
    title: 'Open Source Resources',
    description: 'Themes, Color Palettes, Icon Font, and more available through npm',
    url: '/resources'
  }
];


class HomeComponent extends React.Component {
  constructor(props){
    super(props);
    this.props.updateToolbarTitle();
  }

  render() {
    const {classes} = this.props;

    return (
      <div>
        <AppBar className={classes.jumboHeader} color='primary'>
            <img className={classes.spinningLogo} src={pxIcon} alt=""/>
            <Typography variant={"h6"} className={classes.title}>
              Power Xpert<sup style={{fontSize: '2rem'}}>&reg;</sup> <strong>Blue</strong>&nbsp;
            </Typography>
            <Typography className={classes.subtitle}>A Design System for Eaton Applications</Typography>
        </AppBar>
        <Hidden smDown implementation="css">
          <div className={classes.gridList}>
            {tileData.map((tile, i) => (
              <Link to={tile.url} key={tile.title} className={classes.listTile} 
              style={{backgroundColor: (i % 4 === 0 || i % 4 === 3) ? Colors.gray[50] : 'white'}}>
                <div style={{margin: '4rem'}}>
                  <img src={tile.img} alt={tile.title}/>
                  <Typography variant="h6" style={{color: Colors.black[500]}}>{tile.title}</Typography>
                  <Typography variant="subtitle1" className={classes.listBar}>{tile.description}</Typography>
                </div>
              </Link>
            ))}
          </div>
        </Hidden>
        <Hidden mdUp implementation="css">
          <div className={classes.gridList}>
            {tileData.map((tile, i) => (
              <Link to={tile.url} key={tile.title} style={{backgroundColor: (i % 2 === 0) ? Colors.gray[50] : 'white', width: '100%'}}>
                <div style={{margin: '4rem'}}>
                  <img src={tile.img} alt={tile.title}/>
                  <Typography variant="h6" style={{color: Colors.black[500]}}>{tile.title}</Typography>
                  <Typography variant="subtitle1" className={classes.listBar}>{tile.description}</Typography>
                </div>
              </Link>
            ))}
          </div>
        </Hidden>
      </div>
    );
  }
}

HomeComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    updateToolbarTitle: () => {
      dispatch(updateTitle());
    }
  };
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(HomeComponent));
