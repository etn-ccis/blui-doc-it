#!/bin/bash

# Community Links
echo -n "Checking Community Links... "
markdown-link-check -q ./src/docs/community/bugs.md -c ./link-check/config/depth-1.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/community/faq.md -c ./link-check/config/depth-1.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/community/features.md -c ./link-check/config/depth-1.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/community/license.md -c ./link-check/config/depth-1.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/community/sharing.md -c ./link-check/config/depth-1.json
if [ $? -gt 0 ]; then exit 1; fi

# Development Links
markdown-link-check -q ./src/docs/development/environment.md -c ./link-check/config/depth-1.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/development/testing.md -c ./link-check/config/depth-1.json
if [ $? -gt 0 ]; then exit 1; fi

# Mobile Framework Links
markdown-link-check -q ./src/docs/development/frameworks-mobile/cordova.md -c ./link-check/config/depth-2.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/development/frameworks-mobile/ionic.md -c ./link-check/config/depth-2.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/development/frameworks-mobile/intro.md -c ./link-check/config/depth-2.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/development/frameworks-mobile/nativescript.md -c ./link-check/config/depth-2.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/development/frameworks-mobile/react-native.md -c ./link-check/config/depth-2.json
if [ $? -gt 0 ]; then exit 1; fi

# Web Framework Links
markdown-link-check -q ./src/docs/development/frameworks-web/angular.md -c ./link-check/config/depth-2.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/development/frameworks-web/angularjs.md -c ./link-check/config/depth-2.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/development/frameworks-web/intro.md -c ./link-check/config/depth-2.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/development/frameworks-web/mdc.md -c ./link-check/config/depth-2.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/development/frameworks-web/react.md -c ./link-check/config/depth-2.json
if [ $? -gt 0 ]; then exit 1; fi

# Get Started Links
markdown-link-check -q ./src/docs/get-started/mobile.md -c ./link-check/config/depth-1.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/get-started/new-project.md -c ./link-check/config/depth-1.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/get-started/web.md -c ./link-check/config/depth-1.json
if [ $? -gt 0 ]; then exit 1; fi

# Design Patterns Links
markdown-link-check -q ./src/docs/patterns/appbar.md -c ./link-check/config/depth-1.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/patterns/forms.md -c ./link-check/config/depth-1.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/patterns/empty-states.md -c ./link-check/config/depth-1.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/patterns/internationalization.md -c ./link-check/config/depth-1.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/patterns/layout.md -c ./link-check/config/depth-1.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/patterns/lists.md -c ./link-check/config/depth-1.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/patterns/login.md -c ./link-check/config/depth-1.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/patterns/navigation.md -c ./link-check/config/depth-1.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/patterns/overlay.md -c ./link-check/config/depth-1.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/patterns/steppers.md -c ./link-check/config/depth-1.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/patterns/visualizations.md -c ./link-check/config/depth-1.json
if [ $? -gt 0 ]; then exit 1; fi


# Style Links
markdown-link-check -q ./src/docs/style/themes.md -c ./link-check/config/depth-1.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/style/typography.md -c ./link-check/config/depth-1.json
if [ $? -gt 0 ]; then exit 1; fi

# Root Links
markdown-link-check -q ./src/docs/notfound.md -c ./link-check/config/depth-0.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/overview.md -c ./link-check/config/depth-0.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/release-notes.md -c ./link-check/config/depth-0.json
if [ $? -gt 0 ]; then exit 1; fi
markdown-link-check -q ./src/docs/resources.md -c ./link-check/config/depth-0.json
if [ $? -gt 0 ]; then exit 1; fi


exit 0