# PX Blue Mobile (Hybrid) Frameworks
Power Xpert Blue supports hybrid mobile application development using Ionic/Cordova and React Native. Both are capable frameworks, but there are some significant differences between them, outlined below.

## Ionic / Cordova
  - Built with web technology (framework agnostic)
  - Runs in a WebView
  - Is the fastest way to have a mobile app (if you already have a web app)
  - Requires your web app to be optimized for mobile
  - Has lots of available plugins to access hardware/native functionality
  - Learn more on the [Ionic Website](https://ionicframework.com/)
  - Learn more on the [Cordova Website](https://cordova.apache.org/)

  >Ionic makes use of Cordova behind the scenes, but Cordova can also be used on its own.
  
## React Native
  - Renders native UI elements (not a WebView)
  - Can re-use application logic code (React)
  - Requires writing new code for UI (learning curve)
  - Does not use CSS for styling (learning curve)
  - Provides access to hardware functionality through various plugins/libraries
  - Has a large community of support
  - Works on Eaton network, but more seamless off-network
  - Learn more on the [React Native Website](https://facebook.github.io/react-native/)

# Which framework should I use?
This is entirely up to you. If time is your biggest concern, Ionic or Cordova may be the best approach since they simply wrap an existing application and require no additional code. 

However, if you want more control over the look and performance of your application, it may be better to use React Native. If you have a React application, you'd be able to re-use most of your application logic, but you have to write custom/dedicated UI views for mobile.

In general, if your development team is more familiar with Angular, we recommended using Ionic/Cordova. If your team is more familiar with React, you won't go wrong by choosing React Native.

# Building your application
Follow the guidelines for app development using your chosen framework:
* [Ionic](/development/frameworks-mobile/ionic)
* [Apache Cordova](/development/frameworks-mobile/cordova)
* [React Native](/development/frameworks-mobile/react-native)

These guides will walk you through the process of developing your application and ultimately creating a final binary to distribute (either to your testers or your final customers).

## Deploying your application
Once you have built your application into a distributable binary, there are two options for distributing it.

### Visual Studio App Center (formerly HockeyApp)
Visual Studio App Center gives you a way to test your app with users before you are ready for final distribution. This service allows you to upload app binaries and create lists of people with whom to share them. These people will be notified via email when new versions of the app are available, and they will be prompted to download and install them directly onto their device. You will need to request access to Visual Studio App Center from IT.

### App Store / Play Store
For final distribution of your application, you will need to connect to iTunesConnect and/or Google Play Console. The Eaton official accounts for these distribution channels are controlled by IT, so you will need to contact them for further instructions on releasing your app to the world.