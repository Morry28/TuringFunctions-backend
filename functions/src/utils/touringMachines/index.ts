import TuringMaching from './basic.turingmachine'

export default async function launchWork(payload: number[], prompt: string) {
    
    const newMachine = new TuringMaching(
        prompt, 
        [payload[0],payload[1],payload[2]],
        'array'
    )
    return await newMachine.run(payload)

}