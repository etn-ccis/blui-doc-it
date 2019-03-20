# Hybrid App Development

Hybrid app technology has come a long way from the early days. In many cases, hybrid apps make more sense than native apps, particularly if you are limited by time, finances, or expertise.

## Getting started
At this time, PX Blue supports hybrid app development using [Apache Cordova](/frameworks-mobile/cordova) (using a supported web technology), [NativeScript](/frameworks-mobile/nativescript), and [React Native](/frameworks-mobile/reactnative). If you are deciding which framework to use, you can have a look at our [Framework Comparison](/frameworks-mobile/comparison).

You should plan on developing for both platforms (iOS and Android) if your application is intended to run on a phone or tablet. If you have greater control over the hardware that end-users will use (such as for kiosk or service panel applications), you may be able to target a single platform. Developing with a hybrid framework gives you the flexibility to select one or more targets depending on your needs.

### Setting up your environment
Getting set up to do mobile development is a challenge (particularly if you are trying to do it on the Eaton network and Eaton hardware). The process below describes a method which has shown some promise, though each machine is slightly different and you may run into other issues while getting started (particularly with respect to the proxy). Some of these problems may require IT intervention to resolve, so plan to allow at least a few days/weeks for setup before you need to start development.

### Prerequisites
#### Hardware
Mobile development is resource-intensive, so you will need a development machine that is up to the task. Your machine should at least match the following minimum requirements:

- a Mac (if you plan on building or testing iOS locally)
- 16GB RAM or more (running emulators can easily push you over 20GB)
- Solid State Hard Drive (SSD)
- 5/6 Gen Core i7 with Virtualization Technology or better

#### Software
There are a number of software tools that you will need before you can get started:

- [Android Studio](https://developer.android.com/studio/) (required for building for Android)
- xCode (Mac-only, required for building for iOS)

Depending on the hybrid framework you are using, there may be additional tools that you will want to use - see our Mobile Frameworks section for more details.


## Building your application
Follow the guidelines for app development using your chosen framework:
* [Apache Cordova](/frameworks-mobile/cordova)
* [NativeScript](/frameworks-mobile/nativescript)
* [React Native](/frameworks-mobile/reactnative)

These guides will walk you through the process of developing your application and ultimately creating a final binary to distribute (either to your testers or your final customers).

## Deploying your application
Once you have built your application into a distributable binary, there are two options for distributing it.

### HockeyApp
HockeyApp gives you a way to test your app with users before you are ready for final distribution. This service allows you to upload app binaries and create lists of people with whom to share them. These people will be notified via email when new versions of the app are available, and they will be prompted to download and install them directly onto their device. You will need to request access to HockeyApp from IT.

### App Store / Play Store
For final distribution of your application, you will need to connect to iTunesConnect and/or Google Play Console. The Eaton official accounts for these distribution channels are controlled by IT, so you will need to contact them for further instructions on releasing your app to the world.