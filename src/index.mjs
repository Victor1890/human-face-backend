import express from 'express'
import cors from 'cors'
import { faceDummy, human, humanConfig } from './libs/human/index.mjs'
import { readFileSync } from 'fs'
import { join } from 'path'

const app = express()

app.use(express.urlencoded({ extended: false, limit: '8mb' }))
app.use(express.json())

app.use(cors())

human.load();
human.warmup();

app.get("/", (_req, res) => {

    res.json({
        version: human.version,
        config: human.config
    })

})


app.post("/api/faces", async (req, res) => {

    /**
     * @type {import('@vladmandic/human').FaceResult[]}
     */
    const faceData = req.body.faces || [faceDummy]
    if (!faceData || !faceData.length) {
        return res.status(400).json({ error: { message: "No face detected" } })
    }

    const file = readFileSync(join(process.cwd(), "src", "assets", "face.jpg"))
    // const file = readFileSync(join(process.cwd(), "src", "assets", "face-org.png"))

    const tensor = human.tf.node.decodeImage(file, 3);
    const result = await human.detect(tensor);

    const face = result.face[0]

    const data = faceData.reduce((acc, item, i) => {

        const index = `Person ${i + 1}`
        const similarity = human.match.similarity(face.embedding, item.embedding)

        acc[index] = {
            ...acc[index],
            similarity
        }

        return acc
    }, {})

    // return res.json({
    //     message: `Face are ${(similarity * 100).toFixed(2)}% similar`,
    // })
    return res.json(data)

})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})