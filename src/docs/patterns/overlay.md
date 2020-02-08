# Overlay Patterns

Overlays are useful for times when you want to block interaction with the page to display data or wait for a user input. These elements can come in a variety of shapes and sizes.

## Modal Dialog
The modal dialog is your typical pop-up window. These are traditionally used when you need to confirm a user action (such as deleting an item). These usually appear in the center of the screen.

## Bottom Sheet
A bottom sheet is similar to a modal dialog, but slides in from the bottom of the screen. A dark overlay is usually used to block user interaction with the main app until the bottom sheet is closed.
 
This is a very common pattern in mobile applications, but can also be used in responsive web apps. Typically, the bottom sheet contains global actions for the entire page and is activated by a button in the app bar.

### Basic
The basic bottom sheet simply contains a list of actions. The final "Cancel" action is used to dismiss the bottom sheet.

{{ angular repo=bottomsheet }}
{{ react repo=bottomsheet }}
{{ ionic repo=bottomsheet }}
{{ reactnative repo=bottomsheet }}

### Advanced
A bottom sheet is essentially just a container with some attached behaviors. Though it typically contains a simple list, it can be customized to include any content that is required for your application. For example, it can be used for custom sort/filter functionality (seen in the example below), biometric authentication prompts, etc.

{{ angular repo=complex-bottomsheet }}
{{ react repo=complex-bottomsheet }}
{{ ionic repo=bottomsheet }}
{{ reactnative repo=bottomsheet }}
