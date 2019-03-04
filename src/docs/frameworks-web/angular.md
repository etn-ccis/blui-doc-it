# Getting Started with Angular

The fastest way to create an Angular application is to use the [Angular CLI](http://cli.angular.io/). Once you have created your project, you can follow the instructions below for adding PX Blue themes. Alternatively, you can start your project by downloading one of our code samples from [StackBlitz](http://www.stackblitz.com/@px-blue) or [Github](https://github.com/pxblue) (the Login or Navigation examples are good projects to start from).

## Requirements
To use PX Blue with your Angular project, you will need:

1. An existing Angular application
    * The project must be configured to use SASS stylesheets
2. [Angular Material](https://material.angular.io/) Component Library
    * Our themes are built for these components.
3. PX Blue Themes for Angular:
    * These are available from npm as [@pxblue/themes](https://www.npmjs.com/package/@pxblue/themes)

## Integrating PX Blue
Install the Angular Material components and PX Blue theme files from npm:
```
cd your-project
yarn add @angular/material @pxblue/themes
```

Then import the theme files into your application's main stylesheet:
```
// styles.scss
@import '~@pxblue/themes/angular/theme.scss';
```

In order for your application to use the **Open Sans** font, you will also need to include the relative path to the npm package *typeface-open-sans* in your Angular.json file (2 places):
```
//build styles
styles[
    "styles.scss",
    "./node_modules/typeface-open-sans"
    ]
...
//testing styles
styles[
    "styles.scss",
    "./node_modules/typeface-open-sans"
    ]
```
Then, in your application, you can access fonts using mat-typography, e.g.:

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
