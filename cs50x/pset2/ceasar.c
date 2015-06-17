/* Tokunbo Quaye
 Problem Set 2
 ceasar.c
 */
 
 #include "cs50.h"
 #include <ctype.h>
 #include <stdio.h>
 #include <stdlib.h>
 #include <string.h>
 
 int main(int argc, string argv[])
 {
    string text;
    if (argc == 2)
    {
    //extract key
        int key = atoi(argv[1]);
        text = GetString();
        if (!(isdigit(argv[1][1])))
        {
            printf("%s\n",text);
            return 0;
        }
        
        int length = strlen(text);
        int index = 0;
        while (index < length)
        {
            if(isalpha(text[index])) //if it's an alphabet
            {
                if(isupper(text[index]))// then if it's upper case, encrypt
                {
                    int temp = ((text[index] - 65) + key) % 26;
                    text[index]= temp + 65; 
                    index++;            //increment to next character
                }
                else
                if (islower(text[index]) ) // else if it's lower case, encrypt
                {
                    int temp = ((text[index] - 97) + key) % 26;
                    text[index] = temp + 97;
                    index++;            //increment t next character
                }
            }
            
            else index++;
        }
    }
    else
        {
        printf("argc: %d",argc); return 1;
        }
        
   printf("%s\n",text);
 }
