const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

const sol2uml = require("./tools/sol2uml");

yargs(hideBin(process.argv))
  .version(packageJson.version)
  .command('uml', 'make UML from solidity', (yargs) => {
    return yargs
      .option('path',{
        alias: 'p',
        type: 'string',
        describe: '',
        demandOption: true,
      })
      .option('ignorePath',{
        alias: 'i',
        type: 'string',
        describe: '',
        default: '',
      })
      .option('class', {
        alias: 'c',
        type: 'string',
        describe: '',
        default: {},
      })
      .option('format', {
        alias: 'f',
        type: 'string',
        describe: 'output file format (svg, png, dot, all)',
        default: 'svg',
      })
      .option('output',{
        alias: 'o',
        type: 'string',
        describe: '',
        default: 'classDiagram',
      })
  }, (argv) =>  sol2uml(argv.path, argv.ignorePath,{}, argv.format, argv.output))
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging'
  })
  .parse();
