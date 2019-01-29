# List Patterns

Lists are frequently used throughout PX Blue applications. Typically, lists are used to represent groups of similar data. They can be used to show simple name-value pairs in a sidebar all the way to complex timelines or device lists.

{{ angular stackblitz=https://stackblitz.com/edit/pxblue-action-list-angular?embed=1&file=src/app/app.component.ts&hideNavigation=1&view=preview }}
{{ react stackblitz=https://stackblitz.com/edit/pxblue-action-list-react?embed=1&file=App.js&hideNavigation=1&view=preview }}

## A Basic List

The simplest type of list simply presents a single line (or multiple lines) of text for each element in the collection.

{{ link angular stackblitz=https://stackblitz.com/edit/pxblue-data-list-angular?embed=1&file=src/app/app.component.ts&hideNavigation=1&view=preview }}
{{ link react stackblitz=https://stackblitz.com/edit/pxblue-data-list-react?embed=1&file=App.js&hideNavigation=1&view=preview }}

## Lists with Icons & Status

The most common lists in PX Blue applications will present some graphical representation of type of status for the items in the list. This is achieved by using status/type icons (avatars) and sometimes a colored left (inset) border to indicate status.

In this instance, the separator line between list elements should extend only to the edge of the text, not below the avatar.


{{ link angular stackblitz=https://stackblitz.com/edit/pxblue-status-list-angular?embed=1&file=src/app/app.component.ts&hideNavigation=1&view=preview }}
{{ link react stackblitz=https://stackblitz.com/edit/pxblue-status-list-react?embed=1&file=App.js&hideNavigation=1&view=preview }}

## Lists with Actions

If there are actions that you would like to perform on individual list items, these can be included via icons or a 3-dot action menu (multiple actions) on each list item. Depending on the space available, you typically will want to use the action menu if you have more than three actions that can be taken. Global actions that affect the whole list (such as Add or Clear) should be placed in the list header.

{{ link angular stackblitz=https://stackblitz.com/edit/pxblue-action-list-angular?embed=1&file=src/app/app.component.ts&hideNavigation=1&view=preview }}
{{ link react stackblitz=https://stackblitz.com/edit/pxblue-action-list-react?embed=1&file=App.js&hideNavigation=1&view=preview }}

## Actions on Selected Items

You may want to take action on several list items at once, but not all. These should be presented in a persistent snackbar (similar to a [bottom sheet](/patterns/overlay)) after selecting items. Selection can be handled in several ways, the simplest of which is to include a checkbox for each list item.

{{ link angular stackblitz=https://stackblitz.com/edit/pxblue-multiselect-angular?embed=1&file=app/list-selection-example.ts&hideNavigation=1&view=preview }}
{{ link react stackblitz=https://stackblitz.com/edit/pxblue-multiselect-react?embed=1&file=App.js&hideNavigation=1&view=preview }}

## Drag and Drop

Occasionally, you may want users to be able to re-order the items in a list manually. This should be accomplished by placing a drag handle as the leftmost element in the row. The ability to re-order the list should be locked behind an Edit Mode toggle mechanism.

>In Angular, the CDK (Component Developer's Kit) greater than 7.0 is required to use this feature.  CDK 7.0.0-beta works in the following example with Angular Material ^6.0.0.

{{ link angular stackblitz=https://stackblitz.com/edit/pxblue-sortable-list-angular?embed=1&file=src/app/app.component.ts&hideNavigation=1&view=preview }}
{{ link react stackblitz=https://stackblitz.com/edit/pxblue-sortable-list-react?embed=1&file=App.js&hideNavigation=1&view=preview }}

## Tables

Tables are similar to lists, but are slightly more structured by ordering data for a list item into columns. These work well on larger screens, but at mobile size, they should collapse into a list for better formatting.


{{ link angular stackblitz=https://stackblitz.com/edit/pxblue-responsive-table-angular?embed=1&file=src/app/app.component.ts&hideNavigation=1&view=preview }}
{{ link react stackblitz=https://stackblitz.com/edit/pxblue-responsive-table-react?embed=1&file=App.js&hideNavigation=1&view=preview }}
