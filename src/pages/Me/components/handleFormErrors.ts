const handleFormErrors = (errors) => {
    let errorMessage = '';
    if (errors.name?.type === 'required') {
      errorMessage += "Please enter a name. ";
    }
    if (errors.email?.type === 'required') {
      errorMessage += "Please enter an email. ";
    }
    if (errors.password?.type === 'required') {
      errorMessage += "Please enter a password. ";
    }
    if (errors.password?.type === 'minLength') {
      errorMessage += "Password must be at least 8 characters long. ";
    }
  
    return {
      message: errorMessage,
      type: 'error'
    };
  };
  
  export default handleFormErrors;
  