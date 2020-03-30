#!/bin/bash

# Hacky way to fail the checks on CI if dead links are found
OUTPUT=$(yarn check:links); 
echo \"$OUTPUT\";
[[ $OUTPUT =~ ^.*\[✖\].*$ ]] && exit 1
exit 0;