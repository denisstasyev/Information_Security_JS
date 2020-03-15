# Description of block cryptographic algorithms

## AES - Advanced Encryption Standard

This project includes some versions of AES-256, such as:

- ECB
- CBC
- CTR
- CFB

### ECB - Electronic Codebook (NOT recommended)

This mode is **not** recommended. Since, for a given key, the same plaintext block in produces the same ciphertext block out, this mode of operation can leak data, such as patterns. For more details and examples, see the Wikipedia article, [Electronic Codebook](http://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Electronic_Codebook_.28ECB.29).

### CBC - Cipher-Block Chaining (recommended)

### CTR - Counter (recommended)

### CFB - Cipher Feedback
