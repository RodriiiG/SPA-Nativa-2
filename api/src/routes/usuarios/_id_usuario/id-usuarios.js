import { usuarios } from "../../../../serverApi.js";


export default async function rutasId (fastify) {
  fastify.get("/usuarios/:id_usuario", async function (req, rep) {
    const {usuarioid} = req.params;
    const usuario = usuarios.find((u) => (u.id_usuario === usuarioid));
    return rep.code(200).send(usuario);
  });
  fastify.put("/usuarios/:id_usuario", async function (req, rep) {
    const {usuarioid} = req.params;
    const usuario = usuarios.find((u) => (u.id_usuario === usuarioid));
    usuario.nombre=req.body.nombre;
    usuario.edad=req.body.edad;
    return rep.code(204)
  });
  fastify.delete("/usuarios/:id_usuario", async function (req, rep){
    const {usuarioid} = req.params
    const index = usuarios.findIndex((u)=>usuarioid === u.id_usuario)
    usuarios.splice(index, 1)
    return rep.code(204)
  })
};

