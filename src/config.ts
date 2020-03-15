export const CIPHER_METHOD = 'cipher_algorithm';
// export const ENCRYPTED_DATA_CODES = 'encrypted_data_codes';
export const ENCRYPTED_DATA = 'encrypted_data';
export const ENCRYPTED_DATA_BASE64 = 'encrypted_data_base64';
export const INITIALIZATION_VECTOR = 'initialization_vector';

// The initialization vector (must be 16 bytes)
export const iv = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

export const CHECKSUM_METHOD = 'checksum_algorithm';
export const CHECKSUM_TEXT = 'checksum_text';
export const CHECKSUM_VALUE = 'checksum_value';

export const HASH_METHOD = 'hash_method';
export const HASH_VALUE = 'hash_value';
export const HASH_VALUE_BASE64 = 'hash_value_base64';

export const mainLinks = [
  { title: 'Зашифровать', href: '/encrypt/', isActive: true },
  { title: 'Расшифровать', href: '/decrypt/', isActive: true },
  { title: 'Посчитать контрольную сумму', href: '/checksum/', isActive: true },
  { title: 'Хешировать', href: '/hash/', isActive: true },
];

export const allLinks = [
  { title: 'Простое шифрование', href: '/encrypt/basic/', isActive: true },
  { title: 'Расшифрование простого', href: '/decrypt/basic/', isActive: true },
  { title: 'Блочное шифрование', href: '/encrypt/block/', isActive: true },
  { title: 'Расшифрование блочного', href: '/decrypt/block/', isActive: true },
  { title: 'Контрольная сумма', href: '/checksum/', isActive: true },
  { title: 'Хеширование', href: '/hash/', isActive: true },
];
