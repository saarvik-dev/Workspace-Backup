The best way to understand KMP is to think about **avoiding redundant work**. In a normal "Brute Force" search, if you fail a match, you go back to the very next character in the haystack and start all over. KMP says: "I've already seen these characters; I know where the next possible match could start."

This table tells the algorithm how many characters it can "skip" re-checking if a mismatch occurs.

