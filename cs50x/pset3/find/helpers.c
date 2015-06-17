/**
 * helpers.c
 *
 * Computer Science 50
 * Problem Set 3
 *
 * Helper functions for Problem Set 3.
 */
       
#include <cs50.h>
#include <stdio.h>

#include "helpers.h"


bool binary_search(int value, int lo_index, int hi_index, int values[])
{

    int mid_index;
    if(lo_index <= hi_index)
    {   
        mid_index = (hi_index - lo_index)/2 + lo_index;
        
        if (values[mid_index] == value)
            return true;
        
        if (values[mid_index] > value)
            return binary_search(value, lo_index, mid_index-1,values);
        else
            return binary_search(value, mid_index+1, hi_index, values);
    }
    else
        return false; 

}
/**
 * Sorts array of n values.
 */
void sort(int values[], int n)
{
    // TODO: implement an O(n^2) sorting algorithm
    // Selection Sort
    int i,j,min;
    
    for(i=0; i < n-1; i++)
    {
        min = i;
        for(j=i+1; j< n; j++)
        {
            if( values[j] < values[min])
                min = j;
        }//for j
        if (min != i)
        {//swap
            int temp = values[min];
            values[min] = values[i];
            values[i] = temp;
        }
    }//for i = 0 to n-2
 
    return;
}

/**
 * Returns true if value is in array of n values, else false.
 */

bool search(int value, int values[], int n)
{
    // TODO: implement a searching algorithm
    
    return binary_search(value, 0, n-1, values);
   
        
}

