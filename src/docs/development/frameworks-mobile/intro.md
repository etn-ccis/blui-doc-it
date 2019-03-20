# Mobile (Hybrid) Framework Comparison
Power Xpert Blue supports hybrid mobile application development using Apache Cordova, NativeScript, and React Native. All three are capable frameworks, but there are some significant differences between them, outlined below.

## Apache Cordova
  - Built with web technology (framework agnostic)
  - Runs in a WebView
  - Fastest way to have a mobile app (if you already have a web app)
  - Requires your web app to be optimized for mobile
  - Lots of plugins available to access hardware/native functionality
  - Learn more on the [Cordova Website](https://cordova.apache.org/) or the PX Blue [Cordova Guide](/frameworks-mobile/cordova)
  > **Why not Ionic?**<br/>
  Ionic is a very popular hybrid framework that makes use of Cordova under the hood. However, Ionic adds additional styling to UI elements that conflicts with PX Blue theming. Wrapping your application in Ionic also adds an unnecessary layer when compared to simply using Cordova. For these reasons, PX Blue does not support development with Ionic.
  
## NativeScript {N}
  - Renders native UI elements (not a WebView)
  - Can re-use application logic code from web (Angular + others)
  - Requires writing new code for UI (learning curve)
  - Native access to hardware/UI functionality
  - Challenging to set up and use on the Eaton network
  - Learn more on the [NativeScript Website](https://www.nativescript.org/) or the PX Blue [NativeScript Guide](/frameworks-mobile/nativescript)
  
## React Native
  - Renders native UI elements (not a WebView)
  - Can re-use application logic code (React)
  - Requires writing new code for UI (learning curve)
  - Does not use CSS for styling (learning curve)
  - Access to hardware functionality through various plugins
  - Large community of support
  - Works on Eaton network, but more seamless off-network
  - Learn more on the [React Native Website](https://facebook.github.io/react-native/) or the PX Blue [React Native Guide](/frameworks-mobile/reactnative)



# Which framework should I use?
This is entirely up to you. If time is your biggest concern, Cordova may be the best approach since it simply wraps an existing application and requires no additional code. However, if you want more control over the look and performance of your application, it may be better to use either NativeScript or React Native. In this case, you'd be able to re-use most of your application logic, but you also get to write custom/dedicated UI views for mobile.
