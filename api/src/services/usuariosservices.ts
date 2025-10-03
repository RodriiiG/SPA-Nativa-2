import { Usuario, Rol, UsuarioLogin, UsuarioRegister } from "../models/models.ts";
import * as err from "../models/errores.ts"

export const usuarios : Usuario[] = [
  { nombre: "Rodrigo", apellido: "Godoy", edad: 19, id_usuario: 1, password: "a", rol: Rol.Admin },
  { nombre: "Gastón", apellido: "Baranov",edad: 27, id_usuario: 2, password: "a", rol: Rol.User },  
  { nombre: "Gabriel", apellido: "Fioritti",edad: 20, id_usuario: 3, password: "a", rol: Rol.User },
];

let ultimoId = usuarios.length + 1;

export async function getAll () : Promise<Usuario[]> {
    return usuarios;
}

export async function create (data: UsuarioRegister) : Promise<Usuario> {
  const nuevoUsuario : Usuario = {
    id_usuario: ultimoId++,
    nombre: data.nombre,
    apellido: data.apellido,
    edad: data.edad,
    password: data.password,
    rol: data.rol
  }
  usuarios.push(nuevoUsuario)
  return nuevoUsuario;
}

export async function createRegister(data: Omit<UsuarioRegister, "rol">) {
    const nuevoUsuario : Usuario = {
    id_usuario: ultimoId++,
    nombre: data.nombre,
    apellido: data.apellido,
    edad: data.edad,
    password: data.password,
    rol: Rol.User
  }
  usuarios.push(nuevoUsuario)
  return nuevoUsuario;
}

export async function getById(id_usuario: Number) : Promise<Usuario>{
  const usuario = usuarios.find((u)=>  u.id_usuario===id_usuario)
  if(!usuario) throw new err.NotFound()
  return usuario;
}

export async function update(data: Omit<Usuario, "id_usuario">, id_usuario: Number):Promise<Usuario>{
  const usuario = await getById(id_usuario)
  usuario.nombre = data.nombre
  usuario.apellido=data.apellido
  usuario.edad=data.edad
  usuario.password=data.password
  usuario.rol=data.rol
  return usuario;
}

export async function erase (id_usuario :Number): Promise<void> {
  const usuarioindex = usuarios.findIndex((u)=>u.id_usuario===id_usuario)
  if(usuarioindex===-1) throw new err.NotFound()
  usuarios.splice(usuarioindex, 1)
}

export async function getByNamePassword(data: UsuarioLogin): Promise<Usuario>{
  const usuario  = usuarios.find((u)=>u.nombre===data.nombre&&u.password===data.password)
  if(!usuario) throw new err.NotFound()
  return usuario;
}