import fastifyPlugin from "fastify-plugin";
import fastifyCookie from "@fastify/cookie";
import type { FastifyCookieOptions } from '@fastify/cookie'
export default fastifyPlugin(async function cookiePlugin(fastify) {
  fastify.register(fastifyCookie, {
    secret: "secreto",   
    parseOptions: {},  
  } as FastifyCookieOptions);
});
