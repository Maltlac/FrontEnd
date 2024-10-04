export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePostalCode = (postalCode) => {
  return /^[0-9]{5}$/.test(postalCode);
};

export const validateName = (name) => {
  return /^[a-zA-ZÀ-ÿ '-]+$/.test(name);
};
