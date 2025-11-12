const updatePasswordForm = document.getElementById('updatePasswordForm');
const newPasswordInput = document.getElementById('newPassword');
const newPasswordErrMsg = document.getElementById('newPasswordErrMsg');
const confirmPasswordInput = document.getElementById('confirmPassword');
const confirmPasswordErrMsg = document.getElementById('confirmPasswordErrMsg');
const showPasswordCheckbox = document.getElementById('showPasswordCheckbox');

/**
 * Validates the new password input field for emptiness, length (>= 8), and complexity 
 * (at least one uppercase, one lowercase, one number, and one special character).
 * @returns {boolean} - true if valid, false otherwise.
 */
function validateNewPassword() {
    const passwordValue = newPasswordInput.value.trim();
    let errorMessage = '';

    // 1. Check for emptiness
    if (passwordValue === '') {
        errorMessage = 'New Password is required.';
    } 
    // 2. Check for minimum length (8 characters)
    else if (passwordValue.length < 8) {
        errorMessage = 'Password must be at least 8 characters long.';
    } 
    // 3. Check for complexity: Uppercase
    else if (!/[A-Z]/.test(passwordValue)) {
        errorMessage = 'Password must contain at least one uppercase letter.';
    }
    // 4. Check for complexity: Lowercase
    else if (!/[a-z]/.test(passwordValue)) {
        errorMessage = 'Password must contain at least one lowercase letter.';
    }
    // 5. Check for complexity: Number
    else if (!/[0-9]/.test(passwordValue)) {
        errorMessage = 'Password must contain at least one number.';
    }
    // 6. Check for complexity: Special Character
    else if (!/[^A-Za-z0-9]/.test(passwordValue)) {
        errorMessage = 'Password must contain at least one special character.';
    }

    // Update the error message element
    newPasswordErrMsg.textContent = errorMessage;

    return !errorMessage; // Returns true if errorMessage is empty, false otherwise
}

/**
 * Validates the confirm password field for emptiness and ensures it matches the new password.
 * @returns {boolean} - true if valid and matches, false otherwise.
 */
function validateConfirmPassword() {
    const confirmPasswordValue = confirmPasswordInput.value.trim();
    const newPasswordValue = newPasswordInput.value.trim();
    
    // 1. Check for emptiness
    if (confirmPasswordValue === '') {
        confirmPasswordErrMsg.textContent = 'Confirm Password is required.';
        return false;
    } 
    
    // 2. Check for password match
    else if (newPasswordValue !== confirmPasswordValue) {
        confirmPasswordErrMsg.textContent = 'Passwords do not match.';
        return false;
    }
    
    // Clear error message if all checks pass
    else {
        confirmPasswordErrMsg.textContent = '';
        return true;
    }
}

// Show/Hide Password function
showPasswordCheckbox.addEventListener('change', function() {
    const type = this.checked ? 'text' : 'password';
    newPasswordInput.type = type;
    confirmPasswordInput.type = type;
});

updatePasswordForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const isNewPasswordValid = validateNewPassword();
    const isConfirmPasswordValid = validateConfirmPassword(); 

    if (isNewPasswordValid && isConfirmPasswordValid) {
        alert('Password Update Successful (All Validations Passed)!');
        updatePasswordForm.reset();
    } else {
        console.log('Form submission blocked due to validation errors.');
    }
});
