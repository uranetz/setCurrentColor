# setCurrentColor

svgo plugin for setting up specified attributes (ex stroke and fill) with currentColor value

## install

install via npm 

```
npm install @uranetz/setcurrentcolor
```

## new in v1.2.1

from this version and up property to be replaced could be in style attribute too

## usage

add plugin to svgo optimize:

```javascript
import setCurrentColor from '@uranetz/setcurrentcolor';

optimize( data, {
    //all other staff here

    plugins: [
      setCurrentColor
    ],
  });
```

## params

The "attrs" parameter a pattern to set currentColor value - default to fill and stroke
<br/>
The "force" parameter - changes attrs if they alredy set - default is false.
<br/>
The "path" parameter a pattern to set currentColor for

## test

For test run 

```
npm test
```

## example and usage 

Simple example showed in test.js. Advanced usage can be found in index.js .