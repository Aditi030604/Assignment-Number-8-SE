function exportToExcel() {
  // Get form data
  const formData = {
      firstname: document.getElementById('firstname').value,
      middlename: document.getElementById('middlename').value,
      lastname: document.getElementById('lastname').value,
      course: document.getElementById('course').value,
      gender: document.querySelector('input[name="gender"]:checked').value,
      phone: document.getElementById('phone').value,
      countryCode: document.getElementById('country_code').value,
      address: document.getElementById('address').value,
      email: document.getElementById('email').value,
      password: document.getElementById('psw').value,
      passwordRepeat: document.getElementById('psw-repeat').value
  };

  // Validate email and phone
  if (!validateEmail(formData.email)) {
      alert('Please enter a valid email address.');
      return;
  }

  if (!validatePhone(formData.phone, formData.countryCode)) {
      alert('Please enter a valid phone number.');
      return;
  }

  // Validate passwords
  if (!validatePassword(formData.password)) {
      alert('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
      return;
  }

  if (formData.password !== formData.passwordRepeat) {
      alert('Passwords do not match.');
      return;
  }

  // Convert the form data into an array format suitable for Excel
  const data = [
      ["Field", "Value"],
      ["Firstname", formData.firstname],
      ["Middlename", formData.middlename],
      ["Lastname", formData.lastname],
      ["Course", formData.course],
      ["Gender", formData.gender],
      ["Phone", formData.countryCode + " " + formData.phone],
      ["Address", formData.address],
      ["Email", formData.email],
      ["Password", formData.password]
  ];

  // Create a new workbook and add the data
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, "Registration");

  // Export the workbook to Excel
  XLSX.writeFile(wb, 'registration_data.xlsx');
}

// Enhanced Email validation function
function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,6}$/;
  return emailPattern.test(email);
}

// Enhanced Phone validation function (10 digits and country code)
function validatePhone(phone, countryCode) {
  // Ensure the phone is a 10-digit number and the country code is correct
  const phonePattern = /^[0-9]{10}$/;
  const validCountryCode = countryCode === "+91";  // Example: check for Indian country code
  return phonePattern.test(phone) && validCountryCode;
}

// Enhanced Password validation function
function validatePassword(password) {
  // Password should be at least 8 characters long, contain uppercase, lowercase, digit, and special character
  const passwordPattern = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
  return passwordPattern.test(password);
}