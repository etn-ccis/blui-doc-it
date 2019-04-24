# Visualizations

There are many opportunities to visualize data in different applications. The most common visualizations used in PX Blue applications come in the form of charts/graphs and maps.

## Charts & Graphs (Highcharts)
Currently, PX Blue supports building charts and graphs using [Highcharts](http://www.highcharts.com), which is a comprehensive library for the web and works with both Angular and React. 

PX Blue themes for Highcharts graphs (line, column, pie, donut) are available as an NPM package ([@pxblue/highcharts](https://www.npmjs.com/package/@pxblue/highcharts)). This package includes base configuration objects and color definitions as well as some example charts to get you started. For more information about using Highcharts, check out their documentation.

> Highcharts has different [licensing](https://shop.highsoft.com/faq/licensing) requirements depending on the nature of your application - you will need to contact Highsoft directly to ensure that your product is properly licensed. You can also see the [Highcharts Pricing](https://shop.highsoft.com/highcharts/) page for pricing information. In the future, we plan to explore additional open-source charting solutions for inclusion in PX Blue.


{{ angular stackblitz=https://stackblitz.com/edit/pxblue-highcharts-angular?embed=1&file=src/app/app.component.ts&hideNavigation=1&view=preview }}

{{ react stackblitz=https://stackblitz.com/edit/pxblue-highcharts-react?embed=1&file=index.js&hideNavigation=1&view=preview }}

>**NOTE:** these examples merely serve to show how to bring highcharts into you application and adjust some of the common chart parameters. You will want to adjust these values to meet the design requirements of your application.

## Mapping (Mapbox)
If your application needs to show data on a geographical map, PX Blue supports the use of [Mapbox](https://www.mapbox.com/), a visually pleasing mapping solution that uses data from OpenStreetMap.

Mapbox can be used on Android and iOS or on the web with Angular and React. A PX Blue theme for styling these maps is available as an NPM package ([@pxblue/mapbox](https://www.npmjs.com/package/@pxblue/mapbox)).

> Using Mapbox is subject to certain [terms](https://www.mapbox.com/pricing/). If you would like to use Mapbox in your applications, you will need to work with Mapbox to ensure your product is properly licensed.

{{ angular stackblitz=https://stackblitz.com/edit/pxblue-mapbox-angular?embed=1&file=main.ts&hideNavigation=1&view=preview }}

{{ react stackblitz=https://stackblitz.com/edit/pxblue-mapbox-react?embed=1&file=index.js&hideNavigation=1&view=preview }}


