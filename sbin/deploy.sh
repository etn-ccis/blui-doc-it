#!/bin/bash
# quit on error
set -e

DIR="$( cd "$( dirname $( dirname "${BASH_SOURCE[0]}" ))" && pwd )"

echo -e "\033[5mDeploying...\033[0m"
cd $DIR
rsync -avzh $DIR/build/* eatonadmin@172.20.100.26::doc-it
echo -e "\033[5mDeployment finished\033[0m"
