const form = document.querySelector("#login-form");
const formMessage = document.querySelector("#form-message");
const submitButton = form.querySelector(".submit-btn");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  formMessage.textContent = "";

  const email = form.elements.email.value.trim();
  const password = form.elements.password.value;

  // Quick checks in the browser, before bothering the server.
  const error =
    validateRequired(email, "Email") ||
    validateEmail(email) ||
    validateRequired(password, "Password");

  if (error) {
    formMessage.textContent = error;
    return;
  }

  submitButton.disabled = true;

  try {
    const response = await fetch("api/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      window.location.href = "index.html";
    } else {
      formMessage.textContent = result.error;
    }
  } catch (err) {
    console.error(err);
    formMessage.textContent = "Could not reach the server. Please try again.";
  } finally {
    submitButton.disabled = false;
  }
});