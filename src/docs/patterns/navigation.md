# Navigation Patterns

Navigation is the way in which users access the different areas of your application. This is typically accomplished through a side drawer navigation panel with a list of links to the various pages in your application.

## Fixed Navigation

The most basic navigation panel is fixed in place and always visible on the left side of the application. Note: a fixed navigation panel is not suitable when going to smaller resolutions or mobile devices.

## Collapsible Navigation

A more common implementation of the navigation panel is a collapsible panel that can be opened and closed via the menu icon in the top left corner of the application. This implementation can have two different variations: content-resize or content-cover.

### Content-Resize / Content-Push

The content-resize implementation does not cover any of the main application content. Rather, the navigation panel slides in and the main application container resizes to accommodate (the navigation panel and main panel are side by side instead of one on top of the other).

### Content-Cover

In this implementation, the navigation panel slides out from the side, partially obscuring the main content of the application. It is often implemented with a dark overlay that blocks the main application and directs the user's focus to the navigation panel that was opened.
{{ angular stackblitz=https://stackblitz.com/edit/pxblue-navigation-collapsible-angular?embed=1&file=src/app/demo-nav/demo-nav.component.ts&hideNavigation=1&view=preview }}
{{ react stackblitz=https://stackblitz.com/edit/pxblue-navigation-collapsible-react?embed=1&file=App.js&hideNavigation=1&view=preview }}

## Icon Navigation Bar / Responsive Navigation
The icon navigation is a minimalist approach to the navigation panel. It features a single icon to represent each of the main areas of the application. This navigation panel is typically used on larger screens only, and is expandable to a full side navigation panel on hover or when clicking the menu icon. 

These may be used in conjunction with Bottom Tab navigation - on larger resolution displays, bottom tabs would become elements in the side navigation.

{{ angular stackblitz=https://stackblitz.com/edit/pxblue-icon-navigation-angular?embed=1&file=src/app/app.component.ts&hideNavigation=1&view=preview }}
{{ react stackblitz=https://stackblitz.com/edit/pxblue-icon-navigation-react?embed=1&file=App.js&hideNavigation=1&view=preview }}
