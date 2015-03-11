# angular-pdf-thumbnail
Angular directive for generating PDF thumbnails from input[type="file"], using PDF.js

[Live demo](http://rawgit.com/jdryg/angular-pdf-thumbnail/master/index.html)

## Directive attributes
* file: A File object (obtained from an input[type="file"])
* thumbnail: A string which will contain the thumbnail data once the thumbnail is generated (in case you want to save the image or upload it)
* thumb-width: (Optional) The desired width of the thumbnail. If this isn't specified, the width of the thumbnail will be the width of the pdf-thumbnail element.

See the DemoController (js/controllers.js) and the demo.html partial for details on syntax.

## Styling
You can style the pdf-thumbnail and the generated img tag using CSS. 

See the demo.html partial for a simple example.
