const signUp = document.getElementById("signUp");
const signIn = document.getElementById("signIn");
const container = document.getElementById("container");
const signUpBtn = document.getElementById("signUpBtn");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const apiUrl = `http://localhost:6565/api/auth`
signUp.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signIn.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

function login() {
  const loginDetails = {
    email: loginEmail.value,
    password: loginPassword.value,
  };
  axios
    .post("http://localhost:6565/api/auth/login", loginDetails)
    .then((result) => {
      console.log(result);
      localStorage.setItem("token", result.data.token);
      //window.location.href = "/expense";
    })
    .catch((error) => {
      if (error.response) {
        const errorMessage = error.response.data.message;
        alert(errorMessage);
      } else {
        alert("An error occurred. Please try again later.");
      }
    });
}
async function  register() {
  const registerDetails = {
    username: username.value,
    email: email.value,
    password: password.value,
  };
  const result = await axios.post('http://localhost:6565/api/auth/register', registerDetails);
  console.log(result);
}
loginBtn.addEventListener("click", login);
signUpBtn.addEventListener("click", register);
