/**
 * resize.c
 *
 * Computer Science 50
 * Problem Set 5
 *
 * Resizes a BMP by a factor of n, and outputs it.
 */
       
#include <stdio.h>
#include <stdlib.h>

#include "bmp.h"

int main(int argc, char* argv[])
{
    // ensure proper usage
    if (argc != 4)
    {
        printf("Usage: ./resize n infile outfile\n");
        return 1;
    }

    // remember filenames
    int factor_n = atoi(argv[1]);
    char* infile = argv[2];
    char* outfile = argv[3];
    
    if ((factor_n < 1) || (factor_n > 100))
    {
        printf("n, the resize factor, must satisfy 0 < n <= 100. \n");
        return 1;
    }

    // open input file 
    FILE* inptr = fopen(infile, "r");
    if (inptr == NULL)
    {
        printf("Could not open %s.\n", infile);
        return 2;
    }

    // open output file
    FILE* outptr = fopen(outfile, "w");
    if (outptr == NULL)
    {
        fclose(inptr);
        fprintf(stderr, "Could not create %s.\n", outfile);
        return 3;
    }

    // read infile's BITMAPFILEHEADER
    BITMAPFILEHEADER bf;
    fread(&bf, sizeof(BITMAPFILEHEADER), 1, inptr);
    BITMAPFILEHEADER o_bf = bf;

    // read infile's BITMAPINFOHEADER
    BITMAPINFOHEADER bi;
    fread(&bi, sizeof(BITMAPINFOHEADER), 1, inptr);
    BITMAPINFOHEADER o_bi = bi;
    
    // ensure infile is (likely) a 24-bit uncompressed BMP 4.0
    if (bf.bfType != 0x4d42 || bf.bfOffBits != 54 || bi.biSize != 40 || 
        bi.biBitCount != 24 || bi.biCompression != 0)
    {
        fclose(outptr);
        fclose(inptr);
        fprintf(stderr, "Unsupported file format.\n");
        return 4;
    }

    //update bfSize, biwidth, biHeight, bisizeimage
    o_bi.biWidth = bi.biWidth * factor_n;
    o_bi.biHeight = -(o_bi.biWidth);
    int o_padding = (4 - (o_bi.biWidth * sizeof(RGBTRIPLE)) % 4) % 4; 
    o_bf.bfSize = bf.bfOffBits + (o_bi.biWidth * o_bi.biWidth * 3) + (o_padding * o_bi.biWidth);
    o_bi.biSizeImage = (o_bi.biWidth * o_bi.biWidth * 3) + (o_padding * o_bi.biWidth);
     
    // write outfile's BITMAPFILEHEADER
    fwrite(&o_bf, sizeof(BITMAPFILEHEADER), 1, outptr);

    // write outfile's BITMAPINFOHEADER
    fwrite(&o_bi, sizeof(BITMAPINFOHEADER), 1, outptr);

    //create outbuffer array
    RGBTRIPLE outbuff[ (factor_n * o_bi.biWidth) + (o_padding * o_bi.biWidth) ];

    // determine padding for scanlines
    int padding =  (4 - (bi.biWidth * sizeof(RGBTRIPLE)) % 4) % 4;

    // iterate over infile's scanlines
    for (int i = 0, biHeight = abs(bi.biHeight); i < biHeight; i++)
    {
        
        int outbuff_index = 0;
        // get a scanline and copy it by factor n into an array
        for (int j = 0; j < bi.biWidth; j++)
        {
            // temporary storage
            RGBTRIPLE triple;

            // read RGB triple from infile
            fread(&triple, sizeof(RGBTRIPLE), 1, inptr);
            for(int ci=0; ci < factor_n; ci++)
            {
                outbuff[outbuff_index++] = triple;
            }

            // write RGB triple to outfile
//            fwrite(&triple, sizeof(RGBTRIPLE), 1, outptr);
        }

        // skip over padding, if any
        fseek(inptr, padding, SEEK_CUR);

        //write array into outfile factor_n times
        
        for(int out_i = 0; out_i < factor_n; out_i++)
        {
            int out_j = 0;
            while(out_j < outbuff_index)
            {
                fwrite(&outbuff[out_j++], sizeof(RGBTRIPLE), 1, outptr);
            }
            // then add padding
            for (int k = 0; k < o_padding; k++)
            {
                fputc(0x00, outptr);
            }
        }
    }

    // close infile
    fclose(inptr);

    // close outfile
    fclose(outptr);

    // that's all folks
    return 0;
}
