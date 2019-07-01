# Login Patterns
Most applications will require some form of login to ensure that only authorized users have access. The most basic login is with a simple username and password.

## Basic Form
A simple login presents fields for the users to enter their credentials and a button to submit them for verification.

{{ angular stackblitz=https://stackblitz.com/edit/pxblue-login-angular?embed=1&file=src/app/login/login.component.ts&hideNavigation=1&view=preview }}
{{ react stackblitz=https://stackblitz.com/edit/pxblue-login-react?embed=1&file=App.js&hideNavigation=1&view=preview }}
{{ ionic images=../images/gif/login.gif }}
{{ reactNative images=../images/gif/signIn-rn.png }}

## Login Feedback

After a user submits their credentials, there are three possible results:
* If authentication is successful, the user is directed to the application landing page.
* If authentication fails, the user remains on the login page and the screen should be updated to show an appropriate error message (e.g., Invalid Credentials).
* If an error occurs when attempting to validate the credentials (e.g., Server Unavailable), the user should be notified with an appropriate error message.



> **NOTE:** be very careful when presenting error messages to users. For security, you should not present more information than is necessary (e.g., do **NOT** provide messages like "User does not exist," "Incorrect Password," etc.).

## Forgot Password

The login screen for an application should also present users with a way to recover or reset their password if they have lost or forgotten it. This is typically presented as a hyperlink below the credential fields. Clicking the link will present users with a field to enter their e-mail address. They will receive an email with a hyperlink to reset their password.
{{ ionic images=../images/gif/loginfp.gif }}
{{ reactNative images=../images/gif/forgot-rn.png }}

## User Registration

The login screen should also present new users of the application with a way to sign up for an account. This is also typically presented as a hyperlink below the credential fields that would link to a registration workflow (see below).

#### Registration Workflow
To register for an account, a new user must supply their e-mail address. After entering their e-mail address, a confirmation code is sent to verify the address.

After the email address is verified, users can continue the registration process by choosing a password. You should display password requirements (if any) near this field.

> **NOTE:** The minimum requirements for registration are an email address, confirmation code, and password. You can also collect additional parameters as necessary for your application (e.g., Name, Phone Number, etc.). 

{{ ionic images=../images/gif/loginregister.gif }}
{{ reactNative images=../images/gif/register-rn.png }}
