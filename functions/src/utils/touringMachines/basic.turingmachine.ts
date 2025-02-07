import GPTRules from "./gpt.rules";

type TSuppoertedFiles = string[] | number[]
type TSuppoertedTypes = string

/**
 * Trieda TuringMaching pre spracovanie vstupných dát pomocou GPT pravidiel.
 */
class TuringMaching {
  /**
   * @property {string} prompt - Prompt od užívateľa pre GPTRules.
   * @property {TSuppoertedTypes} type - Typ súboru.
   * @property {TSuppoertedFiles} sample - Vzor súboru.
   * @property {unknown} input - Vstupné dáta.
   * @property {string | null} rules - Pravidlá pre worker.
   */
  prompt: string;
  type: TSuppoertedTypes;
  sample: TSuppoertedFiles;
  input: unknown;
  rules: string | null = null;

  /**
   * Konštruktor triedy.
   * @param {string} prompt - Užívateľský prompt.
   * @param {TSuppoertedFiles} sample - Vzor súboru.
   * @param {TSuppoertedTypes} type - Typ spracovania.
   */
  constructor(
    prompt: string,
    sample: TSuppoertedFiles,
    type: TSuppoertedTypes) {
    this.prompt = prompt;
    this.sample = sample;
    this.type = type;
    this.initializeRules();
  }

  /**
   * Inicializuje pravidlá pomocou GPT.
   * @private
   * @return {Promise<void>}
   */
  private async initializeRules(): Promise<void> {
    this.rules = await GPTRules.generate(this.prompt, this.sample, this.type);

    if (this.rules) {
      this.rules = this.rules.replace(/```javascript|```/g, "").trim();
    }
  }

  /**
   * Spustí TuringMaching worker s daným vstupom.
   * @param {unknown} input - Vstupné dáta pre worker.
   * @return {Promise<unknown | null>} Výsledok výpočtu alebo `null` pri chybe.
   */
  async run(input: unknown): Promise<unknown | null> {
    while (!this.rules) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    if (this.rules === null) return null;

    try {
      for (let i = 0; i < 5; i++) {
        // eslint-disable-next-line
        const workload = new Function("input", `"use strict"; return (() => { ${this.rules} })();`);

        console.log("iteration:", i + 1);
        console.log("rules:", this.rules);
        await this.initializeRules();
        const res = await workload(input);
        if (res !== undefined && res !== null) return res;
      }
    } catch (err) {
      console.error("Error executing rules:", err);
      return null;
    }
    return null;
  }
}

export default TuringMaching;
