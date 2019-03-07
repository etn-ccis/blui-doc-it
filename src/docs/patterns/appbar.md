# App Bar Patterns

App bars are useful in a variety of locations throughout PX Blue applications. They are typically used to provide a title or description for a collection of data that follows. They may also a menu and/or various actions that can be performed.

## A Basic App Bar
The most basic app bar is used at the top of a page as a title bar. It will have a menu button to the left (used to toggle a navigation menu/drawer) followed by one or two lines of text (title/subtitle) and, optionally, a dropdown with global page actions. Basic app bars can also be used to provide more detailed headers for Cards.

## Collapsible App Bar
In some situations, you may want to present more information in an app bar, such as a large graphic, buttons, or multiple lines of text. In these cases, you can use a taller app bar that will shrink as the user scrolls down the page and be replaced by a basic app bar. This allows you the flexibility to present an eye-catching banner without permanently reducing the amount of usable space on the page. This is a pattern most commonly used for mobile applications, but could also be used at larger scale.

{{ angular stackblitz=https://stackblitz.com/edit/pxblue-collapsible-appbar-angular?embed=1&file=src/app/app.component.ts&hideNavigation=1&view=preview }}
{{ react stackblitz=https://stackblitz.com/edit/pxblue-collapsible-appbar-react?embed=1&file=App.js&hideNavigation=1&view=preview }}

## Search Bar
A very common pattern seen in many types of applications is the ability to search data on a page. This is achieved by placing a search icon/button in the app bar. When this button is clicked, a white Search Bar slides in from the right to cover the default toolbar. As the user enters text into the search field, the data is filtered in real-time.
{{ angular stackblitz=https://stackblitz.com/edit/pxblue-search-bar-angular?embed=1&file=app/app.component.ts&hideNavigation=1&view=preview}}
{{ react stackblitz=https://stackblitz.com/edit/pxblue-search-bar-react?embed=1&file=index.js&hideNavigation=1&view=preview }}
