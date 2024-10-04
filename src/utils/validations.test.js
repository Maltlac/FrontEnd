import { validateEmail, validatePostalCode, validateName } from './validations';

describe('Validation Functions', () => {
  test('validates correct email format', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
  });

  test('validates correct postal code format', () => {
    expect(validatePostalCode('75001')).toBe(true);
    expect(validatePostalCode('1234')).toBe(false);  // Trop court
    expect(validatePostalCode('7500a')).toBe(false);  // Contient des lettres
  });

  test('validates correct name format', () => {
    expect(validateName('John')).toBe(true);
    expect(validateName('John123')).toBe(false);  // Contient des chiffres
    expect(validateName('')).toBe(false);  // Vide
  });
});
