// SignupValidation.js

const validation = (values) => {
    let error = {};
  
    const isValid = (value) => {
      return /^[a-zA-Z]+$/.test(value) || /^[0-9]+$/.test(value);
    };
  
    if (values.username.length > 3 && isValid(values.username)) {
      error.username = "";
    } else {
      error.username = "Username must have a length greater than 3 and contain letters (a-z,A-Z) and digits (0-9).";
    }
  
    if (values.password.length > 3 && isValid(values.password)) {
      error.password = "";
    } else {
      error.password = "Password must have a length greater than 3 and contain letters (a-z,A-Z) and digits (0-9).";
    }
  
    return error;
  };
  
  export default validation;
  