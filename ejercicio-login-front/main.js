const base_url = "http://localhost:3000"
/* Aquí el código anterior que ya tenían para el envio del formulario */

/* Buttons */
var buttons = document.querySelectorAll('.providers button');
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', login_provider_event);
}

function login_provider_event(event) {
  event.preventDefault();
  const provider = this.getAttribute("data-provider");
  window.location.href = `${base_url}/auth/${provider}`;
}

/* Obtenemos el token y lo mostramos en consola */
// Esta es la forma de saber que estamos loggeados
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const token = params.token;
console.log(params.token);
