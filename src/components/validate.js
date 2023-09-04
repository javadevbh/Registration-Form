export const validate = (data, type) => {
  const errors = {};
  if (!data.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email address is invalid";
  } else {
    delete errors.email;
  }

  if (!data.password.trim()) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password needs to be 6 character or more";
  } else {
    delete errors.password;
  }

  if (type === "SignUp") {
    if (!data.name.trim()) {
      errors.name = "Name is required";
    } else {
      delete errors.name;
    }

    if (!data.ConfirmPassword.trim()) {
        errors.ConfirmPassword = "Confirm Password is required";
      } else if (data.ConfirmPassword !== data.password) {
        errors.ConfirmPassword = "Password do not match";
      } else {
        delete errors.ConfirmPassword;
      }
    
      if (!data.isAccepted) {
        errors.isAccepted = "Accept our regulations";
      } else {
        delete errors.isAccepted;
      }
  }
  
  return errors;
};
