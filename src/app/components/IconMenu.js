import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import * as MaterialIcons from '@material-ui/icons';

// PX Blue Icons and Symbols
import * as Icons from '@pxblue/icons-mui';
import IconCard from './iconCard';

// Material-UI Components
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {
  Tabs,
  Tab,
  Typography, 
  ExpansionPanelSummary,
  ExpansionPanel,
  ExpansionPanelActions,
  Button,
} from '@material-ui/core';
const meta = require('@pxblue/icons-mui/index.json');

const styles = theme => ({
  usageBox: {
    padding: '10px ' + theme.spacing.unit*2 + 'px 0px ' + theme.spacing.unit*2 + 'px',
    overflowX: 'auto',
    wordWrap: 'break-word',
    height: '230px',
    overflowY: 'hidden',
  },
  iconSheet: {
    width: '100%',
    left: '0px',
    right: '0px',
    bottom: '0px',
    position: 'fixed',
    marginLeft: 'auto',
    marginRight: 'auto',
    outline: 'none',
    [theme.breakpoints.up('md')]: {
      left: '364px',
      width: '600px',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
  }, 
  aboutPage: {
    padding: '5px',
    backgroundColor: 'inherit',
    whiteSpace: 'pre-wrap'
  },
  miniTab: {
    minWidth: '50px'
  }
});

const instructionLinks = [
  "https://github.com/pxblue/icons",
  "https://www.npmjs.com/package/@pxblue/icons-svg",
  "https://www.npmjs.com/package/@pxblue/icons-mui",
  "https://material-ui.com/components/icons/#svg-icons",
  "https://material-ui.com/components/icons/#font-icons",
  "https://material.angular.io/components/icon/overview#font-icons-with-ligatures",
  "https://material.angular.io/components/icon/overview#svg-icons"
];

class IconMenu extends React.Component {
  
  state = {
    activeTab: 0,
    expanded: true
  };
  toggleExpand = (event, expanded) => {
    if(!expanded){document.body.style.overflow="visible"}
  }
  
  getIconFile(name){
    for(var i = 0; i < meta.icons.length; i++){
      if(meta.icons[i].filename.includes(name)){
        return meta.icons[i]
      }
    }
    return -1;
  }
  
  getTabContent(tab){
    const isMaterial = this.props.icon.isMaterial;
    const name = this.props.icon.name;
    const classes = this.props.classes;
    
    switch(tab){
      case 0:
        return (
          <React.Fragment>
            {isMaterial && <Typography style={{marginBottom: '10px'}} variant="subtitle2">View detailed usage and installation instructions for <a href={instructionLinks[4]} target="_blank" rel="noopener noreferrer">React</a> and <a href={instructionLinks[5]} target="_blank" rel="noopener noreferrer">Angular</a>.</Typography>}
            {!isMaterial && <Typography style={{marginBottom: '10px'}} variant="subtitle2">For detailed usage and installation instructions, visit our <a href={instructionLinks[0]} target="_blank" rel="noopener noreferrer">GitHub</a>.</Typography>}
            <Typography variant="subtitle2">React</Typography>
            {!isMaterial && <pre>&lt;i className=“pxb-{name}&gt;&lt;&#47;i&gt;</pre>}
            {isMaterial && <pre>import Icon from &#039;@material-ui&#47;core&#47;Icon&#039;; <br/>&lt;Icon&gt;{getSnakeCase(name)}&lt;&#47;Icon&gt;</pre>}
            <Typography variant="subtitle2">Angular</Typography>
            {!isMaterial && <pre>&lt;i class=“pxb-{name}&gt;&lt;&#47;i&gt;</pre>}
            {isMaterial && <pre>&lt;i class="{getSnakeCase(name)}"&gt;&lt;&#47;i&gt;</pre>}
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            {isMaterial && <Typography style={{marginBottom: '10px'}} variant="subtitle2">View detailed usage and installation instructions for <a href={instructionLinks[3]} target="_blank" rel="noopener noreferrer">React</a> and <a href={instructionLinks[6]} target="_blank" rel="noopener noreferrer">Angular</a>.</Typography>}
            {!isMaterial && <Typography style={{marginBottom: '10px'}} variant="subtitle2">For detailed usage and installation instructions, visit our <a href={instructionLinks[1]} target="_blank" rel="noopener noreferrer">GitHub</a>.</Typography>}
            <Typography variant="subtitle2">React</Typography>
            {!isMaterial && <pre>const icon = require(&#039;@pxblue&#47;icons-svg&#47;{name}.svg&#039;); <br/>&lt;img src=&#123;icon&#125;&#47;&gt;</pre>}
            {isMaterial && <pre>import {name + 'Icon'} from &#039;@material-ui&#47;icons&#47;{name}&#039;; <br/>&lt;{name + 'Icon'}&gt;&lt;&#47;{name + 'Icon'}&gt;</pre>}
            <Typography variant="subtitle2">Angular</Typography>
            {!isMaterial && <pre>&lt;mat-icon svgIcon=&quot;{name}&quot;&gt;&lt;&#47;mat-icon&gt;</pre>}
            {isMaterial && <pre>&lt;mat-icon&gt;{getSnakeCase(name)}&lt;&#47;mat-icon&gt;</pre>}
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            {!isMaterial && <Typography style={{marginBottom: '10px'}} variant="subtitle2">For detailed usage and installation instructions, visit our <a href={instructionLinks[2]} target="_blank" rel="noopener noreferrer">GitHub</a>.</Typography>}
            <Typography variant="subtitle2">React</Typography>
            <pre>import {getMuiIconName(name)}Icon from '@pxblue&#47;icons-mui&#47;{getMuiIconName(name)}'; <br/>&lt;{getMuiIconName(name)}Icon&gt;&lt;&#47;{getMuiIconName(name)}Icon&gt;</pre>
            <Typography variant="subtitle2">Angular</Typography>
            <Typography variant="subtitle2">Icon components are intended for use only in React applications. For a way to link svg icons for use in Angular applications, see <a href={"https://github.com/pxblue/icons/tree/master/svg#angular-1"} target="_blank" rel="noopener noreferrer">@pxblue/icons</a>.</Typography>
          </React.Fragment>
        );
        
      case 3:
        return (
          <React.Fragment>
            {!isMaterial &&
              <div className={classes.aboutPage}>
                <Typography variant="subtitle1">Filename: {this.getIconFile(name).filename}</Typography>
                <Typography variant="subtitle1">Family: {this.getIconFile(name).family.toString()}</Typography>
                <Typography variant="subtitle1">Author: {this.getIconFile(name).author}</Typography>
                {this.getIconFile(name).description && <Typography variant="subtitle1">Description: {this.getIconFile(name).description}</Typography>}
              </div>
            }
          </React.Fragment>
        );
      
      default:
        return (<h1>{`Yo yo ${tab}`}</h1>);
    }
  }
  
  render(){
    const {open, icon, classes} = this.props;
    const isMaterial = icon.isMaterial;
    const name = icon.name;
    const {activeTab} = this.state;
    return(
      <div className={classes.iconSheet} hidden={!open} >
          <ExpansionPanel 
            square
            defaultExpanded={true}
            elevation={16}
            >
          <ExpansionPanelSummary
            expandIcon={<ExpandLessIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div style={{flexDirection: 'row', display: 'flex'}}>
              <div style={{flex: '0 1 auto', width: 'auto'}}>
                <IconCard  
                  key={name} 
                  component={isMaterial ? MaterialIcons[name] : Icons[getMuiIconName(name)]} 
                  name={name} 
                  showLabel={false} 
                  iconSize={40}
                  style={{margin: '5 5px 5px 5px'}}
                />
              </div>
              <div style={{flexDirection: 'column', flex: '0 1 auto'}}> 
                <Typography style={{marginBottom: '0px', marginLeft: '10px', flex: '0 0 auto'}} variant="subtitle2" gutterBottom>
                  {unCamelCase(getMuiIconName(name))}
                </Typography>
                <Typography style={{marginTop: '0px', marginLeft: '10px', flex: '0 0 auto'}} variant="caption" color={isMaterial ? "default" : "primary"}>
                  {isMaterial ? 'Material Icon' : 'PX Blue Icon'}
                </Typography>
              </div>
            </div>
          </ExpansionPanelSummary>
          <div style={{width: 'auto'}}>
            <Tabs
              style={{marginTop: '0px', marginLeft: '0px'}}
              value={activeTab}
              onChange={(event, newTab) => this.setState({ activeTab : newTab })}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Icon Font" className={classes.miniTab}/>
              <Tab label="SVG" className={classes.miniTab}/>
              {!isMaterial && <Tab label="Component" className={classes.miniTab}/>}
              {!isMaterial && <Tab label="About" className={classes.miniTab}/>}
            </Tabs>
          </div>
          <div className={classes.usageBox}>
            {activeTab===2 && isMaterial && this.setState({activeTab: 1})}
            {activeTab===3 && isMaterial && this.setState({activeTab: 1})}
            {activeTab === 0 && this.getTabContent(0)}
            {activeTab === 1 && this.getTabContent(1)}
            {activeTab === 2 && this.getTabContent(2)}
            {activeTab === 3 && this.getTabContent(3)}
            
          </div>
          <ExpansionPanelActions display="none">
            <Button variant="contained" color= 'inherit' onClick={this.props.onClose}>
              Close
            </Button>
            {isMaterial &&
              <Button variant="contained" color= 'primary' target="_blank" href={"https://material.io/tools/icons/?icon=" + getSnakeCase(name) + "&style=baseline"}>
                Open in Material.io
              </Button>
            }
          </ExpansionPanelActions>

        </ExpansionPanel>
      </div>
      );
    }
  }
  const getMuiIconName = (filename)=>{
    return filename
    .replace(/\.svg/, '')
    .replace(/(^.)|(_)(.)/g, (match, p1, p2, p3) => (p1 || p3).toUpperCase());
  }
  
  const getSnakeCase = (name) => {
    return name.replace(/[A-Z]/g, "_$&").toLowerCase().substr(1);
  }
  
  const unCamelCase = (val) => {
    return val.replace(/([a-z])([A-Z])/g, '$1 $2')
     .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
     .replace(/^./, function(str){ return str.toUpperCase(); })
  }

export default withStyles(styles)(IconMenu);