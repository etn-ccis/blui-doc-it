import React, {Component} from 'react';
import compose from 'recompose/compose';
import {connect} from 'react-redux';
import * as ls from "local-storage";
import {Route, Switch} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {MuiThemeProvider, createMuiTheme, withStyles} from '@material-ui/core/styles';
import {SHOW_MOBILE, HIDE_MOBILE, TOGGLE_MOBILE} from './constants/ui';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import Mail from '@material-ui/icons/Mail'
import IconButton from '@material-ui/core/IconButton';
import SideNav from './components/SideNav';
import MarkdownDoc from './components/MarkdownDoc';
import './App.css';
import FrameworkSelector from "./components/FrameworkSelector";
import * as EatonTheme from '@pxblue/themes/react';
import Hidden from '@material-ui/core/Hidden';
import HomeComponent from "./components/Home";
import ColorComponent from "./components/Color";
import IconographyComponent from "./components/Iconography";
import CssBaseline from '@material-ui/core/CssBaseline';
import eaton from './icons/eaton.svg';
import {Fab} from '@material-ui/core';
import {fallTheme, winterTheme} from "./holidayThemes/holidayStyles";
import * as ColorsBranding from "@pxblue/colors-branding";
import circles from "./icons/circles-bg.svg"
import snowman from "./icons/snowman80.png";
import turkey from "./icons/turkey80.png";
require('typeface-roboto-mono');

const siteConfig = require('../docs/site-config.json');

const themes = [
    {
        name: 'default',
        message: '',
        theme: EatonTheme.blue,
        class: '',
        backgroundSize: 'cover',
        backgroundImage: `url(${circles})`,
        backgroundPosition: 'center center',
        textShadow: 'none',
        dateRanges: [
            {start: 1, end: 11}, // January through October
        ]
    },
    {
        name: 'Thanksgiving',
        message: 'Happy Thanksgiving from PX Blue',
        theme: fallTheme,
        class: 'fallTheme',
        backgroundSize: 'contain',
        backgroundImage: `url(${turkey}), linear-gradient(to right, ${ColorsBranding.sunset[500]} , ${ColorsBranding.rust[900]})`,
        backgroundPosition: 'center right',
        textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
        dateRanges: [
            {start: 11, end: 12} // November only
        ]
    },
    {
        name: 'Winter',
        message: 'Happy Holidays from PX Blue',
        theme: winterTheme,
        class: 'winterTheme',
        backgroundSize: 'auto 140%',
        backgroundImage: `url(${snowman}), linear-gradient(to right, ${ColorsBranding.wine[500]} , ${ColorsBranding.wine[900]})`,
        backgroundPosition: 'center right',
        textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
        dateRanges: [
            {start: 12, end: 13}, // December only
        ]
    },
];
const getCurrentTheme = () => {
    const now = new Date(Date.now());
    const month = now.getMonth() + 1;
    const activeTheme = themes.find((theme) => {
        for(let i = 0; i < theme.dateRanges.length; i++){
            if(month >= theme.dateRanges[i].start && month < theme.dateRanges[i].end) return true;
        }
        return false;
    });
    if(!activeTheme) return themes[0];
    return activeTheme;
}
export const appliedTheme = getCurrentTheme();

// Browser detection
var isFirefox = typeof InstallTrigger !== 'undefined';
var isIE = /*@cc_on!@*/false || !!document.documentMode;
var isEdge = !isIE && !!window.StyleMedia;
var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

const mapStateToProps = state => ({
    pagetitle: state.ui.get('pagetitle'),
    pageURL: state.ui.get('pageURL'),
    mobileOpen: state.ui.get('mobileMenuOpen')
});

const mapDispatchToProps = dispatch => {
    return {
        showMobile: () => {
            dispatch({type: SHOW_MOBILE})
        },
        hideMobile: () => {
            dispatch({type: HIDE_MOBILE})
        },
        toggleMobile: () => {
            dispatch({type: TOGGLE_MOBILE})
        },
    };
};

const drawerWidth = 364;

const theme = createMuiTheme(Object.assign(appliedTheme.theme, {
    typography: {
        fontFamily: '"Open Sans", Helvetica, Roboto, sans-serif',
        useNextVariants: true
    }
}));

