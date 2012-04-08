*CSS Gradient image generator*

A tool for generating images from linear gradient CSS.

**Intention**

The images generated can be used as repeating background images, allowing a fallback option for browsers that do not support gradients.

**Technical notes**

***Implementation***

A canvas tag is used to draw a gradient to the same specification. This is then turned into a dataURI string which is used to create an image tag or for downloading as a file.

***Unit tests***

A suite of unit tests are included to enable testing against vendors implementation of the CSS3 syntax (which is not yet standardized).