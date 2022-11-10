
/* IMPORT */

import {CSON} from '../src/parser/cson.js';

/* MAIN */

const cson2json = ( cson: string ) => {

  return CSON.parse ( cson );

};

/* EXPORT */

export default cson2json;
