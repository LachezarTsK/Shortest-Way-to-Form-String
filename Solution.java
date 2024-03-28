
public class Solution {

    private static final int ALPHABET_SIZE = 26;
    private static final int CAN_NOT_FORM_TARGET_FROM_SOURCE = -1;

    public int shortestWay(String source, String target) {
        if (!sourceHasAllUniqueLettersThatTargetHas(source, target)) {
            return CAN_NOT_FORM_TARGET_FROM_SOURCE;
        }

        int subsequencies = 0;
        int totalFoundLetters = 0;
        boolean endInSourceReached = true;
        int indexS = 0;

        for (int indexT = 0; indexT < target.length() && totalFoundLetters < target.length(); indexT += !endInSourceReached ? 1 : 0) {

            boolean notFound = true;
            for (indexS = !endInSourceReached ? indexS + 1 : 0; indexS < source.length(); ++indexS) {
                if (target.charAt(indexT) == source.charAt(indexS)) {
                    notFound = false;
                    ++totalFoundLetters;
                    break;
                }
            }
            endInSourceReached = notFound;
            subsequencies += (endInSourceReached || totalFoundLetters == target.length()) ? 1 : 0;
        }
        return subsequencies;
    }

    private boolean sourceHasAllUniqueLettersThatTargetHas(String source, String target) {
        boolean[] uniqueLettersInSource = new boolean[ALPHABET_SIZE];

        for (char letter : source.toCharArray()) {
            uniqueLettersInSource[letter - 'a'] = true;
        }

        for (char letter : target.toCharArray()) {
            if (!uniqueLettersInSource[letter - 'a']) {
                return false;
            }
        }
        return true;
    }
}
