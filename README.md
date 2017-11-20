## Lorenz Lo Sauer Github Page

> Note: Only parts are released under the Create Commons License. If in doubt, please ask first.

### Building the site

The site uses the taskrunner Grunt to build the javascript resources, styles with maximum browser compatibility 
and finally bundle these files.

#### Rendering
- The "stars rating" is created by this little code gist of mine: 
   https://gist.github.com/lsauer/8887be7a9e34c7a5705a01d1377d6010

#### Grunt Tasks
  - **build**: creates the entire site build  (required prior to a git push/commit)
  - **default**: starts the watchers
       - Use the watcher task *css* to only monitor the styles folder
       - Use the watcher task *src* to only monitor code related folders


 
 
