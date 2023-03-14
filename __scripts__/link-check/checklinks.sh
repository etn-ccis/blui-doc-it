#!/bin/bash

# Community Links
echo "Checking Community Links... "
find src/docs/community -maxdepth 1 -name \*.mdx -exec markdown-link-check {} -q -v -c ./__scripts__/link-check/config/depth-1.json \;

# Design Links
echo "Checking Development Links... "
find src/docs/design -maxdepth 1 -name \*.mdx -exec markdown-link-check {} -q -v -c ./__scripts__/link-check/config/depth-1.json \;

# Development Links
echo "Checking Development Links... "
find src/docs/development -maxdepth 1 -name \*.mdx -exec markdown-link-check {} -q -v -c ./__scripts__/link-check/config/depth-1.json \;

# Mobile Framework Links
echo "Checking Mobile Framework Links... "
find src/docs/development/frameworks-mobile -maxdepth 1 -name \*.mdx -exec markdown-link-check {} -q -v -c ./__scripts__/link-check/config/depth-2.json \;

# Web Framework Links
echo "Checking Web Framework Links... "
find src/docs/development/frameworks-web -maxdepth 1 -name \*.mdx -exec markdown-link-check {} -q -v -c ./__scripts__/link-check/config/depth-2.json \;

# Get Started Links
echo "Checking Get Started Links... "
find src/docs/get-started -maxdepth 1 -name \*.mdx -exec markdown-link-check {} -q -v -c ./__scripts__/link-check/config/depth-1.json \;

# Design Pattern Links
echo "Checking Design Pattern Links... "
find src/docs/patterns -maxdepth 1 -name \*.mdx -exec markdown-link-check {} -q -v -c ./__scripts__/link-check/config/depth-1.json \;

# Release Notes Links
echo "Checking Release Notes Links... "
find src/docs/release-notes -maxdepth 2 -name \*.mdx -exec markdown-link-check {} -q -v -c ./__scripts__/link-check/config/depth-2.json \;

# Style Links
echo "Checking Style Links... "
find src/docs/style -maxdepth 1 -name \*.mdx -exec markdown-link-check {} -q -v -c ./__scripts__/link-check/config/depth-1.json \; 

# Root Links
echo "Checking Root Links... "
find src/docs -maxdepth 1 -name \*.mdx -exec markdown-link-check {} -q -v -c ./__scripts__/link-check/config/depth-0.json \;
