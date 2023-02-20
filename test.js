import { optimize } from "svgo";

import setCurrentColor from './index.js';

const testSVG = `
<svg width="400" height="110" style="width:100%;fill:black;height:55rem;">
  <rect width="300" height="100" fill="#000" />
</svg>
`
const validResultSVG = '<svg width="400" height="110" style="width:100%;height:55rem;" fill="currentColor"><rect width="300" height="100" fill="#000"/></svg>';

try {
  const result = optimize(testSVG, {
    // all config fields are also available here
    plugins: [
      {...setCurrentColor,params:{attrs:'fill',paths:'svg:*',force:true}}
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
  