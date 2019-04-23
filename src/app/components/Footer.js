import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import * as Colors from '@pxblue/colors';
import EatonLogo from "../icons/EatonLogo.svg";

const styles = (theme) => ({
    wrapper:{
        flex: '0 0 auto', 
        marginBottom: '0rem 2rem', 
        textAlign: 'center',
         padding: '2rem', 
         borderTop: '1px solid ' + Colors.gray[100]
    },
    link:{
        color:'inherit', 
        lineHeight: 'inherit'
    }
});

const Footer = ({classes}) => (
    <div className={classes.wrapper}>
        <a className={classes.link} href="http://www.eaton.com" target="_blank" rel="noopener noreferrer">
            Power Xpert Blue is a part of the Center for Connected Intelligent Solutions (CCIS).<br/>
            <span style={{color:Colors.blue[500]}}>Learn more about our other offerings.</span>
            <div style={{marginTop: 20, align: 'top', position: 'center', paddingLeft: '40px'}}>
            <img src={EatonLogo} alt=""/>
            </div>
        </a>
    </div>
);
export default withStyles(styles)(Footer);