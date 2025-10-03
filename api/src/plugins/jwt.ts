import jwt from "@fastify/jwt";
import type {FastifyJwtNamespace, FastifyJWTOptions} from "@fastify/jwt"
import type { FastifyReply, FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";

export default fastifyPlugin(async function jwtPlugin(fastify) {
  const secret = process.env.JWT_SECRET || "secreto";
  const jwtOptions : FastifyJWTOptions = {
      secret: secret || ""
  }

  fastify.register(jwt, jwtOptions);

  fastify.decorate("authenticate", async function (req: FastifyRequest, rep: FastifyReply) {
    try {
      await req.jwtVerify();
    } catch (err) {
      rep.code(401).send({ error: "Token inválido o no proporcionado" });
    }
  });
});

declare module 'fastify' {
    interface FastifyInstance extends 
    FastifyJwtNamespace<{namespace:'security'}>{
        authenticate(request:FastifyRequest, reply:FastifyReply):Promise<void>
    } 
}
