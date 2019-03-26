import React from 'react';
import { connect } from "react-redux";
import { updateTitle } from "../actions/ui";
import Footer from "./Footer";

// PX Blue Icons and Symbols
import * as Progress from '@pxblue/react-progress-icons';
import * as PXBColors from '@pxblue/colors';
import * as Icons from '@pxblue/icons-mui';
import * as Symbols from '@pxblue/symbols-mui';
import IconCard from './iconCard';

// Material-UI Components
import {
  Typography,
  Collapse,
  AppBar,
  Paper,
  Toolbar,
  Divider,
  InputBase,
} from '@material-ui/core';
import {Search as SearchIcon, ExpandMore, ExpandLess} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
const meta = require('@pxblue/icons-mui/index.json');

// const percent = 66;
const size = 48;
const colorSet = PXBColors;
const colors = ['red','orange','gold','yellow','green','lightBlue','blue','purple','gray', 'black'];//Object.keys(colorSet);
const weight = 300;

class Iconography extends React.Component {
  constructor(props){
    super(props);
    this.props.updateToolbarTitle();
    this.state={
      search: '',
      hide: {}
    }
  }

  iconMatches(icon){
    if (icon.name.toLowerCase()
        .indexOf(this.state.search.toLowerCase()) !== -1) {
      return true;
    }
    // doing a return in a forEach does not end the execution - thus we use a normal for loop
    for(let i = 0; i < icon.tags.length; i++){
      const search = this.state.search.toLowerCase().trim();
      const match = icon.tags[i].toLowerCase().indexOf(search);
      if(match === 0){ // only match tags if they start with the search query
        return true;
      }
    }
    return false;
  }

  toggleCollapse(family){
    let hidden = this.state.hide;
    hidden[family] = (!this.state.hide[family]);
    this.setState({hide: hidden});
  }

