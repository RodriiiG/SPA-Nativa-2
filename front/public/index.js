import { getAll, erase, update, create } from "./services/usuariosService.js";
import { register, login } from "./services/authService.js";
const botonLista = document.getElementById("boton-listar");
const botonCrear = document.getElementById("boton-crear");
const listaDiv = document.getElementById("Listar");
const crearDiv = document.getElementById("Crear");
const formularioCrear = document.getElementById("crear");
const formularioEditar = document.getElementById("editar");
const lista = document.getElementById("lista");

const botonLogin = document.getElementById("boton-login");
const botonRegister = document.getElementById("boton-register");
const loginDiv = document.getElementById("Login");
const registerDiv = document.getElementById("Register");
const loginForm = document.getElementById("login");
const registerForm = document.getElementById("register");

let isAuthenticated = Boolean(localStorage.getItem("token"));

async function listarUsuario() {
  const usuarios = await getAll();
  lista.innerHTML = usuarios
    .map(
      (u) => `
      <li>
        ${u.nombre} ${u.apellido} ${u.edad}
        <button class="borrarUsuario" data-id="${u.id_usuario}">
          Eliminar usuario
        </button>
        <button class="editarUsuario" data-id="${u.id_usuario}" data-nombre="${u.nombre}" data-apellido="${u.apellido}" data-edad="${u.edad}">
          Modificar usuario
        </button>
      </li>`
    )
    .join("");
}

async function guardarUsuario(event) {
  event.preventDefault();
  const crear = formularioCrear; 
  const nombre = crear.elements["nombre"].value;
  const apellido = crear.elements["apellido"].value;
  const edad = Number(crear.elements["edad"].value);
  crear.reset();
  await create({ nombre, apellido, edad });
  await listarUsuario();
}

async function borrarUsuario(id_usuario) {
  await erase(id_usuario);
  await listarUsuario();
}

function editarUsuario(idUsuario, nombre, apellido, edad) {
  document.getElementById("FormEditar").style.display = "block";
  document.getElementById("nuevoNombre-modificar").value = nombre;
  document.getElementById("nuevoApellido-modificar").value = apellido;
  document.getElementById("nuevaEdad-modificar").value = edad;
  document.getElementById("id-modificar").value = idUsuario;
}

function cancelarEdicion() {
  document.getElementById("FormEditar").style.display = "none";
}

async function guardarEdicionUsuario(event) {
  event.preventDefault();
  const idUsuario = Number(document.getElementById("id-modificar").value);
  const nuevonombre = document.getElementById("nuevoNombre-modificar").value.trim();
  const nuevoapellido = document.getElementById("nuevoApellido-modificar").value.trim();
  const nuevaedad = Number(document.getElementById("nuevaEdad-modificar").value) || null;

  await update(idUsuario, {
    nombre: nuevonombre,
    apellido: nuevoapellido,
    edad: nuevaedad,
  });
  cancelarEdicion();
  await listarUsuario();
}

botonLista.addEventListener("click", async () => {
  await listarUsuario();
  listaDiv.style.display = listaDiv.style.display === "none" ? "block" : "none";
});

botonCrear.addEventListener("click", () => {
  crearDiv.style.display = crearDiv.style.display === "none" ? "block" : "none";
});

lista.addEventListener("click", async (e) => {
  const editarBtn = e.target.closest(".editarUsuario");
  if (editarBtn) {
    const { id, nombre, apellido, edad } = editarBtn.dataset;
    return editarUsuario(id, nombre, apellido, edad);
  }

  const borrarBtn = e.target.closest(".borrarUsuario");
  if (borrarBtn) {
    const { id } = borrarBtn.dataset;
    if (confirm("¿Eliminar usuario?")) {
      await borrarUsuario(id);
    }
  }
});

formularioCrear.addEventListener("submit", guardarUsuario);
formularioEditar.addEventListener("submit", guardarEdicionUsuario);

const btnCancelarEdicion = document.getElementById("btn-cancelar-edicion");
btnCancelarEdicion.addEventListener("click", cancelarEdicion);

async function registrarUsuario(event) {
  event.preventDefault();
  const nombre = registerForm.elements["nombre"].value;
  const apellido = registerForm.elements["apellido"].value;
  const edad = registerForm.elements["edad"].value;
  const password = registerForm.elements["password"].value 

  try {
    const res = await register({ nombre, apellido, edad, password });
    registerForm.reset();
  } catch (err) {
    console.error(err);
  }
    await listarUsuario()
}


async function loginUsuario(event) {
  event.preventDefault();
  const nombre = loginForm.elements["nombre"].value ;
  const password = loginForm.elements["password"].value;
  try {
    await login({ nombre, password });
    
    const token = localStorage.getItem("token");
    if (token) {
      isAuthenticated = true;
      loginForm.reset();
      return;
    }

  } catch (err) {
    console.error(err);
    
  }
}


botonLogin.addEventListener("click", () => {
  loginDiv.style.display = loginDiv.style.display === "none" ? "block" : "none";
});

botonRegister.addEventListener("click", () => {
  registerDiv.style.display = registerDiv.style.display === "none" ? "block" : "none";
});


registerForm.addEventListener("submit", registrarUsuario);
loginForm.addEventListener("submit", loginUsuario);

const socket = new WebSocket("ws://localhost:4000")
socket.addEventListener("message", (event)=>{
  console.log("Message from server: ", event.data)
})