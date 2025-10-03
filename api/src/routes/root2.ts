import type { FastifyInstance } from "fastify";

export default async function root2(fastify: FastifyInstance, opts: object){
    fastify.get("/cookies",{schema: {
        summary: "Ruta prueba cookies",
        description: "coookies pruebsdd",
        tags: ["root"]
    }},
    async function (req, rep){
       rep.setCookie("usuario", "Yo", {
        path: "/",
        httpOnly: true,
        secure: false,
        maxAge: 20*20
       })
       const cookieUsuario = req.cookies.usuario
       return {
        mensaje: "Cookie prueba",
        cookieGuardad: "usuario-yo",
        cookieRecibida: cookieUsuario ?? "NoCookie"
       }
    }
)
}