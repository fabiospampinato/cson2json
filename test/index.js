
/* IMPORT */

import fs from 'node:fs';
import path from 'node:path';
import diff from 'test-diff';
import cson2json from '../dist/index.js';

/* HELPERS */

const CHECK = path.join ( process.cwd (), 'test', 'check' );
const OUTPUT = path.join ( process.cwd (), 'test', 'output' );
const SOURCE = path.join ( process.cwd (), 'test', 'source' );
const GLOB_SOURCE = '*';
const GLOB_CHECK = '*';

/* MAIN */

diff ({
  verbose: true,
  source: {
    cwd: SOURCE,
    glob: GLOB_SOURCE
  },
  output: {
    cwd: OUTPUT,
    make ( source ) {
      fs.mkdirSync ( OUTPUT, { recursive: true } );
      const cson = fs.readFileSync ( path.join ( SOURCE, source ), 'utf8' );
      const obj = cson2json ( cson );
      const json = JSON.stringify ( obj, undefined, 2 );
      fs.writeFileSync ( path.join ( OUTPUT, `${source.slice ( 0, -5 )}.json` ), json + '\n' );
    }
  },
  check: {
    cwd: CHECK,
    glob: GLOB_CHECK
  }
});
