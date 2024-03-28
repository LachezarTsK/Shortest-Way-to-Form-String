
#include <array>
#include <string>
#include <string_view>
using namespace std;

class Solution {

    static const int ALPHABET_SIZE = 26;
    static const int CAN_NOT_FORM_TARGET_FROM_SOURCE = -1;

public:
    int shortestWay(const string& source, const string& target) const {
        if (!sourceHasAllUniqueLettersThatTargetHas(source, target)) {
            return CAN_NOT_FORM_TARGET_FROM_SOURCE;
        }

        int subsequencies = 0;
        int totalFoundLetters = 0;
        bool endInSourceReached = true;
        size_t indexS = 0;

        for (size_t indexT = 0; indexT < target.length() && totalFoundLetters < target.length(); indexT += !endInSourceReached ? 1 : 0) {

            bool notFound = true;
            for (indexS = !endInSourceReached ? indexS + 1 : 0; indexS < source.length(); ++indexS) {
                if (target[indexT] == source[indexS]) {
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

private:
    bool sourceHasAllUniqueLettersThatTargetHas(string_view source, string_view target) const{
        array<bool, ALPHABET_SIZE> uniqueLettersInSource{};

        for (const auto& letter : source) {
            uniqueLettersInSource[letter - 'a'] = true;
        }

        for (const auto& letter : target) {
            if (!uniqueLettersInSource[letter - 'a']) {
                return false;
            }
        }
        return true;
    }
};
