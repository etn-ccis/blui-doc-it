# Getting Started with React Native

### Setting up your environment
You'll need to start by following the general instructions for setting up your development environment for mobile found in our [Hybrid App Guide](/getstarted/hybrid). In addition to the base requirements, you may also want the following:

- [Expo Client](https://expo.io/learn) (project creation / setup tool for React Native apps)(optional)

### Installing React Native

The fastest way to get started with a React Native application is to use [Create React Native App](https://github.com/react-community/create-react-native-app). You can install it by running:

```
yarn global add create-react-native-app
```

You can then create/start a new project by running:

```
create-react-native-app myCoolApp
cd myCoolApp
yarn start
```

You will also want to install the React Native CLI. This will come in handy once you have ejected from Create React Native App and need to link native code plugins to your project. It can be installed by running:

```
yarn global add react-native-cli
```

## Writing your application
If you are familiar with React development, React Native will be relatively simple to understand. All of the application logic remains the same, while the UI requires a little adjustment. Rather than typical HTML elements, React Native UIs are built with a special library of [Components](https://facebook.github.io/react-native/docs/components-and-apis), including Views, Text, Image, etc. React Native layouts are built exclusively using FlexBox.

## Building your application
If you are using Create React Native App, your app will default to running via Expo (this will require you to install the Expo app on your test device).

Running ```yarn start``` will build your app and make it available for viewing. Follow the on-screen instructions for launching the app in a simulator (press 'i' to open an iOS simulator, or 'a' to load the app into the Android emulator).

>To run on an Android emulator, the emulator must already be running or you will see an error message, "No connected devices found." The first time you run Expo on the emulator, you'll be asked to update permissions for Expo - just follow the instructions in the dialog.

>On a Mac, you may be prompted to install watchman ('brew install watchman') or update two settings in order to run the application.

When the application is running in Expo, any changes you make in your JS files will automatically update in the simulator.

>**NOTE**: You cannot use Expo with a real device when developing on an Eaton computer. IT restrictions limit all incoming connections to your computer (including on a non-eaton network), so you will not be able to pull data from the computer to your phone. If you want to test on a real device, you will need to go through the ejection process (see below).

### Ejecting from CRNA
At some point during your development, it may become necessary to eject from Create React Native App. The most common reasons for this are for adding native libraries, for final app deployment, or if you are developing on Eaton hardware and want to test your app on a real device. 

To eject your app, run the following and follow the on-screen prompts (WARNING: Ejecting from CRNA cannot be undone. Make sure you know what you are doing and have your project in source control before proceeding):

```
yarn eject
```

> * At the first prompt, select 'React-Native (first option)'
> * At the second prompt, enter a name for your application
> * At the third prompt, accept the default value (press Enter). Changing this value will cause issues when running on Android.

For more information, read about [ejecting from CRNA](https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md).

### Final Build
After ejecting from CRNA, the process for creating a build is the same as for a standard native application. You can open the project folders in xCode (/ios/projectName.xcodeproj) or Android Studio (/android) and perform builds from the IDE. Depending on the version of React Native you are using, you may have to [manually bundle your JS code](https://stackoverflow.com/questions/44446523/unable-to-load-script-from-assets-index-android-bundle-on-windows) for Android.

## Component recommendations
There are a lot of resources and components available on the market to help speed up your development and improve reusability. React Native also comes with a number of built-in components. We recommend the following:
- Navigation
    - [React Navigation](https://reactnavigation.org/) (JS-only implementation)
    - [React Native Navigation](https://wix.github.io/react-native-navigation/#/) (native implementation)
- Component Libraries
    - [React Native Built-in Components](https://facebook.github.io/react-native/docs/components-and-apis.html)
    - [React Native Elements](https://react-native-training.github.io/react-native-elements/docs/0.19.0/overview.html) (we recommend the latest 1.0.x beta)
- Additional Components
    - [Bottom Navigation](https://github.com/tomzaku/react-native-material-bottom-navigation-performance)
    - [Floating Action Button](https://github.com/mastermoo/react-native-action-button)
    - [Chips](https://github.com/prscX/react-native-chip-view#readme)
    - [Grid List](https://github.com/gusgard/react-native-grid-list)
    - [Bottom Sheet](https://github.com/cesardeazevedo/react-native-bottom-sheet-behavior)
    - [Snackbar](https://github.com/cooperka/react-native-snackbar)
    - [Text Fields](https://github.com/n4kz/react-native-material-textfield)


## Theming your application
React Native does not have a robust theming mechanism yet. There are libraries avilable that will allow you to build a theme, but for the most part, theming is accomplished by applying styles.

Our color library is available from npm:

```
yarn add @pxblue/themes
```

You can then include these color definitions and use them in your project by doing the following:
```
import * as Colors from '@pxblue/themes/react-native'
...
<Text style={{color: Colors.blue['500']}}>Hello World!</Text>
```

To avoid adding repeatedly adding inline styles to your components, you can also define your own component that applies the styles and use that throughout your application, e.g.:

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
