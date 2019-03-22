# Power Xpert Blue 2.2.2 (March 2019)
### New Location
We've moved! In order to make our documentation as accessible as possible, we've migrated our entire process over to GitHub. Our documentation can now be found at pxblue.github.io.

### Shifting Left on Test
In an effort to make our packages and examples more stable, we've integrated automated testing (with CircleCI) into all of our code, including our NPM packages and code examples. You can see the current status of all of these materials on the [Resources](/resources) page.

### Updated Code Examples
We've added code examples for [App Bars](/patterns/appbar), [Bottom Sheets](/patterns/overlay), and [Steppers](/patterns/steppers), with more coming soon.

### Miscellaneous
* Bug fixes, including improving the consistency of PX Blue themes between Angular and React
* New icons added to [PX Blue icons](/style/iconography)


<br/><br/><br/>
# Power Xpert Blue 2.2.1 (November 2018)
### Mapbox Themes
Initial versions of Mapbox themes are now available, in both light (blue) and dark varieties. You can read more about using these themes in your application on [NPM](https://www.npmjs.com/package/@pxblue/mapbox).

### Highcharts Support Updates
Our Highcharts packages have been moved from **@pxblue/visualizations/highcharts** to **@pxblue/highcharts**. As part of the move, we have updated the package with chart building functions, so you can specify parts of the configuration you want to change (or use our PX Blue defaults). You can read more about using these functions on [NPM](https://www.npmjs.com/package/@pxblue/highcharts).

### Updated Code Examples
We've added a number of new design patterns & code examples:
* Updated [Highcharts / Mapbox](/patterns/visualizations) demos
* User Self-Registration flow added to [Login](/patterns/login) example
* Some new [App Bar](/patterns/appbar) patterns and examples

### Icons, Icons, Icons
We've expanded on our previous offering of a PX Blue icon font. We now have icons available as:
* [Icon Font](https://www.npmjs.com/package/@pxblue/icons): All icons packaged into a single font
* [SVG Icons](https://www.npmjs.com/package/@pxblue/icons-svg): icons available as standalone SVGs (including a sprite sheet to be used with Angular applications)
* [MUI Icons](https://www.npmjs.com/package/@pxblue/icons-mui): Material-UI-style icon components for use in React applications
* Progress Icons ([Angular](https://www.npmjs.com/package/@pxblue/ng-progress-icons), [React](https://www.npmjs.com/package/@pxblue/react-progress-icons)): Dynamic icons that can be variably filled for showing progress, health, etc. 

We've also overhauled our [Iconography](/style/iconography) page to include a demo of all of the PX Blue supplemental icons.


<br/><br/><br/>
# Power Xpert Blue 2.2 (September 2018)
PX Blue has seen a lot of really great enhancements behind the scenes in this latest release.

### Updated Examples & StackBlitz
Previous component-level examples have been replaced by more comprehensive code samples that show how to build common UI elements (e.g., navigation, lists). You can see the following and more in the new Design Patterns section.
* [Visualizations](/patterns/visualizations), including basic Highcharts and Mapbox support
* [Login](/patterns/login) and [Navigation](/patterns/navigation)
* Lots and lots of [List](/patterns/lists) examples

And more will be coming soon. We plan to deliver additional examples on a regular basis (not just during major releases), so make sure to check back often.

We have also migrated all of our code samples to [StackBlitz](http://www.stackblitz.com/@px-blue) to allow for live code updating and easier dependency management. We encourage you to make use of this tool to share code and foster a community of inner-sourcing where possible.

### Going Open Source
PX Blue is officially going open source in version 2.2. All of our code samples are available on [GitHub](http://www.github.com/pxblue) and we have also published a number of packages to [NPM](https://www.npmjs.com/~px-blue) to make integrating PX Blue into your applications much simpler. This will also allow us to continuously deliver and version updates to PX Blue resources. See the updated Framework Guides to learn how to pull these packages into your applications. PX Blue is licensed under the BSD-3-Clause license agreement. The text of this license can be found in any of our [resource repositories](https://github.com/pxblue/themes/blob/master/LICENSE).

### More Hybrid Support
PX Blue now supports hybrid development in [Cordova](/development/frameworks-mobile/cordova) and [React Native](/development/frameworks-mobile/reactnative), and we have provided additional information for those already using [NativeScript](/development/frameworks-mobile/nativescript).

### Style Updates
We've also made some minor update to our color palette and typography hierarchy to improve our alignment with corporate branding requests. We also have updated icons in our icon font. Make sure to upgrade to the latest versions to be up-to-date.

<br/><br/><br/>
# Power Xpert Blue 2.1 (June 2018)

### Hybrid Apps
Hybrid app support. We now support NativeScript for iOS and Android app development using Angular, TypeScript and JavaScript. NativeScript allows you to use your existing web development skills to build native apps for iOS and Android that share a single common codebase. You can read more in our [NativeScript](/development/frameworks-mobile/nativescript) guide.

### Project Tool
The PX Blue 2.1 release also includes an early beta version of the PX Blue Project Tool. Designed to get developers started as quickly as possible with PX Blue, the PX Blue Project Tool provides a graphical or command line interface for creating and updating PX Blue projects without having to go through a bunch of manual configuration. You can read more in our Project Tool introduction.

### Alignment with Marketing
Power Xpert Blue continues to improve its alignment with Corporate Branding and Marketing. Open Sans is now officially supported at Eaton for application development.

<br/><br/><br/>
# Power Xpert Blue 2.0 (February 2018)

The inaugural release of Power Xpert Blue 2.0 is the first release of our newly updated Design System. We now support a wide range of platforms and technologies with comprehensive documentation for using the design system. 

### Themes

Theme file are available for each supported framework. Power Xpert Blue 2.0 comes with four themes:

- **Blue** is the default theme for all Eaton applications.
- **Blue-Dark** is complementary to the Blue theme. The primary use for Blue-Dark is in detail panels (i.e., information sidebars).
- **Red** is used to indicate an alarm or error condition on a section of your application. 
- **Red-Dark** is complementary to the Red theme. The primary use for Red-Dark is in detail panels (i.e., information sidebars) that accompany a view that uses the Red theme. 

### The pxblue.github.io website

The PX Blue documentation website provides code examples and snippets for all of the components in the design system. It also provides downloadable assets for icons, colors, and even sticker sheets for designers. You'll find guidance for everything from typography to setting up your development environment. If you were a PX Blue 1.0 developer, you'll find advice on migrating to the new system.

