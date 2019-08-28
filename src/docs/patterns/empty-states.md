# Loading / Empty State Patterns
 
Often times, your application will need to load data from a remote location with some amount of latency. Other times, there may be areas of your application where there is no available data to display. This is where loading and empty state indicators come into play.
 
## Loading Data
When loading data for the first time, you do not want to show an empty screen while you are fetching data. Instead, you should show placeholders that mimic (using simple shapes) the data that will eventually be loaded. This will give the impression that your application is faster and gives users an indication of what kind of data is being loaded.
 
The placeholder should match as closely as possible the real structure of the data. For example, if you are loading a list where each item has an icon, two lines of text, and an action button, then your placeholder should have a circle, two rectangles for the text, and another rectangle for the button. You should show as many placeholder elements as necessary to fill the area in the application that is loading data.

{{ angular url=https://stackblitz.com/edit/pxblue-loading-states-angular?embed=1&file=app/app.component.ts&hideNavigation=1&view=preview }}
{{ react url=https://stackblitz.com/edit/pxblue-loading-states-react?embed=1&file=App.js&hideNavigation=1&view=preview }}
{{ ionic url=https://stackblitz.com/edit/pxblue-loading-states-ionic?embed=1&file=app/app.component.ts&hideNavigation=1&view=preview }}
{{ reactnative url=@px-blue/loading-states-reactnative }}

There are a number of libraries available to help you create this placeholder content, such as:
- [@netbasal/ngx-content-loader](https://www.npmjs.com/package/@netbasal/ngx-content-loader) (Angular, Ionic)
- [ion-skeleton-text](https://ionicframework.com/docs/api/skeleton-text) (Ionic)
- [placeholder-loading](https://www.npmjs.com/package/placeholder-loading) (React, Angular, Ionic)
- [react-content-loader](https://www.npmjs.com/package/react-content-loader) (React)
- [rn-placeholder](https://www.npmjs.com/package/rn-placeholder) (React Native)

### Refreshing Data
When refreshing data, there are several approaches you can take. If you are showing real-time data (either via polling or a push mechanism from the server), there is no need to show large loading indicators. You may wish to show a small indicator or at least mention when the data was last refreshed so users can identify if the data is stale.
 
If your users can manually refresh, you may wish to show the placeholder elements (as with initial load), or simply refresh the data behind the scenes (as with real-time). Ultimately, this should depend on how long it takes to refresh the data.
 

## Empty States
Empty states can be used in a variety of ways in your application. They can alert users to empty data or search results, lack of permissions, future features, or errors. 
 
### Usage
You can refer to the [Material Design Empty States](https://material.io/design/communication/empty-states.html) guidelines for general usage instructions. 
 
Empty states should include a large icon or graphic, centered in the screen, followed a brief message. In some cases, you may wish to use a large graphic as the background of the entire page as well (such as for features that will be coming soon).
 
If necessary, additional explanatory text may follow. The text on the screen should clearly indicate why there is no data to display, and what (if anything) can be done to make data available. Text should be minimal, but enough to convey the necessary message.
 
If the data is empty but could be populated by a user action (such as adding a device to an empty device list), there should be a call-to-action button that will allow the user to add data.
 
> **NOTE:** While less common, empty states can be used in sections of a page (rather than the entire page), such as a single card having no data. In these cases, the same guidelines should be followed, but may require slightly different formatting depending on the layout of the page.

{{ angular url=https://stackblitz.com/edit/pxblue-empty-states-angular?embed=1&file=app/app.component.ts&hideNavigation=1&view=preview }}
{{ react url=https://stackblitz.com/edit/pxblue-empty-states-react?embed=1&file=App.js&hideNavigation=1&view=preview }}
{{ ionic url=https://stackblitz.com/edit/pxblue-empty-states-ionic?embed=1&file=app/app.component.ts&hideNavigation=1&view=preview }}
{{ reactnative url=@px-blue/empty-states-reactnative }}
