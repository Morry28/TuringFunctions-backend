import { Router, Request, Response, NextFunction } from "express"
import { generateSampleArray } from "../helpers/generateSample"
import launchWork from "../utils/touringMachines"

const router = Router()

router.get('/api/turingmodels', (req, res, next) => {


})

router.post('/api/turingmodels/array', async (req: Request, res: Response, _next: NextFunction) => {

    const file = req.body.payload.file ?? generateSampleArray()
    const userPrompt = req.body.payload.prompt
    const turingResponse = await launchWork(file, userPrompt)

    if (!turingResponse) {
        res.status(500).json({
            message: 'Internal server error',
            data: null
        })
        return
    }

    res.status(200).json({
        message: 'success',
        data: turingResponse
    })


})


export default router

