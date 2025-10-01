import type { Static } from "typebox"
import Type from "typebox"


export const  Usuario = Type.Object({
    id_usuario: Type.Number(),
    nombre: Type.String(),
    edad: Type.Number() 
})

export const ErrorSchema = Type.Object({
  statusCode: Type.Integer(),
  error: Type.String(),
  message: Type.String(),
  code: Type.Optional(Type.String()),
});


export type Usuario = Static<typeof Usuario>
