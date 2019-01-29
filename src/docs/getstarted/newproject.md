# New Project Guide
As a first step, decide if this is going to be a web application, mobile application, or both? Here is a run-down of these different types of applications.

### Web Applications
These applications are accessible over the web. They can be accessed from any device with a network connection (personal computer, mobile phone). 

Responsive web design is critical for web applications today -with a nearly infinite variety of web-capable devices available, you'll want your application to look great on all of them. It's much easier to design a responsive web application if you start with mobile designs first. If you can fit your features into a mobile-sized display, it's much easier to scale up to a desktop size than it is to design for desktop and then scale everything down to mobile.

### Mobile Applications
Mobile applications are intended to be used strictly on mobile devices (e.g., cell phones, tablets, etc.). These tend to come in two varieties: native apps and hybrid apps. For more information about the differences in these approaches and which makes more sense for your application, take a look at [Mobile Applications](/getstarted/mobile).

## Decide What Kind of Application to Build

### This project is replacing an existing product

Think about the existing product and how it is used. Gather feedback from existing users and identify areas for improvement.

In general, you will want to at least provide the same type of application as before (unless user feedback suggests that it's not what they need). If you had a web application before, you may want to build a responsive web application this time. Alternatively,  you may want to expand on the existing product by offering a mobile application. 

### This is a brand new product (never before seen)

Think about how the product will be used. Does it offer features that users will want to access on the go? Is it going to be actively used in the field, or is it something users will more likely use from their desk?

In general, you can't go wrong with a web application. If you do your due diligence and design a properly responsive application, you will be able to access it from any connected device, including mobile. If you suspect that the primary mode of interacting with the application will be from a mobile device, you will probably want to consider building a dedicated mobile app.

## Ok, I need a Web Application

That's great! There are a lot of wonderful web applications out there and tons of options for how to proceed. Most modern applications are built with HTML/CSS and sit inside a JavaScript framework. If your application needs to be very small, or if you don't really have a need for a JavaScript infrastructure, you can certainly build static applications with just HTML and CSS. You can also use "vanilla" JavaScript without the need for including an entire JavaScript framework in your application. We support both Angular and React in the PX Blue design system (as well as some limited support for vanilla JavaScript).

For a comparison of the pros/cons of each of these frameworks, take a look at our [Framework Comparison](/frameworks-web/comparison).

If you already know which framework you want to use, check out our framework guides to learn how to use our [Themes](/getstarted/themes).

## Ok, I need a Mobile App

Awesome! People love mobile apps. The big thing you need to decide next is whether you should build a native mobile application or a hybrid app - see our [Mobile Applications](/getstarted/mobile) guidelines for a comparison. 

Keep your users in mind, and if possible, try to identify the kinds of devices they use. The two biggest players in the mobile operating system market are Android and iOS.

> **NOTE:** PX Blue support for native mobile applications is limited - we strongly recommend most development teams adopt a [Hybrid](/getstarted/hybrid) approach.
