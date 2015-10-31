# Web Apps Engine
## Versionnumber 0.1.0 (2015-03-01) Alpha
(***Documentation last update 2015-10-31 13:30***)  

A Express-App, which houses serverall Mini Applications that are loaded on startup

## Features
* load serveral Apps out of  the /apps folder

## Known Bugs
none

## Roadmap / Future Features
* hot-deploy (load apps, will running)
* refactoring
    * removing apps from trunk / create seperate branch
    * create readme for all apps
    
## System Requirement & Prerequisits
 simply node.js installation

## Usage
npm start

### Setup
Download Source from SourceLink and execute "npm install"

### SourceControl Link & Information
https://github.com/akumagamo/WebAppsEngine.git

### Base Code Example

## Documentation

### File / Folder Structure (TODO: sort alphaNum)
     +-+- WebAppsEngine
       +-+- apps (Folder for Apps)
       | +-+- _base (template for App)
       | | +-+- views (folder for Views)
       | | | +- index.jade (template for jade-view)
       | | | +- layout.jade (template for jade-layout)
       | | +- index.js (template for App)
       | +- apps-helper.js (helper functions for Apps)
       | +- shared-config.js (shared configuration for Apps)
       | +- shared-functions.js (shared functions for Apps)
       +-+- bin
       | +- www_appengine (startup script)
       +-+- logs
       | +- ... (logfiles)
       +-+- public (folder for static files)
       | +- ...
       +-+- routes (routes for the App Engine)
       | +- index.js (base routes for App-Engine)
       | +- info.js (returnd info over all apps)
       +-+- tmp (temp folder)
       | +- ...
       +-+- views (views for the App Engine)
       | +- error.jade (error view)
       | +- index.jade (default base view)
       | +- info.jade (info view)
       | +- layout.jade (base layout for App Engine)
       +- engine.js (main application logic)
       +- global-config.js (global configurations for the engine and all apps)
       +- package.json (package info file)
       +- readme.md (this document)
	   
### External Libs
* Express

