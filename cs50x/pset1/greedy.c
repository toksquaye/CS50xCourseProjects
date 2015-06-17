/*
 Tokunbo Quaye
 Problem Set 1
 greedy.c
 */
 
 #include <math.h>
 #include <stdio.h>
 #include "cs50.h"
 
 #define TRUE 1
 #define FALSE 0
 
 int main(void)
 {
     float change;
     int round_change, remain_change, coins;
     bool valid_change = FALSE;
     do
     {
     
         printf("o hai!  How much change is owed? \n");
         change = GetFloat();
         round_change = round(change*100);
         if (round_change >= 0)
             valid_change = TRUE;
     }
     while( valid_change == FALSE );
     
     coins = 0; remain_change = round_change;

     // calculate # of coins
     while ( remain_change > 0 )
         {
             // if remaining change >= quarter, calculate        
             if (remain_change >= 25)
             {
                 coins = coins + (remain_change / 25);
                 remain_change = remain_change % 25;
             }
             else
             // if remaining change >= dime, calculate
             if (remain_change >= 10)
             {
                 coins = coins + (remain_change / 10);
                 remain_change = remain_change % 10;
             }
             else
             // if remaining change >= nickel, calculate
             if (remain_change >= 5)
             {
                 coins = coins + (remain_change / 5);
                 remain_change = remain_change % 5;
             }
             else
             // if remaining change >= penny, calculate
             if (remain_change >= 1)
             {
                 coins = coins + (remain_change / 1);
                 remain_change = remain_change % 1;
             }
             
             
        }//while remain_change > 0
        
        printf("%d\n",coins);
     return 0;
 
 
 }// int main()
