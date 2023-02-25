const form = document.querySelector("form");
const userData = JSON.parse(localStorage.getItem("userData")) || [];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = form.email.value;
  const password = form.password.value;

  const user = userData.find((user) => user.email === email);

  if (!user || user.password !== password) {
    alert("Invalid email or password");
    return;
  } else {
    const token = generateToken();

    user.token = token;

    const index = userData.indexOf(user);
    userData[index] = user;

    localStorage.setItem("userData", JSON.stringify(userData));

    const currentUser = { email: user.email, name: user.fullName, token };
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    window.location.href = "dashboard.html";
  }
});

function generateToken() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 16; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}
