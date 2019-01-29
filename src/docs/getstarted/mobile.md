# Mobile Applications
Mobile applications come in two primary varieties: native apps and hybrid apps.

## Native apps
  - Built using the native code that runs on mobile devices. In general, that means Java (Android) or Swift / Objective C (iOS)
  - Should adhere to the design and development guidelines for the intended platform so as to maintain consistent interactions and patterns across different apps ([iOS Guidelines](https://developer.apple.com/ios/human-interface-guidelines/overview/themes/), [Android Guidelines](https://developer.android.com/design/index.html))
  - Android and iOS are the dominant players in the mobile market, but you should check with your particular users to see what is most prevalent in their space

## Hybrid apps
   - Built using a single code base that can be deployed to multiple different device types (namely iOS and Android)
   - Can be built using web-technologies (i.e. JavaScript), so there is a low barrier to entry for developers to get started quickly in the mobile space
   - Different platforms implement apps in different ways - some compile down to native components, whereas others render all content in a web view (essentially a web page running inside of an app)

# Comparing the two approaches

## Native mobile apps

- Look and feel is guaranteed to feel like an app since it uses native components
- Requires more specialized development expertise
- Longer development time if you plan to support multiple operating systems (multiple code bases)
- More expensive / more maintenance

## Hybrid mobile apps

- Single code base reduces development time
- Many different hybrid platforms / tools available
- App can look the same on both platforms
- Easier development, but also easier to make something that doesn't follow standard patterns

# So, which one should you use?

Our recommendation for mobile applications is to take a hybrid approach (see our [Hybrid App Guide](/getstarted/hybrid)). This will allow you to deploy multiple versions of your application (i.e. iOS and Android) from a single code base. We offer support for several different approaches to building hybrid apps.

If you prefer to build a strictly native app and adhere to the PX Blue standards, there are ways of doing this using [Material Design Components for Android](https://material.io/develop/android/) and [Material Design Components for iOS](https://material.io/develop/ios/). If you are planning to go this route, please contact us.