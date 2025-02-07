export const arrayPrompt = (sample:any,prompt:any) => 
        `
        This request is from app, not from user, so stick strictly to the rules:
        Your response will be ONLY a JavaScript code block. (your code will be additionally wrapped in a function)
        
        Here is a sample of Array (first lines):
        "${sample}"

        Access Array as a variable named 'input', type of Array.
        According to this Array structure, process the data to achieve the following request:
        User input: "${prompt}", if necessary convert string numbers into numbers.
        
        Your response will be ONLY a JavaScript code block.(your code will be additionally wrapped in a function)
        YOU MUST RETURN A VALUE, NEVER RETURN UNDEFINED, NULL, OR AN EMPTY RESULT. YOUR RESPONSIBILITY IS TO RETURN A VALID RESULT.
        DONT ICLUDE ANY EXPLANATION, COMMENTS, FUNCTION DEFINITIONS, OR DESCRIPTIONS.
        `

export const csvPrompt = (sample:any,prompt:any) => 
        `
               
        `

export const objectPrompt = (sample:any,prompt:any) => 
        `
       
        `

export const xlsxPrompt = (sample:any,prompt:any) => 
        `
       
        `