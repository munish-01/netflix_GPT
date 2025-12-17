const checkValidData = (name, email, password, isSignIn) => {
  const errors = {};

  // const isNameValid = /^[a-zA-Z\s\-]+$/.test(name);

  const isEmailValid = /^[\w\-\.]+@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}$/.test(email);

  const isPasswordValid =
    /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(password);

  // Name validation (only for Sign Up)
  if (!isSignIn) {
    if (!name || name.trim().length < 3) {
      errors.name = "*Name must be at least 3 characters";
    }
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (!isEmailValid) {
    errors.email = "*Email ID is not valid";
  }

  if (!password) {
    errors.password = "*Password is required";
  } else if (!isPasswordValid) {
    errors.password = "*Password is not valid! minimum 8 character required";
  }

  return errors; // empty object means no errors
};

export default checkValidData;
