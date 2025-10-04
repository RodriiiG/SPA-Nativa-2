import jwt from "@fastify/jwt";
import type {FastifyJWTOptions} from "@fastify/jwt"
import fastifyPlugin from "fastify-plugin";


export default fastifyPlugin(async function jwtPlugin(fastify) {
  const secret = process.env.JWT_SECRET || "secreto";
  const jwtOptions : FastifyJWTOptions = {
      secret: secret || ""
  }

  fastify.register(jwt, jwtOptions);

});

