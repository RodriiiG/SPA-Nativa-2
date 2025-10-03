import websocket from "../plugins/websocket.ts";
import type { FastifyInstance } from "fastify";
export default async function root(fastify: FastifyInstance, opts: Object) {
  fastify.route({
    method: "GET",
    url: "/",
    handler: async (req, rep) => {
      return { root: true };
    },
    wsHandler: (socket, req) => {
      socket.send("aejfbieai");
    },
  });
}
