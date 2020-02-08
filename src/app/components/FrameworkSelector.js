/* eslint-disable flowtype/require-valid-file-annotation */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import reactIcon from "../icons/icon-react.svg";
import angularIcon from "../icons/angular-js-icon.svg";
import ionicIcon from "../icons/ionicLogo.svg";
import mdcIcon from "../icons/mdc-icon.svg";
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    formControl: {
        margin: 0,
        minWidth: 180,
        display: 'flex',
        alignItems: 'center'
    },
    frameworkLabel:{
        display:"flex",
        flexDirection:"row",
        alignItems: 'center'
    },
    frameworkIcon:{
        height: '20px',
        width: 'auto',
        position: 'relative',
        margin: '0',
        marginRight: theme.spacing.unit
    },
    menu:{
        minWidth: '100px'
    }
});

const frameworks = [
    'angular',
    'react',
    'ionic',
    'reactNative'
];

class FrameworkSelector extends React.Component {
    state = {
        framework: [],
    };

    getIcon(framework){
        switch (framework[0]){
        case 'r':
            return reactIcon;
        case 'a':
            return angularIcon;
        case 'm':
            return mdcIcon;
        case 'i':
            return ionicIcon;
        default:
            return;
        }
    }
    getName(framework){
        if(framework) {
            return framework.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); });
        }
        return "All Frameworks"
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.formControl}>
                <Select
                    value={this.props.framework}
                    onChange={ e => this.props.onFrameworkChange(e.target.value) }
                    name="Framework"
                    style={{marginRight: '10px'}}
                    classes={{selectMenu: classes.menu}}
                >
                    {frameworks.map(framework => (
                        <MenuItem
                            key={framework}
                            value={framework}
                            style={{fontWeight: '400'}}
                        >
                            <div className={classes.frameworkLabel}>
                                <img className={classes.frameworkIcon} src={this.getIcon(framework)} alt=""/>
                                {this.getName(framework)}
                            </div>
                        </MenuItem>
                    ))}
                </Select>
                <Typography style={{marginRight: '15px'}}>Select a Framework</Typography>
            </div>
        );
    }
}

FrameworkSelector.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FrameworkSelector);
