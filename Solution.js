
/**
 * @param {string} source
 * @param {string} target
 * @return {number}
 */
var shortestWay = function (source, target) {
    const CAN_NOT_FORM_TARGET_FROM_SOURCE = -1;
    if (!sourceHasAllUniqueLettersThatTargetHas(source, target)) {
        return CAN_NOT_FORM_TARGET_FROM_SOURCE;
    }

    let subsequencies = 0;
    let totalFoundLetters = 0;
    let endInSourceReached = true;
    let indexS = 0;

    for (let indexT = 0; indexT < target.length && totalFoundLetters < target.length; indexT += !endInSourceReached ? 1 : 0) {

        let notFound = true;
        for (indexS = !endInSourceReached ? indexS + 1 : 0; indexS < source.length; ++indexS) {
            if (target.charAt(indexT) === source.charAt(indexS)) {
                notFound = false;
                ++totalFoundLetters;
                break;
            }
        }
        endInSourceReached = notFound;
        subsequencies += (endInSourceReached || totalFoundLetters === target.length) ? 1 : 0;
    }
    return subsequencies;
};

/**
 * @param {string} source
 * @param {string} target
 * @return {boolean}
 */
function sourceHasAllUniqueLettersThatTargetHas(source, target) {
    const ALPHABET_SIZE = 26;
    const ASCII_SMALL_CASE_A = 97;
    const uniqueLettersInSource = new Array(ALPHABET_SIZE).fill(false);

    for (let letter of source) {
        uniqueLettersInSource[letter.codePointAt(0) - ASCII_SMALL_CASE_A] = true;
    }

    for (let letter of target) {
        if (!uniqueLettersInSource[letter.codePointAt(0) - ASCII_SMALL_CASE_A]) {
            return false;
        }
    }
    return true;
}
