import fastifyCors from "@fastify/cors";
import fastifyPlugin from 'fastify-plugin'

export default fastifyPlugin(async function cors(fastify, opts){
    fastify.register(fastifyCors, {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"]
    })
})
