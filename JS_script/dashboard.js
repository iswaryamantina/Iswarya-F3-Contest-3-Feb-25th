const form = document.querySelector("#form");
const welcomeName = document.querySelector("#welcomeName");
const welcomeEmail = document.querySelector("#welcomeEmail");
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const userData = JSON.parse(localStorage.getItem("userData"));

if (!currentUser) {
  window.location.href = "login.html";
}

const user = userData.find((user) => user.email === currentUser.email);

welcomeName.textContent = `Welcome ${user.fullName}!`;
welcomeEmail.textContent = `Email: ${user.email}`;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const oldPassword = form.elements[0].value;
  const newPassword = form.elements[1].value;
  const confirmNewPassword = form.elements[2].value;

  if (oldPassword !== user.password) {
    alert("Old password is incorrect.");
    return;
  }

  if (newPassword !== confirmNewPassword) {
    alert("New password and confirm password do not match.");
    return;
  }

  userData.forEach((u) => {
    if (u.email === user.email) {
      u.password = newPassword;
    }
  });

  localStorage.setItem("userData", JSON.stringify(userData));
  alert("Password changed successfully.");

  form.reset();
});

const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", () => {
  window.location.href = "login.html";
});
