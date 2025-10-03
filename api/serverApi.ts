import fastify from "fastify";
import autoLoad from "@fastify/autoload";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import type { FastifyListenOptions, FastifyInstance } from "fastify";

const listenOptions : FastifyListenOptions= {
  host: "::",
  port: 4000,
};

const loggerOptions = {
  level: process.env.FASTIFY_LOG_LEVEL || "trace",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  },
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server : FastifyInstance = fastify({
  logger: loggerOptions,
});

server.register(autoLoad, {
  dir: join(__dirname, "src", "plugins"),
});

server.register(autoLoad, {
  dir: join(__dirname, "src","routes"),
  routeParams: true,
});

server.register(autoLoad, {
  dir: join(__dirname, "src","login"),
  routeParams: true,
});


try {
  await server.listen(listenOptions);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
