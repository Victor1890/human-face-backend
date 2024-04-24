import express from 'express'
import cors from 'cors'
import { human, humanConfig } from './libs/human/index.mjs'
import { readFileSync } from 'fs'
import { join } from 'path'

const app = express()

app.use(express.urlencoded({ extended: false, limit: '8mb' }))
app.use(express.json())

app.use(cors())

app.get("/", (req, res) => {

    res.json({
        message: "Hello World",
        config: human.config
    })

})

app.post("/api/face", async (req, res) => {

    // const face = req.body.face
    // if (!face) {
    //     return res.status(400).json({ error: { message: "No face detected" } })
    // }

    const file = readFileSync(join(process.cwd(), "src", "assets", "face.jpeg"))

    console.log("file: ", file)
    console.log("human: ", human)


    const tensor = human.tf.node.decodeImage(file, 3);
    const result = await human.detect(tensor, humanConfig);

    console.log("result: ", result)

    return res.json({
        message: "Face detected"
    })

})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})