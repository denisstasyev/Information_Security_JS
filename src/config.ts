export const CIPHER_METHOD = 'cipher_algorithm';
// export const ENCRYPTED_DATA_CODES = 'encrypted_data_codes';
export const ENCRYPTED_DATA = 'encrypted_data';

export const CHECKSUM_METHOD = 'checksum_algorithm';
export const CHECKSUM_TEXT = 'checksum_text';
export const CHECKSUM_VALUE = 'checksum_value';

export const HASH_METHOD = 'hash_method';
export const HASH_VALUE = 'hash_value';

export const links = [
  { title: 'Зашифровать', href: '/encrypt/', isActive: true },
  { title: 'Расшифровать', href: '/decrypt/', isActive: true },
  { title: 'Посчитать контрольную сумму', href: '/checksum/', isActive: true },
  { title: 'Хешировать', href: '/hash/', isActive: true },
];
