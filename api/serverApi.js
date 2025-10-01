import fastify from "fastify";
import autoLoad from "@fastify/autoload";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import rutasUsuario from "./src/routes/usuarios/usuariorutas.js";

export const usuarios = [
  { nombre: "Rodrigo", apellido: "Godoy", edad: 19, id_usuario: 1 },
  { nombre: "Gastón", apellido: "Baranov",edad: 27, id_usuario: 2 },  
  { nombre: "Gabriel", apellido: "Fioritti",edad: 20, id_usuario: 3 },
];

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
/*
server.register(autoLoad, {
  dir: join(__dirname, "src","routes"),
  routeParams: true,
});*/

server.register(rutasUsuario)

try {
  await server.listen(listenOptions);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
