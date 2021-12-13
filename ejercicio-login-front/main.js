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
localStorage.setItem('token', token);
console.log(params.token);

let productos_btn = document.getElementById('traerProductos')
productos_btn.addEventListener('click', traer_productos)

function traer_productos () {
  const url_productos = 'http://localhost:3000/productos'
  const local_token = localStorage.getItem('token')
  fetch(url_productos, {
    method: 'GET',
    headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${local_token}`
                },
  }
  )
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
}