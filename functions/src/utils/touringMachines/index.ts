import TuringMaching from "./basic.turingmachine";

/**
 * Spustí výpočet na TuringMachine.
 * @param {number[]} payload - Počiatočné vstupné dáta.
 * @param {string} prompt - Textový prompt na konfiguráciu výpočtu.
 * @return {Promise<any>} Výsledok výpočtu.
 */
export default async function launchWork(payload: number[], prompt: string) {
  const newMachine = new TuringMaching(
    prompt,
    [payload[0], payload[1], payload[2]],
    "array"
  );
  return await newMachine.run(payload);
}
