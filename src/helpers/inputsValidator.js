const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const isPasswordInvalid = (password) => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[.!@#$%^&*()_+\-=<>?]/.test(password);
  const isLengthValid = password.length >= 8;

  return !(hasUppercase && hasLowercase && hasDigit && hasSpecialChar && isLengthValid);
};

export const signUpValidator = (
  name,
  lastname,
  email,
  password,
  repeatpassword,
  setBlanksToFill,
  setEmailError,
  setPasswordError,
  setMatchesPassword
) => {
  const hasEmptyFields = name === '' || lastname === '' || email === '' || password === '';
  setBlanksToFill(hasEmptyFields);

  const isEmailInvalid = !emailRegex.test(email);
  setEmailError(isEmailInvalid);

  setPasswordError(isPasswordInvalid(password));

  const doesPasswordMatch = repeatpassword === password;
  setMatchesPassword(doesPasswordMatch);
};

export const loginValidator = (email, password, setBlanksToFill, setEmailError, setPasswordError) => {
  email == '' && password == '' ? setBlanksToFill(true) : setBlanksToFill(false);

  !emailRegex.test(email) ? setEmailError(true) : setEmailError(false);

  isPasswordInvalid(password) ? setPasswordError(true) : setPasswordError(false);
};
