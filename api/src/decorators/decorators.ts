import type { FastifyRequest, FastifyReply } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { Rol } from "../models/models.ts";
import type {FastifyJwtNamespace} from "@fastify/jwt"
export default fastifyPlugin(async function authDecorators(fastify) {

  fastify.decorate("authenticate", async function (req: FastifyRequest, rep: FastifyReply) {
    try {
      await req.jwtVerify();
    } catch (err) {
      rep.code(401).send({ error: "Token inválido o no proporcionado" });
    }
  });

  fastify.decorate("isAdmin", async function (req: FastifyRequest, rep: FastifyReply) {
    try {
      await req.jwtVerify();
      const user = req.user as { rol?: Rol };
      if (user.rol !== Rol.Admin) {
        rep.code(403).send({ error: "No tienes permisos de administrador" });
      }
    } catch (err) {
      rep.code(401).send({ error: "Token inválido o no proporcionado" });
    }
  });
});


declare module 'fastify' {
    interface FastifyInstance extends 
    FastifyJwtNamespace<{namespace:'security'}>{
        authenticate(request:FastifyRequest, reply:FastifyReply):Promise<void>
        isAdmin(request:FastifyRequest, reply:FastifyReply):Promise<void>
    } 
}

