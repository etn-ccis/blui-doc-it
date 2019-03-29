# Getting Started with NativeScript

### Setting up your environment
You'll need to start by following the general instructions for setting up your development environment for mobile found in our [Environment Guide](/development/environment). In addition to the base requirements, you'll also want the following:

- [Sidekick](https://www.nativescript.org/nativescript-sidekick) (project creation / setup tool for NativeScript apps)

### Installing NativeScript
The most up-to-date instructions for installing NativeScript can be found in the [NativeScript Documentation](https://docs.nativescript.org/start/quick-setup). Because of subtle differences between machines and assorted IT issues, these instructions may not get you 100% of the way. The TNS Doctor tool will help you to identify any issues with your NativeScript installation. You can run this command in the terminal:

```
tns doctor
```

You may need to run this command several times to complete your installation. It will typically get hung at various times and need to be re-run, but each subsequent execution should get further through the process.

## Writing your application
The easiest way to get started with a NativeScript app is to use the Sidekick application. Sidekick will allow you to choose from a selection of sample applications (including some that are quite thorough) that will give you a great starting point for your app.

### Prototyping with NativeScript Playground
NativeScript also offers an online testing area ([NativeScript Playground](https://play.nativescript.org/)) where you can build out parts of your app and test them on a real device, without having to go through the laborious build process - simply scan a QR code with your phone and the app will be automatically loaded (with live reloads as you make changes). It's a great way to prototype layouts or simple functionality before bringing it into your application. This will require you to install the NativeScript Preview and NativeScript Playground apps on your test device.


## Building your application
Once you finally have your computer set up and a sample app written, you're ready to build and test on a phone.

### Local builds
Building apps on Eaton hardware and the Eaton network is very difficult, due to the many open-source off network dependencies and libraries that these tools depend on. You'll frequently find these resources are blocked or inaccessible behind the firewall or corporate proxy (dl.google.com is a frequent offender). If you find that your build seems to be stuck, you may be able to skip ahead by pressing Ctrl-c in your terminal. However, if the process wasn't hung, this will terminate your last command and you'll have to run it again, so use it judiciously.

To get around these issues (as best as possible), we recommend you:
1. Create a guest account on the Eaton Visitor network.
2. Connect to the Eaton Visitor network.

    You can also use another non-eaton network (such as a mobile hotspot) if you don't want to go through the process of creating a new guest account every 48 hours.
3. Run your build using ```tns run android``` or ```tns run ios```.
4. Switch back to the Eaton production or lab network.
5. Push your code changes to your source control repository.

Lately this process has not been as effective (builds have slowed down even on alternative networks). If you have the means to do so, we recommend working on a non-Eaton computer on a non-Eaton network. **If you have any suggestions for improving this process, please let us know.**

### Cloud builds
Sidekick allows you to get around network issues and hardware requirements by offering the ability to perform builds for you in the cloud. With a free account, you'll be allowed up to 100 free cloud builds per month (each incremental change will count as a build, so use them wisely). This will allow you to download an .apk or .ipa binary file that you can then install on your device for testing (Android will let you install directly, but iOS requires you to go through another tool, such as HockeyApp or TestFlight to get the app on a device - see below). This process can be time consuming on the Eaton network, as downloads are throttled, but if you are in a pinch, it can be useful to get around limitations.

## Component recommendations
Nativescript comes with a diverse library of components out of the box. We also recommend you look at some of the following components if you need to supplement:
- [Default Components](https://docs.nativescript.org/angular/ui/components)
- [NB Material](https://github.com/nabil-mansouri/nativescript-nbmaterial) (contains an assortment of supplemental components)
- [Cards](https://github.com/bradmartin/nativescript-cardview)
- [Dropdown](https://github.com/PeterStaev/NativeScript-Drop-Down)
- [Snackbar](https://github.com/bradmartin/nativescript-snackbar)

## Theming your application
Theming your NativeScript application is as simple as including the PX Blue theme file in your application.

Our themes are available from npm:

```
yarn add @pxblue/themes
```

You can then include the theme definitions in your top-level .scss file:

```
@import '~@pxblue/themes/nativescript/theme.scss';
```

Additional theming can be accomplished through Sass styles for your application. NativeScript also allows you to specify separate style rules for Android and iOS (if desired), via app.android.scss and app.ios.scss, respectively.