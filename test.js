import { optimize } from "svgo";

import setCurrentColor from './index.js';

const testSVG = `
<svg width="400" height="110">
  <rect width="300" height="100" fill="#000" />
</svg>
`
const validResultSVG = '<svg width="400" height="110" fill="currentColor"><rect width="300" height="100" fill="#000"/></svg>';

try {
  const result = optimize(testSVG, {
    // optional but recommended field
    //path: 'path-to.svg',
    // all config fields are also available here
    //multipass: true,
    plugins: [
      {...setCurrentColor,params:{attrs:'fill',paths:'svg:*'}}
    ],
  });
  if( result.data === validResultSVG) console.log('pass test');
  else{
    console.log('not pass');
  }
} catch (error) {
  console.log('not pass');
}

  //console.log(optimizedSvgString);
  