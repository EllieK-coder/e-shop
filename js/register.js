const form = document.querySelector("#register-form");
const successMessage = document.querySelector("#form-success");
const strengthBar = document.querySelector("#strength-bar");
const strengthLabel = document.querySelector("#strength-label");
const submitButton = form.querySelector(".submit-btn");

// Each rule takes only the value, so the loop can treat them all the same.
const validations = {
  name: (value) => validateRequired(value, "Name"),
  email: (value) => validateRequired(value, "Email") || validateEmail(value),
  password: (value) => validateStrongPassword(value),
  "confirm-password": (value) =>
    validateRequired(value, "Confirm password") ||
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

function showFormMessage(text, isError) {
  successMessage.textContent = text;
  successMessage.style.color = isError ? "var(--color-danger)" : "var(--color-success)";
}

function resetForm() {
  form.reset();
  form.querySelectorAll("input").forEach((input) => input.classList.remove("valid", "invalid"));
  updateStrengthMeter("");
}

// Live validation: check a field every time the user types in it.
for (const inputName of Object.keys(validations)) {
  form.elements[inputName].addEventListener("input", () => {
    validateField(inputName);

    if (inputName === "password") {
      updateStrengthMeter(form.elements.password.value);

      // The confirm field depends on the password, so re-check it too.
      if (form.elements["confirm-password"].value) {
        validateField("confirm-password");
      }
    }
  });
}

// On submit: validate in the browser first, then send to the server.
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  showFormMessage("", false);

  if (!validateForm()) return;

  submitButton.disabled = true;

  try {
    const response = await fetch("api/register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.elements.name.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      showFormMessage("Account created! You can now log in.", false);
      resetForm();
    } else {
      showFormMessage(result.error, true);
    }
  } catch (error) {
    console.error(error);
    showFormMessage("Could not reach the server. Please try again.", true);
  } finally {
    submitButton.disabled = false;
  }
});