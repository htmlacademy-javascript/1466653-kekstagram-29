const isLengthValid = (string, number) => string.length <= number;

isLengthValid('', 3);

const isPalindrom = (string) => {
  const stringLowNoSpace = string.trim().toLowerCase().replaceAll(' ', '');
  const newString = stringLowNoSpace.split('').reverse().join('');

  return stringLowNoSpace === newString;
};

isPalindrom('Сколько Сколько');
isPalindrom('А роза упала на лапу Азора');
