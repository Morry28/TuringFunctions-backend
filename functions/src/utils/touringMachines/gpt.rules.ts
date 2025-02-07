import OpenAI from "openai";
import {arrayPrompt} from "../prompts/prompts";

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
  static async generate(
    prompt: string,
    sample: any,
    type: string): Promise<string | null> {
    const apiKey = process.env.OPENAI_API_KEY;
    const openai = new OpenAI({apiKey});
    if (!openai) {
      console.error("❌ OpenAI client is not initialized!");
      return null;
    }
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
