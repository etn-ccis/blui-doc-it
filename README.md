# Doc-It (a.k.a. pxblue.github.io)

Doc-It is the source code for the pxblue.github.io documentation site for Power Xpert Blue 2.0. The site is built to both provide documentation on how to use the system, but also as an example of how to use it. The entire site is using using the PX Blue design system - built with React+Redux and Material UI.

## Contributing
To contribute to the documentation site, you will need to clone a local copy of the repository:

```
git clone https://github.com/pxblue/doc-it
```

You can then install the necessary dependencies and run a local instance with the following commands:

```
cd doc-it
yarn install
yarn start
```

## Project Structure
This project uses a react skeleton to handle the functional aspects of the site, including navigation, routing, etc. However, the majority of the site content is written in markdown files to simplify the ability to add and update content. This is made possible through the use of the [Showdown](https://github.com/showdownjs/showdown) converter.

### Folder Structure
The folder structure of the application is likewise segregated to keep the application and the content separate.

```
└── /src                                             
    |── index.js                            // the root file that renders the application
    |── /app
    │   |── App.js                          // the main <App> component definition
    │   |── App.css                         // additional styling used for the site
    │   |── /actions                        // action used for redux
    │   |── /components                     // component definitions (e.g. Navigation Drawer)
    │   |── /constants                      // constant definitions
    │   |── /epics                          // epics used for redux
    │   |── /reducers                       // reducers used for redux
    │   └── /util                           // extra utility items
    |
    └── /docs
        |── site-config.json                // defines the application routes
        |── welcome.md                      // landing page
        |── releasenotes.md                 // release notes
        |── resources                       // downloads page
        |── notfound                        // placeholder for 404 pages
        |── /community                      // information on how to be a part of PX Blue
        |── /frameworks-mobile              // information on getting started with mobile
        |── /frameworks-web                 // information on getting started with web
        |── /getstarted                     // information on getting set up to use PX Blue
        |── /patterns                       // design patterns and sample code
        └── /style                          // style guide definitions
```

## Builds and Deployment
The Doc-it project is configured with automated builds and deployment scripts. 

When changes are committed to the dev branch, they are automatically run through the test scripts and if the tests pass, the site is deployed to the staging server.

When changes are committed to the master branch and the tests pass, the changes are automatically deployed to pxblue.github.io.
