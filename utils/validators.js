export const validateEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

export const validateAmount = (amount) => {
  return amount > 0;
};

export const validateRegister = ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email & Password required");
  }
};