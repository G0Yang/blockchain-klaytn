const {OutputFormats, ClassOptions, writePng, writeDot} = require("sol2uml");
const {parseUmlClassesFromFiles} = require("sol2uml/lib/fileParser");
const {convertUmlClasses2Dot, writeSVG, convertDot2Svg} = require("sol2uml/lib/converter");
const Path = require('path');

const main = async (sourceFolder = "", ignoreFilesOrFolders = [""], classOption = ClassOptions, outputFormat = OutputFormats, outputFileName = "classDiagram") => {
  const _outputFileName = Path.join(__dirname, "..", "output", outputFileName);
  const umlClasses = await parseUmlClassesFromFiles([sourceFolder], ignoreFilesOrFolders);
  const dots = convertUmlClasses2Dot(umlClasses, true, classOption);
  const convertSvg = convertDot2Svg(dots);

  switch(outputFormat){
    case 'svg':
      await writeSVG(convertSvg, _outputFileName + '.svg');
      break;
    case 'png':
      await writeSVG(convertSvg, _outputFileName + '.svg');
      await writePng(convertSvg, _outputFileName + '.png');
      break;
    case 'dot':
      await writeDot(dots, _outputFileName + '.dot');
      break;
    default:
      await writeDot(dots, _outputFileName + '.svg');
      await writeSVG(dots, _outputFileName + '.png');
      await writePng(dots, _outputFileName + '.dot');
      break;
  }
};




module.exports = main;