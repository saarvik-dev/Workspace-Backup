**1. The Complexity Problem**
Your current solution uses two nested loops to check every single possible substring.
• **Time Complexity:** $O(n^2)$, where $n$ is the length of the string.
• **The Issue:** If the input string `s` has a length of $10^5$, your code will perform roughly $10^{10}$ operations. Most competitive programming platforms have a limit of $10^8$ operations per second, meaning this will result in a **Time Limit Exceeded (TLE)** error.

