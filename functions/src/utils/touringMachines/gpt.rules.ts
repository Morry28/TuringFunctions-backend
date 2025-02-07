import OpenAI from "openai";
import {defineSecret} from "firebase-functions/params";
import {arrayPrompt} from "../prompts/prompts";

const OPENAI_API_KEY = defineSecret("OPENAI_API_KEY");

/**
 * Trieda na interakciu s OpenAI GPT-3 API.
 * @class
 */
class GPTRules {
  /**
   * Inštancia OpenAI API klienta.
   * @private
   * @type {OpenAI}
   */
  private static openai = new OpenAI({apiKey: OPENAI_API_KEY.value()});

  /**
   * @return {Promise<OpenAI>}
   * @static
   * @async
   */
  static async getOpenAIInstance(): Promise<OpenAI> {
    if (!this.openai) {
      const apiKey = OPENAI_API_KEY.value() || '';
      if (!apiKey) {
        throw new Error("Missing OPENAI_API_KEY, fix in Firebase Console");
      }
      this.openai = new OpenAI({apiKey});
    }
    return this.openai;
  }

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
    const openai = await this.getOpenAIInstance();
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
