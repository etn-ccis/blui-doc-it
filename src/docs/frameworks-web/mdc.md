# Getting Started with MDC Web

To use PX Blue with a basic HTML/JavaScript application, you will need an existing application. This is intended primarily for use on static web pages.

## Manual Integration of PX Blue
To manually integrate PX Blue with your HTML project, you will need:

1. An existing application using HTML.

2. The Material Design Components for Web library.
    * These can be installed by running the following in your project root:

    ```
    yarn add material-components-web
    ```

3. PX Blue Themes for MDC Web (1 file):
    * <a href="/downloads/mdcweb/eaton-themes.css" download>Theme File</a>

### Adding the MDC Web Themes to your project

In order to use the MDC Web components, they will need to be included in your project. CSS-only implementations can be included by adding the following to your HTML:

```html
<link rel="stylesheet" href="node_modules/material-components-web/dist/material-components-web.css">
```

To include the Power Xpert Blue 2.0 themes, you need to place the PXBlueThemes.css file (Theme File) somewhere in your application structure, and reference it as follows:

```html
<link rel="stylesheet" type="text/css" href="./PXBlueThemes.css"/>
```

### Applying Themes to Components

Theming within MDC Web is handled via CSS classes. To theme a particular Component, just add the appropriate class name:

```html
<body class="pxblue-theme--blue">
	Your App Here
</body>
```

If you want to use multiple themes in different areas of your site, all you have to do is add more classes:

```html
<body class="pxblue-theme--blue">
	<div class="myAlarmArea pxblue-theme--red">
		<div class="mySidebar pxblue-theme--red-dark"/>
	</div>
</body>
```

You also have access to individual colors defined in the theme. You can read more about [applying colors on an individual basis](https://material.io/components/web/docs/theming/). 

### Optional: Using MDC Web + JavaScript
#### MDC Web Dynamic Components
Some of the components in the MDC Web library offer some level of dynamic interaction. These components require the addition of some JavaScript on top of the CSS files imported in the above examples. You can [read more on this process](https://material.io/components/web/docs/getting-started/).
#### Integrating MDC Web into Frameworks
##### Wrapper Approach
Because the basics of MDC Web components are purely HTML/CSS, these components can be used in virtually any JavaScript framework you choose. You simply wrap the HTML/CSS for the MDC Web item in a component written in your chosen framework. 
##### MDC Web Adapters
The advanced approach for dynamic components is to link up lifecycle events through an MDC Web Adapter and Foundation classes. If interested, you can [read more about this](http://material.io/components/web/docs/framework-integration).

## Using MDC Web Components
For detailed documentation about the various components available in MDC Web, as well as sample code and API reference, refer to the [MDC Web Documentation](https://material.io/develop/web/).

## Licensing Information
[MDC Web](https://github.com/angular/angular.js/blob/master/LICENSE) is available under the Apache 2.0 License.