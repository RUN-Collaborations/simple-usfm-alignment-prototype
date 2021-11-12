import clearTitusData from './clearTitusData';

/**
 * Returns an array of source segments with PartOfSpeech
 * mapped on using data from Clear.Bible
 * @param {Array} sourceSegments
 * @returns {Array} source segments with PoS 
 */
export default function partOfSpeechHelper(sourceSegments) {
  return sourceSegments.map((sourceSegment) => {
    const partOfSpeech = findPartOfSpeech(sourceSegment.text)
    return {...sourceSegment, partOfSpeech }
  });
};

function findPartOfSpeech(ugntText) {
  const normalizedText = normalize(ugntText);

  return clearTitusData.find((datum) => {
    const normalizedDatumText = normalize(datum.ugnt);
    return normalizedDatumText === normalizedText;
  })?.partOfSpeech;
};

function normalize(stringThing) {
  return stringThing.normalize("NFC");
}
