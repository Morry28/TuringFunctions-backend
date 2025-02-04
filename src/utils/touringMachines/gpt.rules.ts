import dotenv from 'dotenv'
import OpenAI from 'openai'
dotenv.config()

class GPTRules {
    private static openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    static async get(prompt: string, sample: any, type: string) {
        const mainPrompt = `
        This request is from app, not from user, so stick strictly to the rules:
        Your response will be ONLY a JavaScript code block. (your code will be additionally wrapped in a function)
        
        Here is a sample of Array (first lines):
        "${sample}"

        Access Array as a variable named 'input', type of Array.
        According to this Array structure, process the data to achieve the following request:
        User input: "${prompt}", if necessary convert string numbers into numbers.
        
        Your response will be ONLY a JavaScript code block.
        DONT ICLUDE ANY EXPLANATION, COMMENTS, FUNCTION DEFINITIONS, OR DESCRIPTIONS.
        `;
        
        
        /*`
        You must generate **pure JavaScript rules** (no TypeScript) for a Turing machine that processes **CSV input** and returns a valid result.
        The Turing machine runs on the backend and **only processes CSV files**.
        
        ### **📌 CSV FORMAT (STRICT RULES)**
        You are provided with sample CSV data to fully understand its structure. The sample represents the **first two rows** from the CSV file:  
        "${sample}"
        
        🚨 **STRICT RULES (BREAKING THESE WILL REPEAT THE TASK):** 🚨  
        1️⃣ **The input is a raw CSV string where rows are separated by newlines ('\\n') and columns are separated by commas (',').**  
        2️⃣ **Your response must be ONLY JavaScript code that correctly extracts and processes the required CSV data.**  
        3️⃣ **❌ DO NOT USE MARKDOWN OR FENCED BLOCKS (e.g., \`\`\`javascript, \`\`\`) – RETURN ONLY PLAIN TEXT!**  
        4️⃣ **Your response must NEVER include explanations, comments, TypeScript syntax, function definitions, or descriptions.**  
        5️⃣ **ALWAYS return a value. NEVER return undefined, null, or an empty result.**  
        6️⃣ **Your code MUST use .split('\\n') for rows and .split(',') for columns.**  
        7️⃣ **NEVER assume the structure of CSV outside of what is provided in the sample.**  
        8️⃣ **If a row has missing or undefined values, your code MUST skip it and NOT throw an error.**  
        9️⃣ **If a value is expected to be a number but is invalid, default it to 0 instead of causing a crash.**  
        🔟 **Your code MUST handle empty rows safely by filtering them out using .filter(row => row.trim() !== '').**  
        
        ### 🚀 **NUMBER FORMAT RULES (NO ROUNDING!)**  
        - **If your response is a number, it must be returned in the exact format it was found in the CSV.**  
        - **Do NOT remove decimal places. If the original value was "102.116", return "102.116", NOT "102".**  
        - **Always preserve trailing decimals (e.g., "1.00" should not become "1").**  
        - **DO NOT CONVERT NUMBERS TO INTEGERS UNLESS THEY WERE ALREADY IN INTEGER FORMAT.**  
        
        ### 🚀 **FAILURE HANDLING MECHANISM:**  
        - **If your code encounters an unexpected issue (undefined values, incorrect column structure, or missing fields), it MUST return a fallback value ([] for arrays or 0 for numbers) instead of crashing.**  
        - **If there is NO valid data in the CSV, return 0 instead of undefined.**  
        - **IF THIS RULE IS BROKEN, THE TASK WILL REPEAT UNTIL CORRECT OUTPUT IS PRODUCED.**  
        
        🚨 **Your response must be ONLY valid JavaScript code, starting immediately with 'return'. If any extra text or explanation is included, the task will repeat until the response is correct.** 🚨  
        
        The file is available as a variable named **'input'**, which contains the entire CSV as a string.  
        Write JavaScript rules that extract the required information from the CSV.
        
        If the response is undefined or null, the task will repeat until valid output is produced.
        
        ---
        ### **📌 User Input (precursor to rules):**  
        ${prompt}
        `;
        */
        
        

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
