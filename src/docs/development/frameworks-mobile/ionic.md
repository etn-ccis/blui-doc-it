# Getting Started with Ionic/Cordova

### Setting Up Your Environment
You'll need to start by following the general instructions for setting up your development environment for mobile, found in our [Environment Guide](/development/environment). Since Ionic takes advantage of web technologies, you won't need any specific additional tools beyond what you would use for web development.

Ionic uses Cordova behind the scenes but offers some additional convenience tools on top. If you would prefer to write a pure Cordova application, you can read instructions in the [Apache Cordova Getting Started Guide](/development/frameworks-mobile/cordova).


### Installing Ionic
The most up-to-date instructions for setting up Ionic can be found on the [Ionic Website](https://ionicframework.com/docs/installation/cli).

To get started, run:
```
yarn global add ionic cordova
```

You'll also want to install some additional dependencies:
```
yarn global add native-run
yarn global add gradle
yarn global add cordova-res
```

Make sure that you have a ```GRADLE_HOME``` entry in your PATH variable pointing to your gradle binary directory.

## Writing your application
The easiest way to get started with Ionic is to use the [Ionic CLI](https://ionicframework.com/docs/cli/commands/start). Ionic will allow you to choose from several templates that will give you a great starting point for your application. To see the template list, open terminal and run:
```
ionic start --list
```

> **NOTE**: Ionic supports a variety of different JavaScript frameworks. However, at this time, PX Blue only supports the use of Ionic for Angular applications.

To create a new project, you'll need to run:
```
mkdir workspace
cd workspace
ionic start <project-name>
```
This command takes several minutes to complete depending on network and PC performance.

> **NOTE**: If you are running this command on and Eaton PC on the Eaton network, you will need to temporarily disable TLS checks by adding an environment variable ```NODE_TLS_REJECT_UNAUTHORIZED```=0. **Remove this environment variable as soon as your project is created**. Alternatively, you can connect to an alternate network to create your project.

At this point you can start coding your application. If you have an existing web application, you can drop your existing files into the Ionic project.

## Running your application
```ionic serve``` will run the application in a web browser on localhost:8100. In order to see the application run on a mobile device, you will need to add platforms.

```
ionic cordova platform add android
ionic cordova platform add ios
```
> **NOTE**: You will only be able to add the ios platform if you are developing on a Mac.

When the ionic cordova platform add completes, your project will have all the required native plugins installed along with several configuration files specific to your project.

## Building your application
The project is now ready to build and you can run:
```
ionic cordova build android
ionic cordova build ios
```

Once complete, you can run your project in a device simulator (or connected device) by running:
```
ionic cordova run android
ionic cordova run ios
```
> **NOTE**: Depending on your version of Xcode, you may need to specify additional build flags to run on ios: ```ionic cordova run ios --buildFlag="-UseModernBuildSystem=0"```.