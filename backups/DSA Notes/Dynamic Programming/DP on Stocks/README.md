### Rewrite all space optimized solutions for all stocks problems.

# Best Time to buy and sell stock



![](../../../assets/3760eb7a-3bc3-80b6-bd45-df42b65a5cdc.png)


![](../../../assets/3760eb7a-3bc3-8001-bcab-fed833939a76.png)

## Code


![](../../../assets/3760eb7a-3bc3-80ae-b7de-faf48ac5057d.png)

## Why DP ?

Because DP basically just means remembering the past.

# Best Time to Buy and Sell Stock II



![](../../../assets/3760eb7a-3bc3-80bc-bcfc-d5cd9010a298.png)

- Since now there are many ways of buying and selling, hence we have to explore all ways, therefore recursion comes into action.
- At every index, we need to know whether we have bought/sold this stock or not ??
- For this we carry another variable `buy` which tells whether we can buy a stock at the current day or not ??
## How to write recurrence ?


![](../../../assets/3760eb7a-3bc3-8047-a69e-d83b2ec660c9.png)


![](../../../assets/3760eb7a-3bc3-80cb-95cf-fb5506f2480f.png)

## Memoization


![](../../../assets/3760eb7a-3bc3-8018-81da-f3a7a57be7eb.png)

## Tabulation


![](../../../assets/3760eb7a-3bc3-80cc-b9d7-ce6b0efc3cb2.png)

## Space Optimization


![](../../../assets/3760eb7a-3bc3-80d0-9357-e99ca4f1d0aa.png)

## Similar Space Optimized 


![](../../../assets/3760eb7a-3bc3-80a8-b879-fa0f0222740b.png)

