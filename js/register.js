const form = document.querySelector("#register-form");
const successMessage = document.querySelector("#form-success");

// Each rule takes only the value, so the loop can treat them all the same.
const validations = {
  name: (value) => validateRequired(value, "Name"),
  email: (value) => validateRequired(value, "Email") || validateEmail(value),
  password: (value) => validateStrongPassword(value),  "confirm-password": (value) =>
    validatePasswordsMatch(form.elements.password.value, value),
};

function validateField(inputName) {
  const input = form.elements[inputName];
  const errorMessage = validations[inputName](input.value);
  const errorElement = input.nextElementSibling;

  errorElement.textContent = errorMessage;
  input.classList.toggle("invalid", errorMessage !== "");
  input.classList.toggle("valid", errorMessage === "");

  return errorMessage;
}

function validateForm() {
  let isValid = true;

  for (const inputName of Object.keys(validations)) {
    if (validateField(inputName)) {
      isValid = false;
    }
  }

  return isValid;
}
function updateStrengthMeter(password) {
  const score = getPasswordStrength(password);
  const labels = ["", "Very weak", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "#b3403a", "#d9822b", "#d4b106", "#5a9e3a", "#2e7d4f"];

  strengthBar.style.width = `${score * 20}%`;
  strengthBar.style.background = colors[score];
  strengthLabel.textContent = password ? labels[score] : "";
}

// Live validation: check a field every time the user types in it.
// Live validation: check a field every time the user types in it.
for (const inputName of Object.keys(validations)) {
  form.elements[inputName].addEventListener("input", () => {
    validateField(inputName);

    // The confirm field depends on the password, so re-check it too.
    if (inputName === "password" && form.elements["confirm-password"].value) {
      validateField("confirm-password");
      for (const inputName of Object.keys(validations)) {
  form.elements[inputName].addEventListener("input", () => {
    validateField(inputName);

    if (inputName === "password") {
      updateStrengthMeter(form.elements.password.value);

      if (form.elements["confirm-password"].value) {
        validateField("confirm-password");
      }
    }
  });
}
    }
  });
}


form.addEventListener("submit", (event) => {
  event.preventDefault();
  successMessage.textContent = "";
const strengthBar = document.querySelector("#strength-bar");
const strengthLabel = document.querySelector("#strength-label");

  if (validateForm()) {
    successMessage.textContent = "Account created! (demo, nothing is saved yet)";
    form.reset();
        form.querySelectorAll("input").forEach((input) => input.classList.remove("valid", "invalid"));
            updateStrengthMeter("");
  }
});