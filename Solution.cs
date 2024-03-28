
using System;

public class Solution
{
    private static readonly int ALPHABET_SIZE = 26;
    private static readonly int CAN_NOT_FORM_TARGET_FROM_SOURCE = -1;

    public int ShortestWay(string source, string target)
    {
        if (!sourceHasAllUniqueLettersThatTargetHas(source, target))
        {
            return CAN_NOT_FORM_TARGET_FROM_SOURCE;
        }

        int subsequencies = 0;
        int totalFoundLetters = 0;
        bool endInSourceReached = true;
        int indexS = 0;

        for (int indexT = 0; indexT < target.Length && totalFoundLetters < target.Length; indexT += !endInSourceReached ? 1 : 0)
        {
            bool notFound = true;
            for (indexS = !endInSourceReached ? indexS + 1 : 0; indexS < source.Length; ++indexS)
            {
                if (target[indexT] == source[indexS])
                {
                    notFound = false;
                    ++totalFoundLetters;
                    break;
                }
            }
            endInSourceReached = notFound;
            subsequencies += (endInSourceReached || totalFoundLetters == target.Length) ? 1 : 0;
        }
        return subsequencies;
    }

    private bool sourceHasAllUniqueLettersThatTargetHas(String source, String target)
    {
        bool[] uniqueLettersInSource = new bool[ALPHABET_SIZE];

        foreach (char letter in source)
        {
            uniqueLettersInSource[letter - 'a'] = true;
        }

        foreach (char letter in target)
        {
            if (!uniqueLettersInSource[letter - 'a'])
            {
                return false;
            }
        }
        return true;
    }
}
