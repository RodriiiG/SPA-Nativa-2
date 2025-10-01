import websocket from "../plugins/websocket.js";

export default async function root(fastify, opts) {
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
