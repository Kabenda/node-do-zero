import {fastify } from "fastify"
import { DatabaseMemory} from './database-memory.js'
import { DatabasePostgres } from "./database-postgres.js"

const server = fastify()
//const database = new DatabaseMemory()
const database = new DatabasePostgres()

// Request Body
server.post('/videos',async (request, reply) => {

const { title, description, duration } = request.body
    //console.log(body)
   await database.create({
        //short sintax qdo o var e = ao param
        title,
        //maneira convencional de receber o param
        description: description,
        duration,
    })


    return reply.status(201).send()
})

server.get('/videos', (request) => {

    const search = request.query.search

    const videos = database.list(search)

    return videos
})

server.put('/videos/:id',async (request, reply) => {
    const videoId = request.params.id 
    const { title, description, duration } = request.body

   await database.update(videoId, {
        title,
        description,
        duration,
    })
    return reply.status(204).send()
})

server.delete('/videos/:id',async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})


server.listen({
    port: process.env.port ?? 3333,
})
