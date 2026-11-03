// Reusable validation rules. Each returns an error message, or "" if valid.
// The same rules must also be checked on the server (PHP).

function validateRequired(value, fieldName) {
  return value.trim() === "" ? `${fieldName} is required.` : "";
}

function validateEmail(value) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(value) ? "" : "Please enter a valid email address.";
}

function validateMinLength(value, min, fieldName) {
  return value.length >= min ? "" : `${fieldName} must be at least ${min} characters.`;
}

function validatePasswordsMatch(password, confirmPassword) {
  return password === confirmPassword ? "" : "Passwords do not match.";
}