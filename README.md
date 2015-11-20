# Weibo Preview
[![weibo-preview version](https://img.shields.io/badge/weibo--preview-v1.0.5-brightgreen.svg)](https://github.com/mailmangroup/weibo-preview/) [![License](http://img.shields.io/badge/License-MIT-blue.svg)](http://opensource.org/licenses/MIT)

To provide a better service of publishing through our platform, we wanted a way for users to see a live preview of how their post will look within Weibo.

[View the demo](https://github.com/mailmangroup/weibo-preview)

## Installation
```
$ bower install weibo-preview
```

## Including weibo-preview

### requireJS
```javascript
require.config({
    paths: {
        preview: './bower_components/weibo-preview/dist/weibo-preview.min'
    }
});

require( [ 'preview' ], function( Preview ) {
    ...
});
```
### Basic Script Include
```html
<script src="./bower_components/weibo-preview/dist/weibo-preview.min.js"></script>
```

### Include the CSS File
```html
<link rel="stylesheet" href="./bower_components/weibo-preview/dist/preview.css">
```

## Usage

```javascript
var preview = new Preview({ ... }, { ... });

// returns preview.el
// document.body.appendChild( preview.el );

preview.generate({ ... });
```

## API

### build

Type: `object`

This will specify the size of the container.

### content

Type: `string` or `object`

This will specify the content of the container.

### Preview( build ) Options

#### build.container

Type: `string` or `object`

This will specify the size of the container. This can be set by either a predefined set of screen sizes through a string, or specific pixel heights and widths through an object. i.e.

```javascript
var build = {
    container: {
        height: 736, // 736px (iPhone 6 Plus width) is the maximum accepted height
        width: 414 // 414px (iPhone 6 Plus height) is the maximum accepted width
    }
}
```

Whitelisted screen size strings:
- iPhone 4
- iPhone 5
- iPhone 6
- iPhone 6 Plus

### Preview( content ) Options
#### content.accountName

Type: `string`

Default: `'Account Name'`

#### content.accountImage

Type: `string`

Default: `null`

Expects a string in the form of an image URL.

#### content.postImages

Type: `Array`

Default: `[]`

Expects an array of strings in the form of image URL's, i.e.
```javascript
postImages: [ 'http://www.example.com/images/foo.jpg', 'http://www.example.com/images/bar.jpg' ]
```

#### content.postTime

Type: `number`

Default: `null`

Expects a javascript date timestamp in milliseconds, i.e. `1442396253840`

#### content.verified

Type: `Boolean`

Default: `false`

Will mark the account as verified or not.
