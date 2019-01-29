# Frequently Asked Questions

### 1. How do I update to PX Blue 2.2.x if I'm currently using 2.1?
1. First, delete the PX Blue 2.1 theme files from your project source tree.
2. Next, install the new [@pxblue/themes](https://www.npmjs.com/package/@pxblue/themes) package from NPM.
3. Update your import statements to point to the npm package instead of the local file.
4. You'll also need to add a line to reference the Open Sans font package (where to add the line varies by framework)

Detailed instructions can be found in our updated Framework Guides. 
* [Angular](/frameworks-web/angular)
* [React](/frameworks-web/react)

### 2. Can I use Ionic with PX Blue?
Ionic is a very popular hybrid framework that makes use of Cordova under the hood. However, Ionic adds additional styling to UI elements that conflicts with PX Blue theming. Wrapping your application in Ionic also adds an unnecessary layer when compared to simply using Cordova. For these reasons, PX Blue does not support development with Ionic. Take a look at our [Apache Cordova](/framework-mobile/cordova) guide as an alternative.

### 3. Can I use Bootstrap with PX Blue?
PX Blue does not support the use of Twitter Bootstrap for PX Blue applications. Bootstrap can cause conflicts with PX Blue components and themes and is an unnecessary addition next to the Material component libraries and frameworks supported by PX Blue. If you are accustomed to using Bootstrap for layout, you can read about the PX Blue alternative approach on our [Layout Patterns](/patterns/layout) page.

### 4. Can I use other charting solutions (e.g., D3) with PX Blue?
Currently, PX Blue only supports charting using [Highcharts](http://www.highcharts.com). We will be exploring and comparing other charting options and may expand our support to include other charting libraries in a future release.

### 5. Do you have Design Patterns for...?
We will be continuously updating the Design Patterns section of pxblue.etn.com with new patterns and code samples as they are ready. We will prioritize patterns and examples based on interest expressed from development teams. If there is something you want to see, let us know at <a href="mailto:pxblue@eaton.com">pxblue@eaton.com</a>. 

If you have built something that you would like to share, check out our information on [Sharing Code](/community/sharing) and send us an email with a StackBlitz link.