const styles = theme => ({
    root: {
        width: '100%',
        minHeight: '100%',
        //height: '100vh',
        zIndex: 1,
    },
    slidebaby: {
        transition: 'all 225ms ease-in-out',
        marginTop: theme.spacing.unit * -8,
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing.unit * -7
        }
    },
    showFramework: {
        marginTop: theme.spacing.unit * 8,
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing.unit * 7
        }
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    drawerHeader: theme.mixins.toolbar,
    drawerPaper: {
        background: appliedTheme.theme.palette.background.paper,
        width: drawerWidth,
        maxWidth: '90%',
        height: '100%'
    },
    spacer: {
        marginTop: theme.spacing.unit * 8,
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing.unit * 7
        }
    },
    container: {
        color: theme.palette.text.primary,
        backgroundColor: appliedTheme.theme.palette.background.default,
        minHeight: '100%',
        flexDirection: 'column',
        // overflowY: 'auto',
        flexShrink: '1',
        marginLeft: drawerWidth,
        // height: '100%',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0
        }
    },
    navIconShown: {
        color: "white",
        position: 'fixed',
        top: 0,
        zIndex: 100,
        background: theme.palette.primary[500]
    },
    content: {
        padding: '24px',
        height: 'calc(100% - 56px)',
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            maxWidth: '1150px',
            margin: 'auto'
        },
    },
    button: {
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        zIndex: 100,
        opacity: 0.8,
        '&:hover': {
            opacity: 1
        }
    },
    appBar: {
        top: 0,
        width: 'auto',
        left: drawerWidth,
        [theme.breakpoints.down('sm')]: {
            left: 0
        }
    },
    toolbar: {
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing.unit * 1
        }
    }
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            framework: ls.get('frameworkSelectKey') || 'angular',
            showFrameworkSelect: false,
            browser: (isFirefox ? 'firefox' : isIE ? 'ie' : isEdge ? 'edge' : isChrome ? 'chrome' : 'other'),
        };
    }

    handleDrawerToggle = () => {
        this.props.toggleMobile();
    };

    // set state and change local storage to selected framework
    onFrameworkChange = frameworkChange => {
      this.setState({framework: frameworkChange});
      ls.set('frameworkSelectKey', frameworkChange);
    };

    componentWillReceiveProps(newProps) {
        this.setState({
            showFrameworkSelect:
            (window.location.pathname.match(/\/patterns\//) && !window.location.pathname.match(/\/patterns\/layout/)) ||
            (window.location.pathname.match(/\/style\/themes/))
        });
        if (newProps.pageURL && (newProps.pageURL !== this.props.pageURL) && !window.location.hash) {
            window.scrollTop = 0;
            if (document.body) {
                document.body.scrollTop = 0;
                if (document.body.scrollIntoView) {
                    document.body.scrollIntoView()
                }
            }
            if (document.scrollingElement) {
                document.scrollingElement.scrollTop = 0;
            }
        }
    }

    getMobileNavigationDrawer() {
        const {classes} = this.props;
        return (
            <Drawer
                variant="temporary"
                open={this.props.mobileOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
                onClose={this.handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                <SideNav pages={siteConfig.pages}/>
            </Drawer>
        );
    }

    getDesktopNavigationDrawer() {
        const {classes} = this.props;
        return (
            <Drawer
                variant="permanent"
                open
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <SideNav pages={siteConfig.pages}/>
            </Drawer>
        );
    };


    render() {
        const {classes} = this.props;

        const body = document.body;
        if (body && body.classList && appliedTheme.class) {
            body.classList.add(appliedTheme.class);
        }

        return <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <Hidden smUp implementation="css">
                {this.getMobileNavigationDrawer()}
            </Hidden>
            <div className={classes.root}>
                <Hidden smDown implementation="css">
                    {this.getDesktopNavigationDrawer()}
                </Hidden>
                <div className={classes.container}>
                    {/* Floating Icon Button for Menu on homepage */}
                    {window.location.pathname === "/" &&
                    <div className={classes.navIconShown}>
                        <IconButton color="inherit" aria-label="open drawer" onClick={this.handleDrawerToggle}
                                    className={classes.navIconHide} style={{zIndex: "10"}}>
                            <MenuIcon/>
                        </IconButton>
                    </div>
                    }

                    {/* Toolbar with Icon Button for Menu on non-homepage */}
                    {window.location.pathname !== "/" &&
                    <AppBar position="fixed" className={classes.appBar}
                            style={appliedTheme.theme.navbarBackground}>
                        <Toolbar className={classes.toolbar}>
                            <IconButton color="inherit" aria-label="open drawer" onClick={this.handleDrawerToggle}
                                        className={classes.navIconHide}>
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" color="inherit">
                                {this.props.pagetitle}
                            </Typography>
                            <div style={{flex: '1 1 0px'}}/>
                            <Hidden xsDown implementation="css">
                                <img width={'auto'} height={20} src={eaton} alt="Eaton Logo"
                                     style={{display: 'block'}}/>
                            </Hidden>
                        </Toolbar>
                    </AppBar>
                    }

                    {/* Select Framework Toolbar */}
                    {window.location.pathname !== "/" &&
                    <AppBar position="static" color="default"
                            className={classes.slidebaby + ' ' + (this.state.showFrameworkSelect ? classes.showFramework : '')}>
                        <Toolbar style={{display: "flex", flexDirection: "row"}}>
                            <FrameworkSelector framework={this.state.framework} onFrameworkChange={this.onFrameworkChange} />
                            <div style={{flex: "1 1 0px", textAlign: "right"}}>

                                <Hidden xsDown>
                                    <Typography color="inherit">
                                        Selecting a framework will show code examples for
                                        only that framework.
                                    </Typography>
                                </Hidden>
                            </div>
                        </Toolbar>
                    </AppBar>
                    }
                    {/*Find a better way of doing this*/}
                    {window.location.pathname !== "/style/iconography" &&
                    <Fab href='/community/contactus' variant="extended" color={'primary'} className={classes.button}>
                        <Mail style={{marginRight: 8}}/>
                        Contact Us
                    </Fab>}

                    {!this.state.showFrameworkSelect && window.location.pathname !== "/" &&
                    <div className={classes.spacer}/>}

                    {/* Main Router for page content  */}
                    <div className={window.location.pathname !== "/" ? classes.content : ""}>
                        <Switch>
                            <Route exact path="/" render={() => <HomeComponent/>}/>
                            <Route exact path="/style/color" render={() => <ColorComponent/>}/>
                            <Route exact path="/style/iconography" render={() => <IconographyComponent/>}/>
                            <Route path="/:doc*" render={props => <MarkdownDoc doc={props.match.params.doc}
                                                                               selectedFramework={this.state.framework}
                                                                               browser={this.state.browser}/>}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </MuiThemeProvider>;
    }
}


export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
        null,
        {pure: false}),
    withStyles(styles,
        {name: 'App'}
    )
)(App);
