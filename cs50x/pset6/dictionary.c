/****************************************************************************
 * dictionary.c
 *
 * Computer Science 50
 * Problem Set 6
 *
 * Implements a dictionary's functionality.
 ***************************************************************************/

#include <ctype.h>
#include <stdbool.h>

#include "dictionary.h"


int word_count = 0;

/**
 * Returns true if word is in dictionary else false.
 */
bool check(const char* word)
{
    int word_length = strlen(word);
    trie_node *traverse = root_node;
    for(int i=0; i < word_length; i++)
    {
        int index = char_to_index(tolower(word[i]));
        if(!traverse->children[index])
            return false;
        traverse = traverse->children[index];    
    }
    if(traverse)
        return traverse->is_word;
    return false;
}

/**
 * Loads dictionary into memory.  Returns true if successful else false.
 */
bool load(const char* dictionary)
{
    // TODO
    char a_word[LENGTH + 2]; //allot for null character & newline 
    initialize_root_node();
    FILE *inptr = fopen(dictionary,"r");
    if (inptr == NULL)
    {
        printf("Could not open %s \n",dictionary);
        return false;
    }
    
    while(fgets(a_word,sizeof(a_word),inptr))
    {
      //printf("%s, %d",a_word,strlen(a_word));
      trie_insert(a_word);
      word_count++;
    }
    fclose(inptr);
    return true;
}

/**
 * Returns number of words in dictionary if loaded else 0 if not yet loaded.
 */
unsigned int size(void)
{
    // TODO
    return word_count;
}

/**
 * Unloads dictionary from memory.  Returns true if successful else false.
 */
bool unload(void)
{
    // TODO
    return free_trie_node(root_node);
 
}

trie_node *get_node()
{
    trie_node *node = malloc(sizeof(trie_node));
    
    if(node)
    {
        node->is_word = false;
        for(int i=0; i < c_count; i++)
            node->children[i] = NULL;
    }
    
    return node;

}

void initialize_root_node()
{
    root_node = get_node();

}

int char_to_index(char value)
{
    if (value == '\'')
        return 26; 
      
    return (int)value - (int)'a';       
}


void trie_insert(char *key)
{

    int word_length = strlen(key) - 1; //minus the newline char

    trie_node *traverse = root_node; int child_index;
    for(int i =0; i < word_length; i++)
    {        
        child_index = char_to_index(key[i]);   //get index of current char
        
        if(!traverse->children[child_index])
            traverse->children[child_index] = get_node();
        traverse = traverse->children[child_index];        
    }
    traverse->is_word = true;

}

bool free_trie_node(trie_node *node)
{
    trie_node *traverse = node;
    for(int i = 0; i < c_count; i++)
    {
        if (traverse->children[i])
            free_trie_node(traverse->children[i]);
    }
    free(traverse);
    return true;
    
}
