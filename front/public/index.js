import { getAll, erase, update, create } from "./services/usuariosService.js";
import { register, login } from "./services/authService.js";

//Botones del HTML, Divs, listado
const botonLista = document.getElementById("boton-listar");
const botonCrear = document.getElementById("boton-crear");
const botonLogin = document.getElementById("boton-login");
const botonRegister = document.getElementById("boton-register");
const botonCancelar = document.getElementById("boton-cancelar");

const Divs = {
  listar: document.getElementById("Listar"),
  crear: document.getElementById("Crear"),
  modificar: document.getElementById("Modificar"),
  login: document.getElementById("Login"),
  register: document.getElementById("Register"),
};

const listado = document.getElementById("lista");

//Formularios

const formCrear = document.getElementById("form-crear");
const formModificar = document.getElementById("form-modificar");
const formLogin = document.getElementById("form-login");
const formRegister = document.getElementById("form-register");


let isAuthenticated = Boolean(localStorage.getItem("token"));

//Ocultar / mostrar los divs

function ocultarDivs() {
  Object.values(Divs).forEach((div) => (div.style.display = "none"));
}
function cambiarDivs(div) {
  const d = Divs[div];
  const divActual = d.style.display === "block";
  ocultarDivs();
  if (!divActual) d.style.display = "block";
}

//Motsrar la lista de usuarios

async function mostrarListado() {
  try {
    const usuarios = await getAll();
    listado.innerHTML = usuarios
      .map(
        (u) => `
      <li data-id="${u.id_usuario}">
        ID: ${u.id_usuario} NOMBRE: ${u.nombre} APELLIDO: ${u.apellido } EDAD: ${u.edad} ROL: ${u.rol}
        <button class="boton-modificar" data-id="${u.id_usuario}" data-nombre="${u.nombre}" data-apellido="${u.apellido}" data-edad="${u.edad}">Editar</button>
        <button class="boton-borrar" data-id="${u.id_usuario}">Borrar</button>
      </li>`
      )
      .join("");
  } catch (err) {
    console.error("Error al listar:", err);
  }
}

//Abrir el formulario de editar con los datos.

function mostrarFormularioModificar(data) {
  formModificar.elements["id"].value = data.id;
  formModificar.elements["nombre"].value = data.nombre;
  formModificar.elements["apellido"].value = data.apellido;
  formModificar.elements["edad"].value = data.edad;
  formModificar.elements["rol"].value = data.rol;
  formModificar.elements["password"].value = data.password;
  cambiarDivs("modificar");
}

// Listener de los botones
botonLista.addEventListener("click", async () => {
  await mostrarListado();
  cambiarDivs("listar");
});

botonCrear.addEventListener("click", () => cambiarDivs("crear"));
botonLogin.addEventListener("click", () => cambiarDivs("login"));
botonRegister.addEventListener("click", () => cambiarDivs("register"));
botonCancelar.addEventListener("click", () => cambiarDivs("modificar"));

//Listener de los botones generados en la lista (Borrar y modificar)

listado.addEventListener("click", async (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const id = btn.dataset.id;
  if (btn.classList.contains("boton-modificar")) {
    mostrarFormularioModificar(btn.dataset);
    return;
  }
  if (btn.classList.contains("boton-borrar")) {
    if (confirm("¿Eliminar usuario?")) {
      try {
        await erase(Number(id));
        await mostrarListado();
      } catch (err) {
        console.error(err);
      }
    }
  }
});

//Listener del formulario crear

formCrear.addEventListener("submit", async (event) => {
  event.preventDefault();
  const nombre = formCrear.elements["nombre"].value;
  const apellido = formCrear.elements["apellido"].value;
  const edad = formCrear.elements["edad"].value ;
  const rol = formCrear.elements["rol"].value;
  const password = formCrear.elements["password"].value
  try {
    await create({ nombre, apellido, edad, rol, password });
    formCrear.reset();
    await mostrarListado();
    cambiarDivs("listar"); 
  } catch (err) {
    console.error(err);
  }
});

//Listener del formulario modificar

formModificar.addEventListener("submit", async (event) => {
  event.preventDefault();
  const id = Number(formModificar.elements["id"].value);
  const nombre = formModificar.elements["nombre"].value;
  const apellido = formModificar.elements["apellido"].value;
  const edad = formModificar.elements["edad"].value;
  const rol = formModificar.elements["rol"].value;
  const password = formModificar.elements["password"].value;
  try {
    await update(id, { nombre, apellido, edad, rol, password });
    formModificar.reset();
    await mostrarListado();
    cambiarDivs("listar");
  } catch (err) {
    console.error(err);
  }
});

//Listener del formulario register

formRegister.addEventListener("submit", async (event) => {
  event.preventDefault();
  const nombre = formRegister.elements["nombre"].value;
  const apellido = formRegister.elements["apellido"].value;
  const edad = Number(formRegister.elements["edad"].value);
  const password = formRegister.elements["password"].value;

  try {
    console.log({ nombre, apellido, edad, password })
    await register({ nombre, apellido, edad, password });
    formRegister.reset();
    await mostrarListado();
    cambiarDivs("listar");
  } catch (err) {
    console.error(err);
  }
});

//Listener del formulario login

formLogin.addEventListener("submit", async (event) => {
  event.preventDefault();
  const nombre = formLogin.elements["nombre"].value;
  const password = formLogin.elements["password"].value;
  try {
    await login({ nombre, password });
    if (localStorage.getItem("token")) isAuthenticated = true;
    formLogin.reset();
    await mostrarListado();
    cambiarDivs("listar");
  } catch (err) {
    console.error(err);
  }
});

//Websocket, clase 01/10
const socket = new WebSocket("ws://localhost:4000");
socket.addEventListener("message", (ev) => console.log("WS:", ev.data));
