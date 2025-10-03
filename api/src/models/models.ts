import type { Static } from "typebox"
import Type from "typebox"

export const Rol = {
  Admin: "admin",
  User: "usuario",
} as const;

export type Rol = (typeof Rol)[keyof typeof Rol];



export const  Usuario = Type.Object({
    id_usuario: Type.Number(),
    nombre: Type.String(),
    apellido: Type.String(),
    edad: Type.Number() ,
    password: Type.String(),
    rol: Type.Enum(Rol)
})

export const  UsuarioRegister = Type.Object({
    nombre: Type.String(),
    apellido: Type.String(),
    edad: Type.Number() ,
    password: Type.String(),
    rol: Type.Enum(Rol)
})

export const ErrorSchema = Type.Object({
  statusCode: Type.Integer(),
  error: Type.String(),
  message: Type.String(),
  code: Type.Optional(Type.String()),
});

export const UsuarioLogin = Type.Object({
  nombre: Type.String(),
  password: Type.String()
})
export type Usuario = Static<typeof Usuario>
export type UsuarioLogin = Static<typeof UsuarioLogin>
export type UsuarioRegister = Static<typeof UsuarioRegister>