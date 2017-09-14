#!/bin/sh
printf "Dockerized application starting in DEVELOPMENT...\n";
bower install;
yarn install;
npm start;