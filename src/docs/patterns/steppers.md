# Stepper / Wizard Patterns

Steppers, sometimes referred to as wizards, are useful when you need users to progress through a linear flow. You may need to prevent users from going to later steps until they have entered required information in earlier steps, but steppers can also be used simply to break up and organize content when it would be too overwhelming to have on a single page or form.

## Basic Stepper

A basic stepper simply shows the steps that are available and allows the user to navigate between them. The content that is displayed for each step can be customized to suit your needs. Steppers can appear horizontally or vertically (vertical usually makes more sense for smaller screens when there are more than a few steps). Both [Angular Material](https://material.angular.io/components/stepper/overview) and [Material UI](https://material-ui.com/demos/steppers/) show many examples of various stepper configurations.

## Dynamic Stepper

Sometimes, you may need to add additional steps to a stepper dynamically. This can be useful if there is a step that needs to occur multiple times (e.g., a configuration step for a dynamic number of devices) or if the user is configuring a workflow of their own. The example below illustrates this effect.

 {{ angular stackblitz=https://stackblitz.com/edit/pxblue-dynamic-stepper-angular?embed=1&file=src/app/app.component.ts&hideNavigation=1&view=preview }}
{{ react stackblitz=https://stackblitz.com/edit/pxblue-dynamic-stepper-react?embed=1&file=DynamicStepper.js&hideNavigation=1&view=preview }}
