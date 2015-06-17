/**
 * recover.c
 *
 * Computer Science 50
 * Problem Set 5
 *
 * Recovers JPEGs from a forensic image.
 */
#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

typedef uint8_t  BYTE;

#define TRUE 1
#define FALSE 0

int main(int argc, char* argv[])
{
    // TODO
    FILE *inptr = fopen("card.raw","r");
    if(inptr == NULL)
    {
        printf("Could not open card.raw\n");
        return 1;
    }
    
    BYTE buffer[512];  //read-in buffer
    int fnum = 0;      // # of jpg files created
    int write_file_open = FALSE;
    int start_of_jpg = FALSE;
    char fname[10];    //current filename
    FILE *outptr;   //pointer to outfile
    while(fread(&buffer,sizeof(buffer),1,inptr) == 1)
    {
        if(buffer[0] == 0xff && buffer[1] == 0xd8 && buffer[2] == 0xff && buffer[3] == 0xe0)
            start_of_jpg = TRUE;
        else
        if(buffer[0] == 0xff && buffer[1] == 0xd8 && buffer[2] == 0xff && buffer[3] == 0xe1)
            start_of_jpg = TRUE;
        else
            start_of_jpg = FALSE;
            
        //if (start_of_jpg)
        //    printf("Jpeg : %03d.jpg\n",++fnum);
            
        if(start_of_jpg && !write_file_open)//new jpg & no outfile currently open
        {
            sprintf(fname,"%03d.jpg",fnum++);//create jpg filename
           
            outptr = fopen(fname,"w");       //open new jpg
            if(outptr == NULL)
            {
                printf("Could not create %s\n",fname);
                fclose(inptr);
                return 2;
            }
            write_file_open = TRUE;
            fwrite(&buffer,sizeof(buffer),1,outptr);       //write to new jpg file 
        }
        else
        if(start_of_jpg && write_file_open) //new jpg && an outfile is currently being written to
        {
            fclose(outptr); //close current jpg
            sprintf(fname,"%03d.jpg",fnum++); //create new jpg filename
            outptr = fopen(fname,"w");  //open new jpg
            if(outptr == NULL)
            {
                printf("Could not create %s\n",fname);
                fclose(inptr);
                return 2;
            }
            fwrite(&buffer,sizeof(buffer),1,outptr);  //write buffer into the new jpg file
        
        }
        else
        if(!start_of_jpg && write_file_open)// not new jpg && an outfile is currently being written to
        {
            fwrite(&buffer,sizeof(buffer),1,outptr);    //write buffer into jpg file
        }
        else
        {
            //if !start_of_jpg && !write_file_open, do nothing
        }
        
    }//while fread
    fclose(inptr);
    fclose(outptr);
    return 0;
    
    
  
    
    
}
