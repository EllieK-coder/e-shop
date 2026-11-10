// Shared by every page: shows Login/Register or "Hi, name · Logout" in the navbar.
const authLinks = document.querySelector("#auth-links");

async function getCurrentUser() {
   const response = await fetch("api/me.php");
     return response.json();
}

async function logout(event) {
  event.preventDefault();
  await fetch("api/logout.php");
  window.location.href = "index.html";
}

async function renderAuthLinks() {
  if (!authLinks) return;

  try {
    const user = await getCurrentUser();

     if (user.loggedIn) { 
      authLinks.innerHTML = `
        <span class="user-name"></span>
        <a href="#" id="logout-link">Logout</a>
      `;
      authLinks.querySelector(".user-name").textContent = `Hi, ${user.name}`;
      authLinks.querySelector("#logout-link").addEventListener("click", logout);
    } else {
      authLinks.innerHTML = `
        <a href="login.html">Login</a>
        <a href="register.html">Register</a>
      `;
    }
  } catch (error) {
    console.error(error);
  }
}

renderAuthLinks();