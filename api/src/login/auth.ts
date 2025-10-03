import Type from "typebox";
import { getByNamePassword, usuarios } from "../services/usuariosservices.ts";
import type { FastifyInstance } from "fastify";
import {
  ErrorSchema,
  Rol,
  Usuario,
  UsuarioLogin,
  UsuarioRegister,
} from "../models/models.ts";
import { createRegister } from "../services/usuariosservices.ts";
import type { SignOptions } from "@fastify/jwt";
export default async function rutasLogin(
  fastify: FastifyInstance,
  opts: object
) {
  fastify.post(
    "/register",
    {
      schema: {
        summary: "Registrar un usuario",
        description: "Ruta para registrar un usuario",
        tags: ["login"],
        body: Type.Omit(UsuarioRegister, ["rol"]),
        response: {
          201: Usuario,
        },
      },
    },
    async (request, reply) => {
      const datos = request.body as UsuarioRegister;
      const usuarioNuevo = await createRegister(datos);
      return reply.code(201).send(usuarioNuevo);
    }
  );

  fastify.post(
    "/login",
    {
      schema: {
        summary: "Login de usuario",
        description: "Ruta para loguear un usuario",
        tags: ["login"],
        body: UsuarioLogin,
        response: {
          200: Type.Object({
            token: Type.String(),
          }),
          401: ErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const usuario = await getByNamePassword(request.body as UsuarioLogin);
      if (!usuario) {
        return reply.code(401).send({ error: "Credenciales inválidas" });
      }
      const signOptions: SignOptions = {
        expiresIn: "8h",
        notBefore: 1,
      };

      const token = fastify.jwt.sign(
        { id: usuario.id_usuario, nombre: usuario.nombre, rol: usuario.rol },
        signOptions
      );

      reply.setCookie("token", token, {
        path: "/",
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60,
      });
      return reply.code(200).send({ token });
    }
  );
}
