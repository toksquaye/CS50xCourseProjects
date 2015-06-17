/****************************************************************************
 * dictionary.h
 *
 * Computer Science 50
 * Problem Set 6
 *
 * Declares a dictionary's functionality.
 ***************************************************************************/

#ifndef DICTIONARY_H
#define DICTIONARY_H

#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// maximum length for a word
// (e.g., pneumonoultramicroscopicsilicovolcanoconiosis)
#define LENGTH 45



#define c_count 27

/**
 * Returns true if word is in dictionary else false.
 */
bool check(const char* word);

/**
 * Loads dictionary into memory.  Returns true if successful else false.
 */
bool load(const char* dictionary);

/**
 * Returns number of words in dictionary if loaded else 0 if not yet loaded.
 */
unsigned int size(void);

/**
 * Unloads dictionary from memory.  Returns true if successful else false.
 */
bool unload(void);

typedef struct trie_node
{
   bool is_word;
   struct trie_node *children[c_count];
}trie_node;

trie_node *root_node;


//creates and returns a node
trie_node *get_node();

//initialize root node
void initialize_root_node();

//insert word into trie
void trie_insert(char *key);

int char_to_index(char value);

bool free_trie_node(trie_node *node);


#endif // DICTIONARY_H
