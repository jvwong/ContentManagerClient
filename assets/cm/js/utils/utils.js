/* global */
'use strict';

/**
 * @module utilities
 */

/* START utils */
var utils = (function(){

  /** Format the response from the server to output JSON
   * @method transformRes
   * @param {object} raw data the data from server
   * @param {object} headers server headers
   */
  function transformRes(data, headers){
    var out = [];
    try{
      out = JSON.parse(data);
    } catch(e){
      console.warn('JSON parsing error utils.js @ transformRes %s', e);
    }
    return out;
  }

  /** Create an array of numbers with given granularity and size
   * @method transformRes
   * @param {number} start what to start at
   * @param {number} stop what to end at or below
   * @param {number} step the step size
   * @param {number} decimals # decimals to round
   * @return {object} out array of values
   */
  function granulator(start, stop, step, decimals) {
    var out, i, isOver;


    out = [];
    isOver = false;

    if( toDecimal(start, decimals) < stop ){
      out.push(toDecimal(start, decimals));
    }
    while( out.length && !isOver ){
      var val = toDecimal((out[out.length - 1] + step), decimals);

      if( val <= stop ){
        out.push(val);
      }else{
        isOver = true;
      }
    }
    return out;
  }

  /** Round a number to a given number of decimals
   * @method transformRes
   * @param {number} number the number
   * @param {number} decimals the number of decimals
   * @return {number} the rounded number
   */
  function toDecimal(number, decimals) {
    var out, multi;
    multi = Math.pow(10, decimals);
    out = Math.round(number * multi) / multi;
    return out;
  }

  /** Validate that every array element is valid
   * @method validElements
   * @param {object} data an array of data elements
   * @param {object} accessor function to validate element.
   * Should take parameters 'element', 'index', and 'array'
   * @return {boolean} true/false
   */
  function validElements(data, accessor){
    var isValid = data.every(accessor);
    return isValid;
  }

  /** Convert newline commands \n\n to html elements
   * @method newlineToBr
   * @param {string} pre a raw input string
   * @return {string} output string with replaements
   */
  function newlineToBr (pre){
    return pre.replace(/\n/g, '<br/>');
  }

  return {
    transformRes          : transformRes,
    granulator            : granulator,
    toDecimal             : toDecimal,
    validElements         : validElements,
    newlineToBr           : newlineToBr
  };

}());
/* END utils */

