# Getting Started with React Native
The following instructions will guide you through setting up your computer for React Native development and starting a new PX Blue project. Alternatively, you can start your project by downloading one of our code samples from [Github](https://github.com/pxblue) (the Login example is a good project to start from) once you configure your environment.

## Setting up your environment
You'll need to start by following the general instructions for setting up your development environment for mobile found in our [Environment Guide](/development/environment). In addition to the base requirements, you may also want the following:

- [Expo Client](https://expo.io/learn) (project creation / setup tool for React Native apps)(optional)


## Installing Expo

The fastest way to get started with a React Native application is to use the [Expo CLI](https://facebook.github.io/react-native/docs/getting-started). You can install it by running: 

```
yarn global add expo-cli
```

You can then create/start a new project by running:

```
expo init myCoolApp
cd myCoolApp
yarn start
```

For more detailed information about using Expo to start your application, read their [Documentation](https://docs.expo.io/versions/latest/introduction/walkthrough/).

If you do not want to use Expo, you can use the [React Native CLI](https://github.com/react-native-community/cli) to generate a vanilla React Native project (recommended for larger projects).


## Including the Component Libraries
There is no standard component library for React Native that implements Material Design. At the bottom of this page is a list of recommended component libraries that you can use, depending on your requirements.

### PX Blue Components
We have a [supplemental library](https://github.com/pxblue/component-library/tree/dev/reactnative) of components designed specifically for Eaton applications. If you wish to use these components, you can install them by running:
```
yarn add @pxblue/react-native-components
```

## Adding PX Blue Themes
If you are using the PX Blue component library, it includes basic support for theming your application. By default, it uses a Material-style theme. To use the PX Blue theme, first install it:
```
yarn add @pxblue/themes
```
> Using the PX Blue React Native theme **requires** that you add the Open Sans font to your application. You can learn how to do this by reading the instructions for [Vanilla React Native](https://medium.com/react-native-training/react-native-custom-fonts-ccc9aacf9e5e) or [Expo](https://docs.expo.io/versions/latest/guides/using-custom-fonts/).
> When using Expo, you will need to specify the name for each font weight you load using the format OpenSans-<Weight>, e.g., OpenSans-SemiBold. Refer to one of our React Native demos for reference.


## Applying the Theme
You can apply the PX Blue theme by wrapping your application in a `<ThemeProvider>` and passing in the theme object.
```
import { ThemeProvider } from '@pxblue/react-native-components';
import * as PXBThemes from '@pxblue/themes/react-native';
...
<ThemeProvider theme={PXBThemes.blue}>
    <App />
</ThemeProvider>
```
> NOTE: This theme only applies to the components in the @pxblue/react-native-components package. It will not theme the components from other third party libraries. If you wish to use our theme to style your own components, refer to our [documentation](https://github.com/pxblue/component-library/blob/dev/reactnative/docs/theme.md#using-the-theme-in-custom-components).


### Avoid Repeated Styles
To avoid adding repeatedly adding inline styles to standard components, you can define your own component that applies the styles and use that throughout your application, e.g.:
```
// MyText.js
export default MyText = ({style, children, ...other}) => (
    <Text {...other} style={StyleSheet.flatten([{/* Theme styles here */}, style])}>
        {children}
    </Text>
);

// OtherFile.js
import Text from 'path/to/MyText.js';
...
<Text>Themed Text Object</Text>
```


## Writing your application
If you are familiar with React development, React Native will be relatively simple to understand. The application logic remains the same, while the UI requires a little adjustment. Rather than typical HTML elements, React Native UIs are built with a special library of [Components](https://facebook.github.io/react-native/docs/components-and-apis), including ```<View>```, ```<Text>```, ```<Image>```, etc. React Native layouts are built exclusively using FlexBox.

## Building your application
If you use the Expo CLI, your app will default to running via Expo (this will require you to install the Expo app on your test device).

Running ```yarn start``` will build your app and make it available for viewing. Follow the on-screen instructions for launching the app in a simulator (press 'i' to open an iOS simulator, or 'a' to load the app into the Android emulator).

>To run on an Android emulator, the emulator must already be running or you will see an error message, "No connected devices found." The first time you run Expo on the emulator, you'll be asked to update permissions for Expo - just follow the instructions in the dialog.

>On a Mac, you may be prompted to install watchman (```brew install watchman```) or update two settings to run the application.

When the application is running in Expo, any changes you make in your JS files will automatically update in the simulator.

>**NOTE**: When developing on an Eaton PC, it can be very challenging to connect to a real device for testing, particularly on the Eaton network. You will be best served by opting to work with the simulators in this case. If you want to test on a real device, you will need to go through the ejection process (see below).

## Ejecting
At some point during your development, it may become necessary to eject from Expo. The most common reasons for this are for adding native libraries, for final app deployment, or if you are developing on Eaton hardware and want to test your app on a real device.

To eject your app, run the following and follow the on-screen prompts (WARNING: Ejecting from Expo cannot be undone. Make sure you know what you are doing and have your project in source control before proceeding):

```
yarn eject
```

> * At the first prompt, select 'Bare (first option)'
> * At the second prompt, accept the default value (press Enter). Changing this can cause issues running your project.
> * At the third prompt, enter a name for the solution folder.

For more information, read about [ejecting from Expo](https://docs.expo.io/versions/latest/workflow/customizing/).

## Final Build
After ejecting from Expo, the process for creating a build is the same as for a standard native application. You can open the project folders in xCode (/ios/projectName.xcodeproj) or Android Studio (/android) and perform builds from the IDE. There are also npm scripts added to your package.json file during ejection that will allow you to perform builds and/or run from the command line. Depending on the version of React Native you are using, you may have to [manually bundle your JS code](https://stackoverflow.com/questions/44446523/unable-to-load-script-from-assets-index-android-bundle-on-windows) for Android.

## Code Formatting/Style
PX Blue provides packages for code standards and style using ESLint and Prettier. These packages are used internally by the PX Blue team, but they can also be used in your projects. You can find instructions for adding these packages to your project on [GitHub](https://github.com/pxblue/code-standards).

> NOTE: the ESLint package is only available for TypeScript projects.

## Component recommendations
There are a lot of resources and components available on the market to help speed up your development and improve reusability. React Native also comes with a built-in component library. We recommend the following:
- Navigation
    - [React Navigation](https://reactnavigation.org/) (JS-only implementation)
    - [React Native Navigation](https://wix.github.io/react-native-navigation/#/) (native implementation)
- Component Libraries
    - [React Native Built-in Components](https://facebook.github.io/react-native/docs/components-and-apis.html)
    - [React Native Elements](https://react-native-training.github.io/react-native-elements/)
- Additional Components
    - [Bottom Navigation](https://github.com/tomzaku/react-native-material-bottom-navigation-performance)
    - [Floating Action Button](https://github.com/mastermoo/react-native-action-button)
    - [Chips](https://github.com/prscX/react-native-chip-view#readme)
    - [Grid List](https://github.com/gusgard/react-native-grid-list)
    - [Bottom Sheet](https://github.com/cesardeazevedo/react-native-bottom-sheet-behavior)
    - [Snackbar](https://github.com/cooperka/react-native-snackbar)
    - [Text Fields](https://github.com/n4kz/react-native-material-textfield)

## License Information
[React Native](https://github.com/facebook/react-native/blob/master/LICENSE) is available under the MIT License. 
