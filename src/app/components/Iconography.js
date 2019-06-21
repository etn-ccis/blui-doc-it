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
  FormControlLabel
} from '@material-ui/core';
import * as MaterialIcons from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
const meta = require('@pxblue/icons-mui/index.json');

// const percent = 66;
const size = 48;
const colorSet = PXBColors;
const colors = ['red','orange','gold','yellow','green','lightBlue','blue','purple','gray', 'black'];
const weight = 300;
const hideResultsThreshold = 20;

class Iconography extends React.Component {
  constructor(props){
    super(props);
    this.props.updateToolbarTitle();
    this.state={
      search: '',
      hideLetterGroups: {},
      focusedIcon: {
          name: '',
          isMaterial: true,
      },
      filterMaterial: false
    }
    this.icons = createIconList();
  }

  iconMatches(icon){
      if(this.state.filterMaterial && icon.isMaterial){
        return false;
      }    
      let searchArray = this.state.search.trim().toLowerCase().split(/\s+/);
      for (var i = 0; i < searchArray.length; i++){
        if (getMuiIconName(icon.name).toLowerCase().indexOf(searchArray[i].trim()) === -1) {
          return false;
        }
      }
      
      return true;
  }

  toggleCollapse(letterGroup){
    let hidden = this.state.hideLetterGroups;
    hidden[letterGroup] = (!this.state.hideLetterGroups[letterGroup]);
    this.setState({hideLetterGroups: hidden});
  }
  
  render() {
    const {classes} = this.props;
    const iconList = this.icons;
    const filteredIconList = iconList.filter((icon) => this.iconMatches(icon)).sort();
    const groupedIcons = groupIconList(filteredIconList);

    return (
      <div>
        
        <h1>Iconography Guidelines</h1>
        <p>
          Power Xpert Blue is built on top of the Google Material design system, which allows us to take advantage of their extensive icon library and icon grid. These icons are available automatically when you use one of our supported Material component frameworks. PX Blue also includes a number of supplemental icons specific to Eaton products.
        </p>
        <p>
          These icons are available in a variety of formats - select an icon below to view its usage instructions.
        </p>
        
        <Paper elevation={4}>
        <AppBar position="static" color="primary" classes={{root: classes.header}}>
          <Toolbar>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Icons
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <MaterialIcons.Search />
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
        <div className={classes.hideIconsLabel}>
          <FormControlLabel
            control={<Checkbox color="primary" onClick={() => this.setState({filterMaterial: !this.state.filterMaterial})}/>}
            label="Hide Material Icons"
            labelPlacement="start"
          />
        </div>
        <div style={{padding: '24px'}}>
          {Object.keys(groupIconList(iconList)).sort().map((letterGroup) => {
            if (!groupedIcons[letterGroup]) {return null;}
            return (<React.Fragment key={`${letterGroup}_group`}>
              <Typography variant={'h6'} 
                color={'primary'} 
                className={classes.groupHeader} 
                onClick={() => this.toggleCollapse(letterGroup)}
                >
                {letterGroup}
                {filteredIconList.length <= hideResultsThreshold ? null : 
                [this.state.hideLetterGroups[letterGroup] ? 
                   <MaterialIcons.ExpandLess key={letterGroup + letterGroup.length} className={classes.toggleIcon}/>
                  :<MaterialIcons.ExpandMore  key={letterGroup + letterGroup.length} className={classes.toggleIcon}/>
                ]
              }
              </Typography>
              <Collapse in={filteredIconList.length <= hideResultsThreshold ? true : this.state.hideLetterGroups[letterGroup]} timeout="auto" unmountOnExit>
                <div className={classes.section}>
                  {groupedIcons[letterGroup]
                    .filter((icon) => this.iconMatches(icon))
                    .sort((a, b) => {
                       if(a.name.toUpperCase() > b.name.toUpperCase()){return 1;}
                       else{return -1;}
                     })
                    .map((icon) => {
                      return <div
                              key={icon.name + icon.isMaterial.toString()}
                              onClick={() => this.setState({focusedIcon: icon})}> 
                              <IconCard 
                                key={icon.name} 
                                component={icon.isMaterial ? MaterialIcons[icon.name] : Icons[getMuiIconName(icon.name)]} 
                                name={ unCamelCase(getMuiIconName(icon.name))} 
                                style={{margin: '0 15px 25px 15px', cursor: 'pointer', width: 100, padding: '5px'}}
                                selected={this.state.focusedIcon && this.state.focusedIcon.name === icon.name}
                              />
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
          If you are looking for the PX Blue 1.0 symbols, please refer to our <a href="https://github.com/pxblue/icons/tree/master/symbols" target="_blank" rel="noopener noreferrer">GitHub</a>. 
        </p>
        <p style={{marginBottom: '50vh'}}>
          If you have your own design resources who are able to create icons, you can build these on your own, following the <a href="https://material.io/guidelines/style/icons.html#icons-product-icons" target="_blank" rel="noopener noreferrer">Material Icon Guidelines</a> to maintain a common look and feel. If you do not have your own designers, we can work with you to build the icon you need. We can either build the icon in house or recommend external resources that you can use. Please note that going this route may take extra time, so try to get requests in as early as possible. If you are making your own icons, please consider contributing these back into the PX Blue icon library (subject to review).
        </p>
        <Footer />
        {this.state.focusedIcon.name && 
          <IconMenu 
            onClose={() => this.setState({focusedIcon: {}})}
            open={true} 
            icon={this.state.focusedIcon}
          />
        }
      </div>
      
    );
  }
}

const unCamelCase = (val) => {
   return val.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
   .replace(/([a-zA-Z])([0-9])/g, '$1 $2')
   .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
   .replace(/^./, function(str){ return str.toUpperCase(); })
}

const getMuiIconName = (filename)=>{
  return filename
  .replace(/\.svg/, '')
  .replace(/(^.)|(_)(.)/g, (match, p1, p2, p3) => (p1 || p3).toUpperCase());
}

const createIconList = () =>{
  let iconList = [];
  getFilteredIcons().forEach((icon) => {
      const mui = getMuiIconName(icon.filename);
      if(Icons[mui]){iconList.push({name: icon.filename.replace(/\.svg/, ''), isMaterial: false});}
    })
  Object.keys(MaterialIcons)
    .filter((name) => {
            if(name.indexOf('Outlined') >= 0){return false;}
            if(name.indexOf('Rounded') >= 0){return false;}
            if(name.indexOf('Sharp') >= 0){return false;}
            if(name.indexOf('TwoTone') >= 0){return false;}
            return true;
    })
    .forEach((iconName) => {
      iconList.push({name: iconName, isMaterial: true})
    }
  )
  return iconList;
}

const groupIconList = (iconList) =>{
  let groupings = {};
  iconList
    .forEach((icon) => {
      if(!groupings[icon.name.toUpperCase().charAt(0)]){
        groupings[icon.name.toUpperCase().charAt(0)] = []
      }
      groupings[icon.name.toUpperCase().charAt(0)].push({name: icon.name, isMaterial: icon.isMaterial})
    });
  return groupings
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
    width: theme.spacing.unit * 5,
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
    height: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 6,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 140,
      '&:focus': {
        width: 200
      }
    }
  },
  hideIconsLabel: {
    display: 'inline-block',
    float: 'right',
    paddingRight: '25px'
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
