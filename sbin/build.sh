#!/bin/bash
# quit on error
set -e

DIR="$( cd "$( dirname $( dirname "${BASH_SOURCE[0]}" ))" && pwd )"
export NODE_ENV=production

echo -e "\033[5mBuilding doc-it...\033[0m"
cd $DIR
npm run build
echo -e "\033[5mBuilding doc-it finished\033[0m"

echo -e "\n---\n"

# echo -e "\033[5mBuilding react example app...\033[0m"
# cd $DIR/src/examples/react
# npm run build
# echo -e "\033[5mBuilding react example app finished\033[0m"

# echo -e "\n---\n"

# echo -e "\033[5mBuilding MDC example app...\033[0m"
# cd $DIR/src/examples/mdc
# npm run build
# echo -e "\033[5mBuilding MDC example app finished\033[0m"

# echo -e "\n---\n"

# echo -e "\033[5mBuilding angular example app...\033[0m"
# cd $DIR/src/examples/angular
# ./node_modules/.bin/ng build --prod --base-href .
# echo -e "\033[5mBuilding angular example app finished\033[0m"

# echo -e "\n---\n"

# echo -e "\033[5mBuilding angular example app...\033[0m"
# cd $DIR/src/examples/angularjs
# npm rebuild node-sass --force
# npm run build
# echo -e "\033[5mBuilding angular.js example app finished\033[0m"

# echo -e "\n---\n"

# echo -e "\033[5mCollecting build artifacts...\033[0m"
# cd $DIR/build
# mkdir -p examples/react examples/angular examples/angularjs examples/mdc
# mv $DIR/src/examples/react/build/* examples/react
# mv $DIR/src/examples/mdc/build/* examples/mdc
# mv $DIR/src/examples/angular/dist/* examples/angular
# mv $DIR/src/examples/angularjs/dist/* examples/angularjs
# echo -e "\033[5mCollecting build artifacts finished\033[0m"
