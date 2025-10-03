import Type from "typebox";
import { update, erase, getById } from "../../../services/usuariosservices.ts";
import { ErrorSchema, Usuario } from "../../../models/models.ts";
import type { FastifyInstance } from "fastify";

export default async function rutasUsuario(
  fastify: FastifyInstance,
  opts: object
) {
  fastify.put(
    "/",
    {
      schema: {
        summary: "Modificar usuarios",
        description: "Ruta para modificar usuarios ",
        tags: ["usuarios"],
        params: Type.Pick(Usuario, ["id_usuario"]),
        body: Type.Object({
          nombre: Type.String(),
          apellido: Type.String(),
          edad: Type.Number(),
        }),
        response: {
          200: Usuario,
          404: ErrorSchema,
        },
        security: [{ bearerAuth: [] }],
      },
      preHandler: [fastify.authenticate],
    },

    async (req, reply) => {
      const { id_usuario } = req.params as { id_usuario: number };
      return reply
        .code(200)
        .send(await update(req.body as Usuario, id_usuario));
    }
  );

  fastify.delete(
    "/",
    {
      schema: {
        summary: "Eliminar usuarios",
        description: "Ruta para eliminar usuarios ",
        tags: ["usuarios"],
        params: Type.Pick(Usuario, ["id_usuario"]),
        response: {
          204: Type.Null(),
        },
      },
    },
    async (req, reply) => {
      const { id_usuario } = req.params as { id_usuario: number };
      erase(id_usuario);
      return reply.code(204).send();
    }
  );

  fastify.get(
    "/",
    {
      schema: {
        summary: "Obtener un usuario",
        description: "Ruta para obtener usuario ",
        tags: ["usuarios"],
        params: Type.Pick(Usuario, ["id_usuario"]),
      },
    },
    async (req, reply) => {
      const { id_usuario } = req.params as { id_usuario: number };
      return reply.code(200).send(await getById(id_usuario));
    }
  );
}
