
/* REQUIRE */

const {argv} = require ( 'yargs' ),
      diff = require ( 'test-diff' ),
      fs = require ( 'fs' ),
      mkdirp = require ( 'mkdirp' ),
      path = require ( 'path' ),
      {default: cson2json} = require ( '../dist' );

/* VARIABLES */

const CHECK = path.join ( __dirname, 'check' ),
      OUTPUT = path.join ( __dirname, 'output' ),
      SOURCE = path.join ( __dirname, 'source' ),
      GLOB_SOURCE = argv.only ? `${argv.only}.cson{}` : '*',
      GLOB_CHECK = argv.only ? `${argv.only}.json{}` : '*';

/* DIFF */

diff ({
  verbose: !!argv.verbose,
  source: {
    cwd: SOURCE,
    glob: GLOB_SOURCE
  },
  output: {
    cwd: OUTPUT,
    make ( source ) {
      mkdirp.sync ( OUTPUT );
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
