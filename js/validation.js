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

function liveValidate(input, validationFn, fieldName) {
const validations = {
  name: (value) => validateRequired(value, "Name"),
  email: (value) => validateRequired(value, "Email") || validateEmail(value),
  password: (value) => validateMinLength(value, 8, "Password"),
  "confirm-password": (value) =>
    validatePasswordsMatch(form.elements.password.value, value),
};
}

function validateForm(form, validations) {
  let isValid = true;
  for (const [inputName, validationFn] of Object.entries(validations)) {
    const input = form.elements[inputName];
    const errorMessage = validationFn(input.value, inputName);
    const errorElement = input.nextElementSibling;
    errorElement.textContent = errorMessage;

    if (errorMessage) {
      isValid = false;
    }
  }

  return isValid;
}

// Reusable validation rules. Each returns an error message, or "" if valid.
// They take plain values, not page elements, so any page can reuse them.

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

/* ===== Password strength ===== */

function getPasswordChecks(password) {
  return {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
}

// 0–5: how many of the checks pass
function getPasswordStrength(password) {
  return Object.values(getPasswordChecks(password)).filter(Boolean).length;
}

function validateStrongPassword(password) {
  const labels = {
    length: "8+ characters",
    upper: "an uppercase letter",
    lower: "a lowercase letter",
    number: "a number",
    special: "a special character",
  };

  const checks = getPasswordChecks(password);
  const missing = Object.keys(checks)
    .filter((key) => !checks[key])
    .map((key) => labels[key]);

  return missing.length === 0 ? "" : `Password needs ${missing.join(", ")}.`;
}