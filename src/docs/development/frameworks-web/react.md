# Getting Started with React

The fastest way to create an React application is to use [Create React App](https://github.com/facebookincubator/create-react-app). Once you have created your project, you can follow the instructions below for adding PX Blue themes. Alternatively, you can start your project by downloading one of our code samples from [StackBlitz](http://www.stackblitz.com/@px-blue) or [Github](https://github.com/pxblue) (the Login or Navigation examples are good projects to start from).

## Requirements
To integrate PX Blue with your React project, you will need:

1. An existing React application
2. The [Material-UI](https://material-ui.com/) Component Library
   	* Our themes are built for these components.
3. Our PX Blue Themes for React:
   	* These are available from npm as [@pxblue/themes](https://www.npmjs.com/package/@pxblue/themes)
	* See below for installation instructions 

### Theming your application
Install the Material UI components and PX Blue theme files from npm:
```
yarn add @material-ui/core @pxblue/themes
```

Then import the theme files, Material UI theme provider, and **Open Sans** font into your application, e.g. in App.js:
```
import { 
    MuiThemeProvider, 
    createMuiTheme 
} from '@material-ui/core/styles';
import * as PXBThemes from '@pxblue/themes/react';
require ("typeface-open-sans");
```

If you are looking to add the theme to your whole application, you would simply add a ```<MuiThemeProvider>``` around your top-level component and pass it the theme you want to use, e.g.:

```
<MuiThemeProvider theme={createMuiTheme(PXBThemes.blue)}>
    <MyApp/>
</MuiThemeProvider>
```

If you want to use multiple themes in different areas of your site, you just need to wrap those components in another ```<MuiThemeProvider>``` - these can be nested and you can change the theme dynamically by binding to state or prop variables, e.g.:

```
<MuiThemeProvider theme={createMuiTheme(PXBThemes.blue)}>
    <MyApp>
        <MyNormalComponent/>
        <MuiThemeProvider theme={createMuiTheme(PXBThemes.blueDark)}>
            <MySidebarComponent/>
        </MuiThemeProvider>
    </MyApp>
</MuiThemeProvider/>
```

> **NOTE:** Material-UI recommends keeping your use of MuiThemeProvider to a minimum for better performance. In most cases, you'll be fine to use a single theme for your entire application and use one-off styling via CSS when necessary.

You can read about [React Theming](https://material-ui-next.com/customization/themes/) to learn more.

## Using Material UI Components
For detailed documentation about the various components available in Material UI, as well as sample code and API reference, refer to the [Material UI Documentation](https://material-ui.com/).

## Browser Support
React and Material UI will work with any modern browser. For specific details, you can view their official support pages:

- [React](https://facebook.github.io/create-react-app/docs/supported-browsers-features)
- [Material UI](https://material-ui.com/getting-started/supported-platforms/)

## License Information

[React](https://github.com/facebook/react/blob/master/LICENSE) and [Material UI](https://github.com/mui-org/material-ui/blob/master/LICENSE) are both available under the MIT License.
