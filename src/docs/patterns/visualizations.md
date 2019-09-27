# Visualizations

There are many opportunities to visualize data in different applications. The most common visualizations used in PX Blue applications come in the form of charts/graphs and maps.

## Charts & Graphs (Highcharts & ChartJS)
Currently, PX Blue supports building charts and graphs using [Highcharts](http://www.highcharts.com) and [ChartJS](https://www.chartjs.org/), which are comprehensive libraries compatible with both Angular and React. 

>**NOTE:** the following examples merely serve to show how to bring the charting libraries into your application and adjust some of the common chart parameters. You will want to adjust these values to meet the design requirements of your application.

### Highcharts

PX Blue utilities for Highcharts graphs (line, column, pie, donut) are available as an NPM package ([@pxblue/highcharts](https://www.npmjs.com/package/@pxblue/highcharts)). 
This package includes helper functions to generate chart configurations using recommended PX Blue styles. 
These utilities also enable you to quickly create placeholder charts using simulated data. For more information about using Highcharts, check out their documentation.

> Highcharts has different [licensing](https://shop.highsoft.com/faq) requirements depending on the nature of your application - you will need to contact Highsoft directly to ensure that your product is properly licensed. You can also see the [Highcharts Pricing](https://shop.highsoft.com/highcharts/) page for pricing information.

{{ angular url=https://stackblitz.com/github/pxblue/highcharts/tree/master/angular-demo?embed=1&file=src/app/app.component.ts&hideNavigation=1&view=preview }}
{{ react url=https://codesandbox.io/embed/github/pxblue/highcharts/tree/master/react-demo?fontsize=14&hidenavigation=1&module=/src/App.tsx&view=preview }}

### ChartJS 

ChartJS is an open source alternative to HighCharts offering a scaled-down feature set that supports basic charting needs.

PX Blue utilities for ChartJS graphs (line, column, pie, donut) are available as an NPM package ([@pxblue/chartjs](https://www.npmjs.com/package/@pxblue/chartjs)). For more information, check out the [ChartJS Documentation](https://www.chartjs.org/).

{{ angular url=https://stackblitz.com/github/pxblue/chartjs/tree/master/angular-demo?embed=1&file=src/app/app.component.ts&hideNavigation=1&view=preview }}
{{ react url=https://codesandbox.io/embed/github/pxblue/chartjs/tree/master/react-demo?fontsize=14&hidenavigation=1&module=/src/App.tsx&view=preview }}

## Mapping (Mapbox)
If your application needs to show data on a geographical map, PX Blue supports the use of [Mapbox](https://www.mapbox.com/), a visually pleasing mapping solution that uses data from OpenStreetMap.

Mapbox can be used on Android and iOS or on the web with Angular and React. A PX Blue theme for styling these maps is available as an NPM package ([@pxblue/mapbox](https://www.npmjs.com/package/@pxblue/mapbox)).

> Using Mapbox is subject to certain [terms](https://www.mapbox.com/pricing/). If you would like to use Mapbox in your applications, you will need to work with Mapbox to ensure your product is properly licensed.

{{ angular url=https://stackblitz.com/github/pxblue/mapbox/tree/master/angular-demo?embed=1&file=main.ts&hideNavigation=1&view=preview }}
{{ react url=https://codesandbox.io/embed/github/pxblue/mapbox/tree/master/react-demo?fontsize=14&hidenavigation=1&module=/src/App.js&view=preview }}


