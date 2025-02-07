import {Router, Request, Response, NextFunction} from "express";
import {generateSampleArray} from "../helpers/generateSample";
import launchWork from "../utils/touringMachines";

// eslint-disable-next-line new-cap
const router = Router();

// TODO: when all models are done, implement this
router.get("/api/turingmodels", (req, res, next) => {
  console.log("Req came");
  res.json({status: "live"});
});

router.post(
  "/api/turingmodels/array",
  async (req: Request, res: Response, _next: NextFunction) => {
    console.log("Request body:", req.body);
    const file = req.body.file ?? generateSampleArray();
    const userPrompt = req.body.payload;
    const turingResponse = await launchWork(file, userPrompt);

    if (!turingResponse) {
      res.status(500).json({
        message: "Internal server error",
        data: null,
      });
      return;
    }

    res.status(200).json({
      message: "success",
      data: turingResponse,
    });
  });


export default router;

