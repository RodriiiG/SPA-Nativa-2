import { usuarios } from "../../api/serverApi.js";
import { create, erase, getAll, update } from "../services/usuariosService.js";

const listadoDiv = document.getElementById("Listado");
const crearDiv = document.getElementById("Crear");
const modificarDiv = document.getElementById("Modificar");

const listadoBoton = document.getElementById("botonlistar");
const crearBoton = document.getElementById("crearboton");
const modificarBoton = document.getElementById("botoneditarguardar");
const cancelarBoton = document.getElementsById("botoncancelar");
const lista = document.getElementById("lista");

async function listarUsuario() {
  const usuarios = await getAll();
  lista.innerHTML = usuarios
    .map(
      (u) => `<li>
        ${u.nombre} ${u.apellido}
        <button id="botonBorrarUsuario" data-id="${u.id_usuario}">
          Eliminar usuario
        </button>
        <button id="botonModificarUsuario" data-id="${u.id_usuario}" data-nombre="${u.nombre}" data-apellido="${u.apellido}">
          Modificar usuario
        </button>
      </li>`
    )
    .join("");
}

async function crearUsuario(event) {
    event.preventDefault()
    const formulario = document.getElementById("formulariocrear")
    const nombre = formulario.elements["nombre-crear"].value
    formulario.elements["nombre-crear"].value = ""
    const apellido = formulario.elements["apellido-crear"].value
    formulario.elements["apellido-crear"].value = ""
    await create(nombre, apellido)
    await listarUsuario()
}

async function modificarUsuario(event) {
    event.preventDefault()
    const formulario = document.getElementById("formulariomodificar")
    const nombre = formulario.elements["nombre-modificar"].value
    const apellido = formulario.elements["apellido-modificar"].value
    const idUsuario = formulario.elements["id-modificar"].value
    await update(idUsuario, {nombre, apellido})
    await listarUsuario()
}

async function borrarUsuario(id_usuario){
    await erase(id_usuario)
    await listarUsuario()
}

function cancelarCrear() {
  document.getElementById("Crear").style.display = "none";
}

function cancelarModificar() {
    document.getElementById("Modificar").style.play = "none";
}

listadoBoton.addEventListener("click", () => {
  listaUsuario();
  if (listadoDiv.style.display === "none") {
    listadoDiv.style.display = "block";
  } else listadoDiv.style.display = "none";
});

crearBoton.addEventListener("click", () => {
  if (crearDiv.style.display === "none") {
    crearDiv.style.display = "block";
  } else crearDiv.style.display = "none";
});


modificarBoton.addEventListener("click", () => {
  if (modificarDiv.style.display === "none") {
    modificarDiv.style.display = "block";
  } else modificarDiv.style.display = "none";
});

const botonBorrarUsuario = document.getElementById("botonBorrarUsuario")
const botonModificarUsuario = document.getElementById("botonModificarUsuario")

botonBorrarUsuario.addEventListener("click", ()=>{
    borrarUsuario()
})