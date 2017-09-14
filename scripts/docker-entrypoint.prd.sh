#!/bin/sh
printf "Dockerized application starting in PRODUCTION.\n";
bower install --production;
yarn install --production;
npm start;