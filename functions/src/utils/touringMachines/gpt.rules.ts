import dotenv from 'dotenv'
import OpenAI from 'openai'
import { arrayPrompt } from '../prompts/prompts'
dotenv.config()

class GPTRules {
    private static openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    static async generate(prompt: string, sample: any, type: string) {
        const mainPrompt = arrayPrompt(sample,prompt)
              
        try {

            const response = await GPTRules.openai.chat.completions.create({
                model: "gpt-4",
                messages: [{ role: "system", content: mainPrompt }],
                max_tokens: 500
            })

            return response.choices[0]?.message?.content || null

        } catch (e) {
            console.error(e)
            return null
        }
    }
}

export default GPTRules
