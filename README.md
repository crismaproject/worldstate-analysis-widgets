worldstate-analysis-widgets [![Build Status](http://ci.cismet.de/buildStatus/icon?job=worldstate-analysis-widgets)](https://ci.cismet.de/view/html5%20javascript/job/worldstate-analysis-widgets/)
===========================

The AngularJS implementation of the Scenario Comparison and Analysis and the Multi-Criteria-Analysis and Decision Support Functional Building Block.

![worldstate_analysis_widgets_example](https://cloud.githubusercontent.com/assets/973421/4491054/3979b86c-4a34-11e4-800f-034f4612860d.png)

## Get started

Simply pull in the libraries and all the dependencies via [bower](http://bower.io/)

```sh
  bower install --save worldstate-analysis-widgets
```

There is a number of directives that are useful for the different parts of the worldstate analysis. Currently the best way to get a grip on the usage, see the <code>index.html</code> of this repo. Pull in and wire toghether the directives that you want to use in your application accordingly.


However, this will only work correctly if you provide info where to find the ICMM instance to use:

```javascript
angular.module(
    'myCoolModule'
).config(
  [
    '$provide',
    function ($provide) {
        'use strict';

        $provide.constant('CRISMA_DOMAIN', 'CRISMA');                       // the name of the CRISMA domain to use
        $provide.constant('CRISMA_ICMM_API', 'http://url/to/the/icmm/api'); // the url to the API of the ICMM instance to use
      }
    }
  ]
);

```

## Demo
Simply checkout the project and put the app folder in your favourite web server, or even more simple, use grunt to fire up a web server for you

```sh
grunt serve
```
