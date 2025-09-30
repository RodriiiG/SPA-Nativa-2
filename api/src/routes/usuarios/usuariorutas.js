import { usuarios } from "../../../serverApi.js"

export default async function rutasUsuario(fastify, opts) {
    fastify.get('/usuarios', async function (req, rep){
        return rep.code(200).send(usuarios)
    })

    fastify.post('/usuarios', async function (req, rep){
        const ultimo_id = usuarios.length+1
        const {nombre, edad} = req.body
        const nuevousuario = {nombre, edad, id_usuario: ultimo_id}
        usuarios.push(nuevousuario)
        return rep.code(201).send(nuevousuario)
    })
}

