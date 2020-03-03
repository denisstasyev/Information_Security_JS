# Description of cryptographic algorithms

## Caesar cipher

The cipher is based on a shift in the order of characters by the key value. In this implementation, it is possible to encrypt/decrypt any Unicode characters (including hieroglyphs and emoticons). It shifts the serial number in the unicode table. The shift is performed in the ring modulo 1114112, since the Unicode space represents the values from 0 to 1,114,111 (0x10FFFF).

![alt text][ceasercipher_logo]

## Monoalphabetic cipher

The idea of a cipher is similar to Caesar's cipher, however, as a key, it is possible to use not only integer values, but also strings. In this case, the key value is formed as the sum of the Unicode character numbers from the key string.

## Polyalphabetic (Vigenère) cipher

For encryption (operate with [unicode numbers](https://unicode-table.com)):

![alt text][bigramencrypt]

Where n = 1114112 (power of Unicode space), m[i] - char of message, c[i] - char of ciphertext, k[i] - char of key material, obtained by cyclic repetition of the key line. More detailed [description](https://en.wikipedia.org/wiki/Vigenère_cipher)

For decryption (operate with [unicode numbers](https://unicode-table.com)):

![alt text][bigramdecrypt]

## Bigram (Porta's with an additional shift) cipher

This cipher is based on the sequential replacement of pairs of characters from plaintext in accordance with the replacement table. Below is an example of a table for the Cyrillic alphabet, however, in this implementation, a table of size 1114112 x 1114112 is used. An additional shift of values is implemented as in the monoalphabetic cipher.

![alt text][bigramcipher_logo]

[ceasercipher_logo]: https://cdncontribute.geeksforgeeks.org/wp-content/uploads/ceaserCipher-1.png
[bigramcipher_logo]: https://sites.google.com/site/anisimovkhv/_/rsrc/1385774017706/learning/kripto/lecture/tema4/shifr_porta.png
[bigramencrypt]: https://latex.codecogs.com/gif.latex?%24%24c%5Bi%5D%20%5Cequiv%20m%5Bi%5D%20+%20k%5Bi%5D%20%5Cpmod%20n%24%24
[bigramdecrypt]: https://latex.codecogs.com/gif.latex?%24%24m%5Bi%5D%20%5Cequiv%20c%5Bi%5D%20+%20n%20-%20k%5Bi%5D%20%5Cpmod%20n%24%24
