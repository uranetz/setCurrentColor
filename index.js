'use strict';

export const name = 'setCurrentColor';
export const type = 'visitor';
export const active = true;
export const description = 'set specified attributes (stroke and fill) with currentColor value';

const DEFAULT_SEPARATOR = ':';

/**
 * Set attributes value to currentColor
 *
 * @example elemSeparator
 *   format: string
 *
 * @example force
 *   format: boolean
 *
 * @example attrs
 *   format: string | [ string ]
 *  
 *    examples:
 *      - 'fill'
 *      - 'fill:stroke'
 *      - ['fill','stroke']
 * 
 * @example paths:
 *
 *   format: [ element* : attribute* : value* ]
 *
 *   element   : regexp (wrapped into ^...$), single * or omitted > all elements (must be present when value is used)
 *   attribute : regexp (wrapped into ^...$)
 *   value     : regexp (wrapped into ^...$), single * or omitted > all values
 *
 *   examples:
 *
 *     > basic: set fill and stroke empty attributes with currentColor on all elements 
 *     ---
 *     setCurrentColor:
 *
 *     > set only fill attributes even they have value 
 *     ---
 *     setCurrentColor:
 *       attrs:'fill'
 *       force:true
 * 
 *     > set currentColor value only for path (ex svg)
 *     ---
 *       paths: 'path:*'
 *
 *
 * @author Vladimir Smirnov 
 *
 * @type {
 *   elemSeparator?: string,
 *   force?: boolean,
 *   attrs?: string | Array<string>
 *   paths?: string | Array<string>
 *  }
 */
export const fn = (root, params) => {


  const elemSeparator =
    typeof params.elemSeparator == 'string'
      ? params.elemSeparator
      : DEFAULT_SEPARATOR;
  const force =
    typeof params.force == 'boolean'
      ? params.force
      : false;
  if (typeof params.paths == 'undefined') {
    params.paths = ['*'];
  }    
  const paths = Array.isArray(params.paths) ? params.paths : [params.paths];

  if(typeof params.attrs == 'undefined'){
    params.attrs = ['fill','stroke'];
  }
  if(typeof params.attrs == 'string'){
    if(params.attrs.includes(elemSeparator) !== false){
        params.attrs = params.attrs.split(elemSeparator);
    }else{
        params.attrs = [params.attrs];
    }
  }
  const attrs = params.attrs;
  const hasAttrInStyle = function (styleName,styleAttr){
    if(styleAttr == null || styleName == null || styleName == '') return null;
    const regexp = new RegExp(styleName+':[^;]+;?');
    return styleAttr.match(regexp);
  }
  return {
    element: {
      enter: (node) => {
        for (let pattern of paths) {
          // if no element separators (:), assume it's attribute name, and apply to all elements *regardless of value*
          if (pattern.includes(elemSeparator) === false) {
            pattern = ['.*', elemSeparator, pattern, elemSeparator, '.*'].join(
              ''
            );
            // if only 1 separator, assume it's element and attribute name, and apply regardless of attribute value
          } else if (pattern.split(elemSeparator).length < 3) {
            pattern = [pattern, elemSeparator, '.*'].join('');
          }

          // create regexps for element, attribute name, and attribute value
          const list = pattern.split(elemSeparator).map((value) => {
            // adjust single * to match anything
            if (value === '*') {
              value = '.*';
            }
            return new RegExp(['^', value, '$'].join(''), 'i');
          });

          // matches element
          if (list[0].test(node.name)) {
            // loop attributes
            for (const [name, value] of Object.entries(node.attributes)) {
              if (
                // matches attribute name
                list[1].test(name) &&
                // matches attribute value
                list[2].test(value) 
              ) {
                //match current element 
                for(let attr of attrs){
                    const regexp = hasAttrInStyle(attr,node.attributes.style);
                    if( force || (node.attributes[attr]==null && regexp == null) ){
                        node.attributes[attr] = "currentColor";
                        //remove attr from style if exists
                        if(regexp !== null) node.attributes.style = node.attributes.style.replace(regexp,'');
                    }
                }
              }
            }
          }
        }
      },
    },
  };
};

export default {name:name,fn:fn,type:type,description:description};