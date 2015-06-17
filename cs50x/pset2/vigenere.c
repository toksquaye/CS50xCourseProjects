/* Tokunbo Quaye
 Problem Set 2
 vigenere.c
 */
 
 #include "cs50.h"
 #include <ctype.h>
 #include <stdio.h>
 #include <stdlib.h>
 #include <string.h>
 
 int main(int argc, string argv[])
 {
    string text;
    int i;
        
    if (argc == 2)
    {
    //extract key
        int key_length = strlen(argv[1]);
        int key_shift_array[key_length];

        i = 0;
        //populate an array of shift values based on the key
        while (i < key_length)
        {
            if (isalpha(argv[1][i]))
            {
                if (isupper(argv[1][i]))
                    key_shift_array[i] = argv[1][i] - 65;
                else
                    key_shift_array[i] = argv[1][i] - 97;
                i++;
            }
            else
            {
                printf("Keyword must only contain letters A-Z and a-z\n");
                return 1;
            }
        }
        

        text = GetString();
        
        int text_length = strlen(text);
        int index = 0; int con_index = 0;
        while (index < text_length)
        {
            if(isalpha(text[index])) //if it's an alphabet
            {
                if(isupper(text[index]))// then if it's upper case, encrypt
                {
                    int temp = ((text[index] - 65) + key_shift_array[con_index % key_length]) % 26;
                    text[index]= temp + 65; 
                    index++;            //increment to next character
                }
                else
                if (islower(text[index]) ) // else if it's lower case, encrypt
                {
                    int temp = ((text[index] - 97) + key_shift_array[con_index % key_length]) % 26;
                    text[index] = temp + 97;
                    index++;            //increment t next character
                }
                con_index++;
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
