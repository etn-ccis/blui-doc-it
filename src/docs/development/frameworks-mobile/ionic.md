# Getting Started with Ionic and Cordova
Ionic framework is an open source UI toolkit for building performant, high-quality mobile and desktop apps using web technologies (HTML, CSS, and JavaScript). Ionic includes integration with Angular, and support for React are in development. If you’d like to learn more about Ionic Framework before diving in, see the [video](https://youtu.be/p3AN3igqiRc) to walk you through the basics.

Ionic Framework is focused on the frontend user experience of an application (controls, interactions, gestures, animations). It’s easy to learn and integrates nicely with other libraries and Angular.

Cordova is a platform to build Native Mobile Applications in a container (wrapper) using HTML5, CSS and Java Script. Cordova Applications are a WebView that occupies the complete screen and runs in the native container, so it is the same web view that is used by the Native  Operating systems. This purely means that the Native Containers change according to the OS yet internally the web pages remain the same.  

### Setting Up Your Environment
You'll need to start by following the general instructions for setting up your development environment for mobile, found in our [Environment Guide](/development/environment). 


### Installing Ionic
The Ionic CLI offers a wide range of development tools with help options and is the main tool through which to run the application and connect it to other services. The most up-to-date instructions for installing Ionic can be found on [Ionic Installation](https://ionicframework.com/docs/installation/cli). The installation section covers the CLI, Android and iOS setups. Before proceeding, install the latest version of Node.js prior to running the global install on your terminal.
Open your terminal and run:

```
yarn global add ionic cordova
```
## Writing your application
The easiest way to get started with Ionic is to use the CLI with the available options. Before proceeding, make sure the latest [Angular CLI](https://cli.angular.io/) and [Android Studio](https://developer.android.com/studio) are installed. If you're using a Mac make sure to have the latest [xCode](https://developer.apple.com/xcode/) installed. Ionic will allow you to choose from several boiler plate templates that will give you a great starting point for your application. To see the template list, open terminal and run:
```
ionic start --list
```
The Ionic documentation for starter application templates and CLI options are located on [Ionic CLI commands](https://ionicframework.com/docs/cli/commands/start) and the format is
```
ionic start <project-name> <template> [options]
```
Start your project with tabs, sidemenu, blank, my-first-app or conference using Angular as the framework. Note: this command takes several minutes to complete depending on network and PC performance.
```
mkdir workspace
cd workspace
ionic start myApp tabs --type=angular
```
When Ionic start completes you will have entire application set up with Angular and Nodejs. Next CD to myApp and run:
```
ionic serve
```
The application should be running on localhost:8100

Now that the starter application built, prepare to build it for Android or iOS if you're on a Mac. Open the project in Visual Studio Code and in this example, build it for Android.
```
ionic cordova platform add android
```
When the ionic cordova platform add completes, your project will have all the required native plugins installed along with several configuration files specific to your project.

The project is now ready to build for Android and now you can run:
```
ionic cordova build android
```
The build process will take several minutes to complete. When complete run your project in an Android emulator. From your terminal run:
```
ionic cordova run android
```
Some caveats with cordova run might throw different error messages on cordova-res or gradle.
Open new terminal and install the related package from the error message.
```
yarn -g add native-run
yarn -g add gradle
yarn -g add cordova-res
```