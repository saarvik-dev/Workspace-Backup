https://youtu.be/IZP_8-JZqhM?si=6S1rC4bDXCeNjBjx

Binary Search on answers mein har baar range change karne ki koshish kro half space ko eliminate karke, waise hi jaise first time range nikali hogi usi criteria pe lower bound ya upper bound kaunsa change hoga decide kro 

Binary Search on answers is done by integrating the question algo inside the general layout of the binary search while loop.

 


| Feature | while (low < high) (Version 2) | while (low <= high) (Versions 1 & 3) |
| --- | --- | --- |
| Stopping Condition | Stops when low == high. | Stops when low > high. |
| Pointer Update | high = mid; (Keeps mid as a candidate). | high = mid - 1; (Discards mid after storing it). |
| Result | The answer is always low (or high). | The answer is usually stored in a separate variable (like smDiv) or ends up at low. |




| Version | Loop Type | Range Update | Logic Style |
| --- | --- | --- | --- |
| Version 1 | low <= high | high = mid - 1 | Standard template; assumes sumByD is defined elsewhere. |
| Version 2 | low < high | high = mid | Cleanest. Automatically narrows down to the smallest valid divisor. |
| Version 3 | low <= high | high = mid - 1 | Safest. Uses an explicit smDiv variable and if/else to avoid any possible math overflows. |



In in binary search for answers we create a while loop of binary loop and and that we calculate the algorithm whatever is required in another for and the condition we apply is we have a given range from like 1 to and we calculate this using algorithm and then do the binary search on that using the exact

