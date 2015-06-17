/*
  Tokunbo Quaye
  Problem Set 1
  mario.c
  */
  
  #include <stdio.h>
  #include "cs50.h"
  
  #define FALSE 0
  #define TRUE 1

  int main ()
  {
  
      int pyramid_height = -1;
      bool valid_num = FALSE;
      int num_of_spaces, num_of_hash, line_num, index;
      
      // Get Pyramid Height from the user
      do
      {
          printf("Height: ");
          pyramid_height = GetInt();
          if( ( pyramid_height >= 0) && (pyramid_height <= 23) )
              valid_num = TRUE;
      } 
      while (valid_num == FALSE);
      
      // Print the Pyramid
      
      for (line_num = 0; line_num < pyramid_height; line_num++)
      {
          //print spaces
          num_of_spaces = pyramid_height - (line_num + 1);
          for (index = 0; index < num_of_spaces; index++)
              printf(" ");

          // print hashes
          num_of_hash = line_num + 2;
          for (index =0; index < num_of_hash; index++)
              printf("#");
             
          printf("\n");
                    
      }
      
  
      return 0;  
  }
