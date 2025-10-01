import { usuarios } from "../../../serverApi.js";
import Type from "typebox";
export default async function rutasUsuario(fastify, opts) {
  fastify.get(
    "/usuarios",
    {
      schema: {
        summary: "Obtener usuarios",
        description: "Ruta para obtener usuarios ",
        tags: ["usuarios"],
      },
    },
    async (req, reply) => {
      return reply.code(200).send(usuarios);
    }
  );

  fastify.post(
    "/usuarios",
    {
      schema: {
        summary: "Crear usuarios",
        description: "Ruta para crear usuarios ",
        tags: ["usuarios"],
        body: Type.Object({
          nombre: Type.String(),
          apellido: Type.String(),
          edad: Type.Number()
        })
      },
    },
    async (req, reply) => {
      const maxId = usuarios.reduce(
        (m, u) => Math.max(m, Number(u.id_usuario || 0)),
        0
      );
      const nuevoId = maxId + 1;

      const { nombre, apellido, edad } = req.body;
      const nuevousuario = { nombre, apellido, edad, id_usuario: nuevoId };
      usuarios.push(nuevousuario);
      return reply.code(201).send(nuevousuario);
    }
  );

  fastify.put("/usuarios/:id_usuario",{
    schema: {
        summary: "Modificar usuarios",
        description: "Ruta para modificar usuarios ",
        tags: ["usuarios"],
                body: Type.Object({
          nombre: Type.String(),
          apellido: Type.String(),
          edad: Type.Number()
        })
      },
  }, async (req, reply) => {
    const id = Number(req.params.id_usuario);
    const { nombre, apellido, edad } = req.body;

    const usuarioCambiar = usuarios.find((u) => Number(u.id_usuario) === id);
    if (!usuarioCambiar)
      return reply.code(404).send({ error: "Usuario no encontrado" });

    usuarioCambiar.nombre = nombre;
    usuarioCambiar.apellido = apellido;
    usuarioCambiar.edad = edad;
    return reply.code(200).send(usuarioCambiar);
  });

  fastify.delete("/usuarios/:id_usuario", {
    schema: {
        summary: "Eliminar usuarios",
        description: "Ruta para eliminar usuarios ",
        tags: ["usuarios"],
      },
  },async (req, reply) => {
    const id = Number(req.params.id_usuario);
    const index = usuarios.findIndex((u) => Number(u.id_usuario) === id);

    if (index === -1)
      return reply.code(404).send({ error: "Usuario no encontrado" });

    usuarios.splice(index, 1);
    return reply.code(204).send();
  });

  fastify.get("/usuarios/:id_usuario",{
    schema: {
        summary: "Obtener un usuario",
        description: "Ruta para obtener usuario ",
        tags: ["usuarios"],
      },
  }, async (req, reply) => {
    const id = Number(req.params.id_usuario);
    const usuario = usuarios.find((u) => Number(u.id_usuario) === id);
    if (!usuario)
      return reply.code(404).send({ error: "Usuario no encontrado" });
    return reply.code(200).send(usuario);
  });
}
