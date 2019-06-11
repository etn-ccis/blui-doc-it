import React from 'react';
import { connect } from "react-redux";
import { updateTitle } from "../actions/ui";
import Footer from "./Footer";

// PX Blue Icons and Symbols
import * as Progress from '@pxblue/react-progress-icons';
import * as PXBColors from '@pxblue/colors';
import * as Icons from '@pxblue/icons-mui';
import IconCard from './iconCard';
import IconMenu from './IconMenu';

// Material-UI Components
import {
  Typography,
  Collapse,
  AppBar,
  Paper,
  Toolbar,
  Divider,
  InputBase,
  Checkbox,
} from '@material-ui/core';
import * as MaterialIcons from '@material-ui/icons';
import {Search as SearchIcon, ExpandMore, ExpandLess} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
const meta = require('@pxblue/icons-mui/index.json');

// const percent = 66;
const size = 48;
const colorSet = PXBColors;
const colors = ['red','orange','gold','yellow','green','lightBlue','blue','purple','gray', 'black'];
const weight = 300;

const WhiteCheckbox = withStyles({
  root: {
    color: PXBColors.gray[50],
    '&$checked': {
      color: PXBColors.gray[50],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

class Iconography extends React.Component {
  constructor(props){
    super(props);
    this.props.updateToolbarTitle();
    this.closeMenu = this.closeMenu.bind(this);
    this.state={
      search: '',
      hide: {},
      iconTag: ['', ''],
      open: false,
      filter: false
    }
  }
  
  
  onIconClick(iconID){
     this.setState({iconTag: iconID});
     this.setState({open: true});
   }

  iconMatches(icon){
    
      if(this.state.filter && icon[1]===1){
        return false;
      }
      
      if (getMuiIconName(icon[0]).toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) {
        return true;
      }
      
      return false;
    }

  toggleCollapse(family){
    let hidden = this.state.hide;
    hidden[family] = (!this.state.hide[family]);
    this.setState({hide: hidden});
  }
  
  toggleFilter(){
    let filterState = !this.state.filter;
    this.setState({filter: filterState});
  }
  
  closeMenu(){
    this.setState({open: false});
  }
  
  render() {
    const {classes} = this.props;
    const iconFamilies = groupIconsByFamily();

    return (
      <div>
        <div className={classes.searchBox}>
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
        </div>
        
        <h1>Iconography Guidelines</h1>
        <p>
          Power Xpert Blue is built on top of the Google Material design system, which allows us to take advantage of their extensive icon library and icon grid. When you need an icon, consider using the Material Icon Library first. These icons are available automatically when you use one of our supported Material component frameworks.
        </p>
        <p>
          If the Material Icons don't have what you need, PX Blue has a number of supplemental icons available. These can be found on our <a href="https://github.com/pxblue/icons" target="_blank" rel="noopener noreferrer">GitHub</a> page in both SVG format and as an icon font and can also be browsed below.
        </p>
        <Paper elevation={4}>
          <AppBar position="static" color="primary" classes={{root: classes.header}}>
            <Toolbar>
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                Icons
              </Typography>
              <div className={classes.grow} />
              <Typography className={classes.title} variant="subtitle2" color="inherit" noWrap>
                Hide Material Icons
              </Typography>
              <WhiteCheckbox
                    checked={this.state.filter}
                    onChange={() => this.toggleFilter()}
              />
            </Toolbar>
          </AppBar>
          <div style={{padding: '24px'}}>
            {Object.keys(iconFamilies).sort().map((family) => {
              const iconList = iconFamilies[family].filter((icon) => this.iconMatches(icon)).sort();
              if (iconList.length < 1) {return null;}
              return (<React.Fragment key={`${family}_group`}>
                <Typography variant={'h6'} 
                  color={'primary'} 
                  className={classes.groupHeader} 
                  onClick={() => this.toggleCollapse(family)}
                  >
                  {family}
                  {this.state.search.length > 2 ? null : 
                  [this.state.hide[family] ? 
                     <ExpandLess key={family + family.length} className={classes.toggleIcon}/>
                    :<ExpandMore  key={family + family.length} className={classes.toggleIcon}/>
                  ]
                }
                </Typography>
              
                <Collapse in={this.state.search.length > 2 ? true : this.state.hide[family]} timeout="auto" unmountOnExit>
                  <div className={classes.section}>
                    {iconFamilies[family]
                      .filter((icon) => this.iconMatches(icon))
                      .sort(Intl.Collator().compare)
                      .map((icon) => {
                        return <div
                                key={icon[0] + icon[1]}
                                className={classes.clicker}
                                onClick={this.onIconClick.bind(this, icon)}> 
                              <IconCard  key={icon[0]} component={icon[1] === 1 ? MaterialIcons[icon[0]] : Icons[getMuiIconName(icon[0])]} name={getMuiIconName(icon[0])} type={true}/>
                              </div>
                      })
                    }
                  </div>
                </Collapse>
                <Divider/>
              </React.Fragment>
            )})}
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
        <p>
          If you are looking for the PX Blue 1.0 symbols, please refer to our <a href="https://github.com/pxblue/icons" target="_blank" rel="noopener noreferrer">GitHub</a>. 
        </p>
        <p style={{marginBottom: '50vh'}}>
          If you have your own design resources who are able to create icons, you can build these on your own, following the <a href="https://material.io/guidelines/style/icons.html#icons-product-icons" target="_blank" rel="noopener noreferrer">Material Icon Guidelines</a> to maintain a common look and feel. If you do not have your own designers, we can work with you to build the icon you need. We can either build the icon in house or recommend external resources that you can use. Please note that going this route may take extra time, so try to get requests in as early as possible. If you are making your own icons, please consider contributing these back into the PX Blue icon library (subject to review).
        </p>
        <Footer />
        <IconMenu 
          closeMenu={this.closeMenu}
          open={this.state.open} 
          tag={this.state.iconTag}
        />
      </div>
      
    );
  }
}

const getMuiIconName = (filename)=>{
  return filename
  .replace(/\.svg/, '')
  .replace(/(^.)|(_)(.)/g, (match, p1, p2, p3) => (p1 || p3).toUpperCase());
}

const groupIconsByFamily = ()=>{
  let groupings = {};
  getFilteredIcons().forEach((icon) => {
      if(!groupings[icon.name.charAt(0).toUpperCase()]){
        groupings[icon.name.charAt(0).toUpperCase()] = []
      }
      const mui = getMuiIconName(icon.filename);
      if(Icons[mui]){groupings[icon.name.charAt(0).toUpperCase()].push([icon.filename.replace(/\.svg/, ''), 0]);}
    })
    
    
    Object.keys(MaterialIcons)
    .filter((name) => {
            if(name.indexOf('Outlined') >= 0){return false;}
            if(name.indexOf('Rounded') >= 0){return false;}
            if(name.indexOf('Sharp') >= 0){return false;}
            if(name.indexOf('TwoTone') >= 0){return false;}
            return true;
    })
    .forEach((key) => {
      if(!groupings[key.charAt(0)]){
        groupings[key.charAt(0)] = []
      }
      groupings[key.charAt(0)].push([key, 1])
    }
  )
  //returns a tuple, ID 0 if PxBlue icon, ID 1 if Material Icon
  return groupings;
}

const getFilteredIcons = ()=>{
  return meta.icons.filter((icon) => 
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
    display: 'block'
  },
  header:{
    boxShadow: 'none'
  },
  clicker:{
    cursor: 'pointer',
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
    color: 'white',
    height: '100%',
    backgroundColor: fade(theme.palette.primary[500], 0.15),
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
    width: '100%',
    height: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: 120,
    '&:focus': {
      width: 200
    }
  
  },
  searchBox: {
    zIndex: 5000,
    backgroundColor: theme.palette.primary[500],
    position: 'fixed',
    right: '0px',
    top: '0px',
    height: 56,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
        height: 48,
    },
    [theme.breakpoints.up('sm')]: {
        height: 64,
    },   
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
