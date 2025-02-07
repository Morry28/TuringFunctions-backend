import express from "express";
import systemRoutes from "./routes/system.routes";
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import {defineSecret} from "firebase-functions/params";

const OPENAI_API_KEY = defineSecret("OPENAI_API_KEY");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(systemRoutes);

// app.listen(3000, () => { console.log('Server is running') })

export const api = onRequest({secrets: [OPENAI_API_KEY]}, app);


