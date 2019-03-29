# Getting Started with AngularJS

To use PX Blue with AngularJS, you will need to have an existing AngularJS application. The final version of AngularJS was released in July 2018 - we will not be supporting AngularJS for new development projects.


## Manual Integration of PX Blue
To manually integrate PX Blue with your AngularJS project, you will need:

1. An existing AngularJS application.
    * You may want to consider using the newest version of Angular. See our [guide for Angular projects](/development/frameworks-web/angular).

2. The AngularJS-material component library.
    * The easiest way to get these components is to build your application using the AngularJS Seed. Integrating the library into an existing project is more difficult, but there are [instructions](https://material.angularjs.org/latest/getting-started).

3. PX Blue Themes for AngularJS (1 file):
    - <a href="/downloads/angularjs/angularJS.theme" download>Theme File</a>.

### Adding the AngularJS Themes to your project

In order to use our themes in an AngularJS project, you will need to include the variable definitions (Theme File) that you downloaded above. You will need to paste these variable definitions into the root file of your application (typically App.js).

To apply these themes to your elements, you simply need to apply the appropriate classes:

```
<md-button class="md-primary">Click me</md-button>
<md-button class="md-primary md-hue-1">Click me</md-button> 
<md-button class="md-primary md-hue-2">Click me</md-button>
```

For more details on applying themes to elements, see [the AngularJS Material Guide](https://material.angularjs.org/latest/Theming/).

## Using AngularJS Material Components
For detailed documentation about the various components available in Angular Material, as well as sample code and API reference, refer to the [AngularJS Material Documentation](https://material.angularjs.org/latest/).

## Licensing Information
[AngularJS](https://github.com/angular/angular.js/blob/master/LICENSE) and [AngularJS Material](https://material.angularjs.org/1.0.8/license) are both available under the MIT License.