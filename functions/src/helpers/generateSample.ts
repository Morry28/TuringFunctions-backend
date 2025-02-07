export function generateSampleArray(): number[] {
    return Array.from({ length:100000}).map(() => Math.floor(Math.random() * 10000+10))
}
