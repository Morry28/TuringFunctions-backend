import OpenAI from "openai";
import {defineSecret} from "firebase-functions/params";
import {onInit} from "firebase-functions/v2/core";
import {arrayPrompt} from "../prompts/prompts";

const OPENAI_API_KEY = defineSecret("OPENAI_API_KEY");
let openai: OpenAI;
onInit(() => {
  openai = new OpenAI({apiKey: OPENAI_API_KEY.value()});
});

/**
 * Trieda na interakciu s OpenAI GPT-3 API.
 * @class
 */
class GPTRules {
  /**
   * Generuje pravidlá pre spracovanie súborov pomocou GPT-3.
   * @param {string} prompt - Užívateľský vstup.
   * @param {any} sample - Vzorka dát.
   * @param {string} type - Typ spracovania.
   * @return {Promise<string | null>} Odpoveď od AI alebo `null` pri chybe.
   * @static
   * @async
   */
  static async generate(prompt: string, sample: any, type: string) {
    const mainPrompt = arrayPrompt(sample, prompt);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{role: "system", content: mainPrompt}],
        max_tokens: 500,
      });

      return response.choices[0]?.message?.content || null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

export default GPTRules;
