import Type from "typebox";
import type { FastifyInstance } from "fastify";
import { ErrorSchema, Usuario } from "../../models/models.ts";
import { getAll, create} from "../../services/usuariosservices.ts";


export default async function rutasUsuario(fastify: FastifyInstance, opts: object) {
  fastify.get(
    "/",
    {
      schema: {
        summary: "Obtener usuarios",
        description: "Ruta para obtener usuarios ",
        tags: ["usuarios"],
        security: [{ bearerAuth: [] }],
        response:{
          200: Type.Array(Usuario),
          401: ErrorSchema
        }
      },
    },
    async (req, reply) => {
        const token = req.cookies.token;
  if (!token) {
    return reply.status(401).send({ error: "No autorizado" });
  }
      return reply.code(200).send(await getAll());
    }
  );

  fastify.post(
    "/",
    {
      schema: {
        summary: "Crear usuarios",
        description: "Ruta para crear usuarios ",
        tags: ["usuarios"],
        body: Type.Omit(Usuario, ["id_usuario"]),
        security: [{ bearerAuth: [] }],
        response: {
          201: Usuario
        }
      },
      onRequest: fastify.authenticate, 
      preHandler: fastify.isAdmin,

    },
    async (req, reply) => {
      return reply.code(201).send(await create(req.body as Usuario));
    }
  );
}
