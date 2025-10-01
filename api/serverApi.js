import fastify from "fastify";
import autoLoad from "@fastify/autoload";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import rutasUsuario from "./src/routes/usuarios/usuariorutas.js";
import rutasLogin from "./src/login/auth.js"


const listenOptions = {
  host: "::",
  port: 4000,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = fastify({
  logger: true,
});

server.register(autoLoad, {
  dir: join(__dirname, "src", "plugins"),
});

server.register(autoLoad, {
  dir: join(__dirname, "src","routes"),
  routeParams: true,
});

server.register(rutasUsuario)
server.register(rutasLogin)
try {
  await server.listen(listenOptions);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
