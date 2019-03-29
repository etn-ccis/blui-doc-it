# PX Blue Mobile (Hybrid) Frameworks
Power Xpert Blue supports hybrid mobile application development using Apache Cordova, NativeScript, and React Native. All three are capable frameworks, but there are some significant differences between them, outlined below.

## Apache Cordova
  - Built with web technology (framework agnostic)
  - Runs in a WebView
  - Is the fastest way to have a mobile app (if you already have a web app)
  - Requires your web app to be optimized for mobile
  - Has lots of available plugins to access hardware/native functionality
  - Learn more on the [Cordova Website](https://cordova.apache.org/)
  > **Why not Ionic?**<br/>
  Ionic is a very popular hybrid framework that makes use of Cordova under the hood. However, Ionic adds additional styling to UI elements that conflicts with PX Blue theming. Wrapping your application in Ionic also adds an unnecessary layer when compared to simply using Cordova. For these reasons, PX Blue does not support development with Ionic.
  
## NativeScript {N}
  - Renders native UI elements (not a WebView)
  - Can re-use application logic code from web (Angular + others)
  - Requires writing new code for UI (learning curve)
  - Provides native access to hardware/UI functionality
  - Can be challenging to set up and use on the Eaton network
  - Learn more on the [NativeScript Website](https://www.nativescript.org/)
  
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
This is entirely up to you. If time is your biggest concern, Cordova may be the best approach since it simply wraps an existing application and requires no additional code. However, if you want more control over the look and performance of your application, it may be better to use either NativeScript or React Native. In this case, you'd be able to re-use most of your application logic, but you also get to write custom/dedicated UI views for mobile.

# Building your application
Follow the guidelines for app development using your chosen framework:
* [Apache Cordova](/development/frameworks-mobile/cordova)
* [NativeScript](/development/frameworks-mobile/nativescript)
* [React Native](/development/frameworks-mobile/react-native)

These guides will walk you through the process of developing your application and ultimately creating a final binary to distribute (either to your testers or your final customers).

## Deploying your application
Once you have built your application into a distributable binary, there are two options for distributing it.

### HockeyApp
HockeyApp gives you a way to test your app with users before you are ready for final distribution. This service allows you to upload app binaries and create lists of people with whom to share them. These people will be notified via email when new versions of the app are available, and they will be prompted to download and install them directly onto their device. You will need to request access to HockeyApp from IT.

### App Store / Play Store
For final distribution of your application, you will need to connect to iTunesConnect and/or Google Play Console. The Eaton official accounts for these distribution channels are controlled by IT, so you will need to contact them for further instructions on releasing your app to the world.