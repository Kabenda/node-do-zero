import { randomUUID } from "crypto"

export class DatabaseMemory {
#videos = new Map()

//Set e um array que n aceita valores duplicados

//Map e um objecto e tem uma api melhor

list(){
    return Array.from(this.#videos.entries()).map((videoArray) => {
        const id = videoArray[0]
        const data = videoArray[1]

        return {
            id,
            ...data,
        }
    })
}

create(video){
    const videoId = randomUUID()
    //Unik Universal ID
    this.#videos.set(videoId, video)
}

update(id, video){
    this.#videos.set(id, video)
}

delete(id, video){
    this.#videos.delete(id)
}


}