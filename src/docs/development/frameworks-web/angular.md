# Getting Started with Angular

The fastest way to create an Angular application is to use the [Angular CLI](http://cli.angular.io/). Once you have created your project, you can follow the instructions below for adding PX Blue themes. Alternatively, you can start your project by downloading one of our code samples from [StackBlitz](http://www.stackblitz.com/@px-blue) or [Github](https://github.com/pxblue) (the Login or Navigation examples are good projects to start from).

## Requirements
To use PX Blue with your Angular project, you will need:

1. An existing Angular application
    * The project must be configured to use SASS stylesheets
2. The [Angular Material](https://material.angular.io/) Component Library
    * Our themes are built for these components.
3. Our PX Blue Themes for Angular:
    * These are available from npm as [@pxblue/themes](https://www.npmjs.com/package/@pxblue/themes)
    * See below for installation instructions 

## Integrating PX Blue
Install the Angular Material components and PX Blue theme files from npm:
```
cd your-project
yarn add @angular/material @pxblue/themes
```

In order to use the PX Blue themes and font (Open Sans), you will need to modify your angular.json file "styles" entries (there is one under "build" and one under "test") to include the PX Blue themes and Open Sans reference:
```
"styles": [
    "src/styles.scss",
    "./node_modules/@pxblue/themes/angular/theme.js",
    "./node_modules/typeface-open-sans"
],
```

You can then apply the theme to your application by adding the proper class to your application's top-level element:
```
// Default Theme
<app-root class="pxb-blue">

// Dark Theme
<app-root class="pxb-blue-dark">
```
> If you do not specify a theme class, your application will use the default Material theme.


You can access the fonts using mat-typography, e.g.:
```
<section class="mat-typography>
   <h1>H1 Text</h1>
   <h2>H2 Text</h2>
   <p>Paragraph text</p>
   <div class="body-2">Bold body copy</div>
</section>
```

You can access theme colors as well, e.g.:

```
<mat-toolbar color="primary">My App</mat-toolbar>
```

More details about applying themes in your application can be found in [Theming your Angular Material app](https://material.angular.io/guide/theming).

## Using Angular Material Components
For detailed documentation about the various components available in Angular Material, as well as sample code and API reference, refer to the [Angular Material Documentation](https://material.angular.io/components/).

## Browser Support
Angular and Angular Material will work with any modern browser. For specific details, you can view their official support pages:

- [Angular CLI](https://angular.io/guide/browser-support)
- [Angular Material](https://github.com/angular/material2#browser-and-screen-reader-support)


## License Information
[Angular](https://github.com/angular/angular/blob/master/LICENSE) and [Angular Material](https://github.com/angular/material2/blob/master/LICENSE) are both available under the MIT License.
