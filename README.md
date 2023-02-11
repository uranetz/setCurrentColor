# setCurrentColor

svgo plugin for set specified attributes (ex stroke and fill) with currentColor value

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
The "force" parameter - changes attrs if they alredy set - default is false.
The "path" parameter a pattern to set currentColor for