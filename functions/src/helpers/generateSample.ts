/**
 * Generuje ukážkové dáta.
 * @return {number[]} - Pole náhodných čísel.
 * @example
 * const sample = generateSampleArray();
 * Data sa zatial neukladaju do databazy, ale su generovane priamo v pamati.
 * toto bude vyriesene v dalsej verzii, pri zavedeni Firestore.
 */
export function generateSampleArray(): number[] {
  const dataRange = () => Math.floor(Math.random() * 100000 + 10);
  return Array.from({length: 100000}).map(dataRange);
}
