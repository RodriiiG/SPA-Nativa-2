import jwt from "@fastify/jwt";
import type {FastifyJwtNamespace, FastifyJWTOptions} from "@fastify/jwt"
import type { FastifyReply, FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { Usuario, Rol } from "../models/models.ts";

export default fastifyPlugin(async function jwtPlugin(fastify) {
  const secret = process.env.JWT_SECRET || "secreto";
  const jwtOptions : FastifyJWTOptions = {
      secret: secret || ""
  }

  fastify.register(jwt, jwtOptions);

});

