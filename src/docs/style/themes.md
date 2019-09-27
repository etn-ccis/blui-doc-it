# Power Xpert Blue Themes
One of the key benefits of PX Blue is consistency of look & feel between different applications. This is achieved primarily through the use of PX Blue themes.

## Available Themes
As of version 2.0.0, the PX Blue themes package ([@pxblue/themes](https://www.npmjs.com/package/@pxblue/themes)) includes two distinct themes:

- **Blue** is the default theme for all Eaton applications. It should be applied at the root level of your app. It provides a variety of shades of blue for use in buttons, toolbars, etc. The standard background color is a light gray.
- **Blue Dark** is complementary to the Blue theme. It is intended primarily for applications used in low-light conditions. The primary colors used in the Blue Dark theme are various shades of gray with blue accents. It can be used as a standalone theme or combined with the Blue (default) theme to provide contrast for areas such as detail sidebars. 

> **NOTE:** Combining multiple themes in your application is optional. You may stick to using a single theme (Blue) for your entire application and then apply one-off styling where necessary to achieve other effects. All of the PX Blue colors are available individually ([@pxblue/colors](https://www.npmjs.com/package/@pxblue/colors)) for use in your application.

{{ angular url=https://stackblitz.com/github/pxblue/themes/tree/master/angular/demo?embed=1&file=main.ts&hideNavigation=1&view=preview }}
{{ react url=https://codesandbox.io/embed/github/pxblue/themes/tree/master/react/demo?fontsize=14&hidenavigation=1&module=/src/App.js&view=preview }}
## Theme Formats
- **Angular** themes are a collection of SCSS stylesheets that are imported into your application and applied through classes ('pxb-blue' or 'pxb-dark').

- **React** themes are JSON objects that are consumed by the theme mechanism for Material UI components (```<MuiThemeProvider>```). They also contain some specific rules defined in [JSS](https://material-ui.com/customization/css-in-js/).

> **NOTE:** If you are using Ionic for hybrid application development, you can utilize the Angular themes and [Angular Material](https://material.angular.io/components/categories) component library. A future version of PX Blue will include more robust theming for React Native applications.

## Usage
For detailed usage instructions for PX Blue themes, you can read the package instructions on [GitHub](https://github.com/pxblue/themes#px-blue-themes-for-eaton-applications) or our getting started guides for [Angular](/development/frameworks-web/angular) and [React](/development/frameworks-web/react). For additional information on how Material component libraries apply themes, see [Angular Material Theming](https://material.angular.io/guide/theming) or [Material UI Theming](https://material-ui.com/customization/themes/).

