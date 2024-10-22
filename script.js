function exportToExcel() {
    // Get form data
    const formData = {
        firstname: document.getElementById('firstname').value,
        middlename: document.getElementById('middlename').value,
        lastname: document.getElementById('lastname').value,
        course: document.getElementById('course').value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        phone: document.getElementById('phone').value,
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

    if (!validatePhone(formData.phone)) {
        alert('Please enter a valid 10-digit phone number.');
        return;
    }

    // Validate passwords
    if (!validatePassword(formData.password)) {
        alert('Password must be at least 8 characters long.');
        return;
    }

    // Ensure passwords match
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
        ["Phone", formData.phone],
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

// Email validation function
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email); // Corrected logic
}

// Phone validation function (10 digits)
function validatePhone(phone) {
    const phonePattern = /^[0-9]{10}$/; // Corrected pattern
    return phonePattern.test(phone);
}

// Password validation function (at least 8 characters)
function validatePassword(password) {
    return password.length >= 8; // Password should be at least 8 characters long
}