  render() {
    const {classes} = this.props;

    const iconFamilies = groupIconsByFamily();
    const filteredSymbols = Object.keys(Symbols)
      .filter((key) => 
        key.toLowerCase().indexOf(this.state.search.toLowerCase().trim()) >= 0
      );

    return (
      <div>
        <h1>Iconography Guidelines</h1>
        <p>
          Power Xpert Blue is built on top of the Google Material design system, which allows us to take advantage of their extensive icon library and icon grid. When you need an icon, your first stop should be the <a href="https://material.io/icons/" target="_blank" rel="noopener noreferrer">Material Icon Library</a>. These icons are available automatically when you use one of our supported Material component frameworks.
        </p>
        <p>
          If the Material Icons don't have what you need, PX Blue has a number of supplemental icons available (as well as oneline symbols from PX Blue 1.0). These can be found on our <a href="https://github.com/pxblue/icons" target="_blank" rel="noopener noreferrer">GitHub</a> page in both SVG format and as an icon font an can also be browsed below.
        </p>
        <Paper elevation={4}>
          <AppBar position="static" color="primary" classes={{root: classes.header}}>
            <Toolbar>
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                PX Blue Icons / Symbols
              </Typography>
              <div className={classes.grow} />
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  value={this.state.search}
                  onChange={(evt) => this.setState({search: evt.target.value})}
                />
              </div>
            </Toolbar>
          </AppBar>
          <div style={{padding: '24px'}}>
            {Object.keys(iconFamilies).sort().map((family, ind) => {
              const iconList = iconFamilies[family].filter((icon) => this.iconMatches(icon)).sort();

              if (iconList.length < 1) {return null;}
              return (<React.Fragment key={`${family}_group`}>
                <Typography variant={'h6'} 
                  color={'primary'} 
                  className={classes.groupHeader} 
                  onClick={() => this.toggleCollapse(family)}>
                  {family}
                  {this.state.hide[family] ? 
                    <ExpandMore className={classes.toggleIcon}/>
                    : <ExpandLess className={classes.toggleIcon}/>
                  }
                </Typography>
                <Collapse in={!this.state.hide[family]} timeout="auto" unmountOnExit>
                  <div className={classes.section}>
                    {iconFamilies[family]
                      .filter((icon) => this.iconMatches(icon))
                      .sort()
                      .map((icon,index) => (
                        Icons[icon.mui] ? 
                          <IconCard key={`${family}_${icon.mui}`} component={Icons[icon.mui]} name={icon.name}/> 
                          : null
                      ))
                    }
                  </div>
                </Collapse>
                <Divider/>
              </React.Fragment>
            )})}

            {filteredSymbols.length > 0 && 
              <React.Fragment>
                <Typography variant={'h6'} 
                  color={'primary'} 
                  // style={{marginTop: '30px'}}
                  className={classes.groupHeader} 
                  onClick={() => this.toggleCollapse('symbols')}
                >
                  Symbols
                  {this.state.hide['symbols'] ? 
                    <ExpandMore className={classes.toggleIcon}/>
                    : <ExpandLess className={classes.toggleIcon}/>
                  }
                </Typography>
                <Collapse in={!this.state.hide['symbols']} timeout="auto" unmountOnExit>
                  <div className={classes.section} style={{fontSize: '64px'}}>
                    {filteredSymbols.map((symbol,index) => (
                        Symbols[symbol] ? 
                          <IconCard key={symbol} component={Symbols[symbol]} name={unCamelCase(symbol)}/>
                          : null
                    ))}
                  </div>
                </Collapse>
                <Divider/>
              </React.Fragment>
            }
          </div>
        </Paper>
        <h2>Progress Icons</h2>
        <p>PX Blue also offers a number of icons that can be used to show progress, health, or other percentage-based metrics. These can be dynamically adjusted programmatically (fill amount, color, size) based on properties in your application. You can read more about using these components on <a href="https://github.com/pxblue/icons/tree/master/progress" target="blank" rel="noopener noreferrer">GitHub</a>.</p>
        <Paper elevation={4}>
          <AppBar position="static" color="primary" classes={{root: classes.header}}>
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                PX Blue Progress Icons
              </Typography>
            </Toolbar>
          </AppBar>
          <div style={{textAlign: 'center', padding: '24px'}}>
            <Typography variant={'h6'}>{'Battery'}</Typography>
            {colors.map((key, index) => 
              <Progress.Battery key={`battery_${key}`} percent={(index+1)*10} size={size} color={colorSet[key][weight]} />
            )}
            <br/>
            <Typography variant={'h6'}>{'Pie'}</Typography>
            {colors.map((key, index) => 
              <Progress.Pie key={`pie_${key}`} percent={(index+1)*10} size={size} style={{color: colorSet[key][weight]}} />
            )}
            <br/>
            <Typography variant={'h6'}>{'Donut'}</Typography>
            {colors.map((key, index) => 
              <Progress.Pie key={`donut_${key}`} percent={(index+1)*10} size={size} color={colorSet[key][weight]} ring={4} />
            )}
            <br/>
            <Typography variant={'h6'}>{'Heart'}</Typography>
            {colors.map((key, index) => 
              <Progress.Heart key={`heart_${key}`} percent={(index+1)*10} size={size} style={{color: colorSet[key][weight]}} />
            )}
          </div>
        </Paper>

        <h2>Still can't find what you need?</h2>
        <p>
          If you decide that an icon is appropriate and there are no suitable options available, you can <a href="mailto:pxblue@eaton.com">Contact Us</a> to request a new icon. Please include a brief description of what the intended use is, and if possible a picture of where it will live in the context of your application. The UX team will review your request and provide a recommendation within 48 hours as to whether a new icon should be created or if an existing icon is available for you to use.
        </p>
        <p style={{marginBottom: '50vh'}}>
          If you have your own design resources who are able to create icons, you can build these on your own, following the <a href="https://material.io/guidelines/style/icons.html#icons-product-icons" target="_blank" rel="noopener noreferrer">Material Icon Guidelines</a> to maintain a common look and feel. If you do not have your own designers, we can work with you to build the icon you need. We can either build the icon in house or recommend external resources that you can use. Please note that going this route may take extra time, so try to get requests in as early as possible. If you are making your own icons, please consider contributing these back into the PX Blue icon library (subject to review).
        </p>
        <Footer />
      </div>
      
    );
  }
}

const unCamelCase = (val) => {
  return val.replace(/([a-z])([A-Z])/g, '$1 $2')
   .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
   .replace(/^./, function(str){ return str.toUpperCase(); })
}

const getMuiIconName = (filename)=>{
  return filename
  .replace(/\.svg/, '')
  .replace(/(^.)|(_)(.)/g, (match, p1, p2, p3) => (p1 || p3).toUpperCase());
}

const groupIconsByFamily = ()=>{
  let families = {};
  getFilteredIcons().forEach((icon, index) => {
    icon.family.forEach((family, fInd) => {
      if(!families[family]){
        families[family] = []
      }
      const mui = getMuiIconName(icon.filename);
      if(Icons[mui]){families[family].push(Object.assign(icon, {mui: mui}));}
    })
  })
  return families;
}

const getFilteredIcons = ()=>{
  return meta.icons.filter((icon, ind) => 
    !icon.family.includes('Progress')
  );
}

const styles = theme => ({
  section:{
    marginTop: '20px', 
    display: 'flex', 
    flexWrap: 'wrap', 
    fontSize: '36px'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  header:{
    boxShadow: 'none'
  },
  groupHeader:{
    cursor: 'pointer',
    '&:not(:first-of-type)':{
      paddingTop: theme.spacing.unit
    },
    paddingBottom: theme.spacing.unit
  },
  toggleIcon:{
    display: 'inline-block', 
    verticalAlign: 'text-bottom'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  }
});

function mapDispatchToProps(dispatch) {
  return {
    updateToolbarTitle: () => {
      dispatch(updateTitle());
    }
  };
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Iconography));
