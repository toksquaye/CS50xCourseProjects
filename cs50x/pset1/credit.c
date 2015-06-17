/* Tokunbo Quaye
   CS50
   Problem Set 1 - Hacker Edition
   
   credit.c
   
   
   This is a program that prompts the user for a credit card number and then reports (via printf) whether it is a valid
   AMEX, MasterCard of Visa card number.  The output should be AMEX\n or MASTERCARD\n or VISA\n or INVALID\n.
   
   American Express numbers all start with 34 or 37; MasterCard numbers all start with 51, 52, 53, 54, or 55; 
   and Visa numbers all start with 4. But credit card numbers also have a "checksum" built into them, 
   So what’s the secret formula? Well, most cards use an algorithm invented by Hans Peter Luhn, a nice fellow from IBM. 
   According to Luhn’s algorithm, you can determine if a credit card number is (syntactically) valid as follows:
   1.Multiply every other digit by 2, starting with the number's second-to-last digit, and then add those products' digits together.
   2.Add the sum to the sum of the digits that weren't multiplied by 2.
   3.If the total's last digit is 0 (or, put more formally, if the total modulo 10 is congruent to 0), the number is valid!

   */
   
   #include <cs50.h>
   #include <math.h>
   #include <stdio.h>
   
   #define INVALID 10
   #define AMEX 11
   #define MASTERCARD 12
   #define VISA 13
   
   #define FALSE 0
   #define TRUE 1
   
   bool validate(int *array, int length);
   
   int main(void)
   {
        
        long long credit_card_num, holder_num;
        int num_of_digits = 1;
        
        
        printf("Number: ");
        credit_card_num = GetLongLong();   
        num_of_digits = (int)log10(credit_card_num) + 1;
        
        //populate int array with credit_card_num
        int digit_array[num_of_digits]; int index;
      
        holder_num = credit_card_num; index = 0;
        while(holder_num > 0)
        {
            digit_array[index++] = holder_num % 10; //store last digit in array
            holder_num /= 10;
        }

//        int i;
//        for (i = 0; i < num_of_digits; i++)
//            printf("%d ",digit_array[i]);        

        int first_d, second_d;
        if(num_of_digits > 12)
        {
            first_d = digit_array[num_of_digits -1];
            second_d = digit_array[num_of_digits - 2];
        }

//        printf("num_of_digits %d",num_of_digits);

        switch (num_of_digits)
        {//switch
            case 15:
                //first_d = digit_array[14];
                //second_d = digit_array[13];

//                printf("***%d, %d\n", first_d, second_d);
                // if first two digits are 37 or 34 & Luhn's algorithm validates
                if( (first_d == 3) && ((second_d == 4) || (second_d == 7) ) && validate(digit_array, num_of_digits) )
                    printf("AMEX\n");
                else printf("INVALID\n");
                break;
                
            case 16 :
                if (first_d == 4)
                    {
                        if (validate(digit_array,num_of_digits))
                            printf("VISA\n");
                        else printf("INVALID\n");
                    }
                else
                if ((first_d == 5) && (second_d >=1) && (second_d <= 5))
                    {
                        if (validate(digit_array, num_of_digits))
                            printf("MASTERCARD\n");
                        else printf("INVALID\n");
                    }
                else
                    printf("INVALID\n");
                break;
                
            case 13 :
                    if (first_d == 4)
                    {
                        if (validate(digit_array,num_of_digits))
                            printf("VISA\n");
                        else printf("INVALID\n");
                    }
                    else printf("INVALID\n");

                break;
                
            default:
                printf("INVALID\n");
        
        
        }//switch
        
        
    }
        
        
bool validate(int *array, int length)
{

    int index = 1;      //array of digits index. start from the 2nd to last digit
    int temp = 0;
    int sum_of_digits = 0;
    
    while (index < length)
    {
        temp = array[index] * 2;    // multiply digit by 2
        //printf("temp: %d\n",temp);
        if (temp <= 9)
            sum_of_digits += temp;  // if the product is 1 digit, add it to the overall sum
        else
        {
            sum_of_digits += temp / 10; // if product is 2 digits, first add the 1st digit to the overall sum
            sum_of_digits += temp % 10; // then add 2nd digit to the overall sum
        }
        index += 2;                 // skip next number and go to the following one.
    
    }
    //printf("added products : %d\n",sum_of_digits);
    //now add on the digits that weren't multiplied by 2
    index = 0;
    while (index < length)
    {
        sum_of_digits += array[index];
        index += 2;
    }
    
    //printf("sum_of_digits : %d\n",sum_of_digits);
    
    if ((sum_of_digits % 10) == 0)
        return TRUE;
    else return FALSE;
}       
