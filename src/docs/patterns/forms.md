# Form Validation Patterns

Forms are an integral part to many applications, particularly during the user registration phase. One of the most important parts of working with forms is properly validating the information that users enter into them. In general, PX Blue follows the form behaviors explained in detail by [Google Material](https://material.io/design/components/text-fields.html#anatomy).

## Optional vs. Required Fields
When using a mixture of optional and required fields in a form, the inputs should be labeled appropriately. 

If most of the fields are required, you should call out the fields that are optional. These fields should be labeled with an appropriate descriptor, followed by "optional" in parentheses.

Conversely, if most of your fields are optional, you should only call out the required fields. These should be identified by an asterisk (*) after the field label. There should be a descriptor nearby that indicates that a * means the field is required.

## Handling Errors

If there is an error with the data entered into a field, the field should indicate to the user that there is a problem. Label and helper text should be changed to a red color and a warning icon should appear in the text input. The error message should be displayed in the helper text location below the field (any existing helper text should be replaced with the error message). 

Error messages should be succinct and should not provide information that could compromise security (e.g., "Invalid Credentials" instead of "Incorrect Password"). The following examples demonstrate this error handling behavior as well as provide some patterns that can be used for matching common form fields.

{{ angular url=https://stackblitz.com/edit/pxblue-form-validation-angular?embed=1&file=app/app.component.ts&hideNavigation=1&view=preview }}
{{ react url=https://stackblitz.com/edit/pxblue-form-validation-react?embed=1&file=index.js&hideNavigation=1&view=preview }}