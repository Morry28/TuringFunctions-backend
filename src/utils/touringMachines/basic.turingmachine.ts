import GPTRules from './gpt.rules'

type TSuppoertedFiles = any
class TuringMaching {
    prompt: string
    type: TSuppoertedFiles
    sample: any
    input: any
    rules: any

    constructor(prompt: string, sample: any, type: TSuppoertedFiles) {
        this.prompt = prompt
        this.sample = sample
        this.type = type
        this.initializeRules()
    }

    private async initializeRules() {
        this.rules = await GPTRules.get(this.prompt, this.sample, this.type)
        this.rules = this.rules.replace(/```javascript|```/g, "").trim();

    }

    async run(input: any) {
        while (!this.rules) {
            console.log('waiting for rules to be initialized...')
            await new Promise(resolve => setTimeout(resolve, 1000))
        }
        if (this.rules === null) return null

        try {
            console.log("Generated Rules:", this.rules);

            for (let i = 0; i < 5; i++) {
                const workload = new Function('input', `"use strict"; return (() => { ${this.rules} })();`);

                console.log('iteration:', i + 1)
                await this.initializeRules()
                const res = await workload(input)
                if (res !== undefined && res !== null ) return res
            }
        } catch (err) {
            console.error("Error executing rules:", err)
            return null
        }
    }

}

export default TuringMaching