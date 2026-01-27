import { pythonGenerator } from 'blockly/python';

/**
 * The Sigma Code Runner
 * Handles the extraction of Python code from the workspace 
 * and transmits it to the FastAPI backend.
 */
export const initRunners = (workspace) => {
    // This is the function called by the FieldImage play button in run_block.js
    window.runSpecificBlock = (runBlock) => {
        // Find the first block attached to the 'STACK' input of the Run block
        const firstBlock = runBlock.getInputTargetBlock('STACK');
        
        if (!firstBlock) {
            const consoleElement = document.getElementById('generatedCode');
            consoleElement.innerText += "\n[SYSTEM]: Connect blocks to the RUN container first.";
            return;
        }

        // Generate the code string from the connected blocks
        pythonGenerator.addReservedWords('code');
        const generatedCode = pythonGenerator.blockToCode(firstBlock);
        
        // Send it to the Python Engine
        sendCodeToFastAPI(generatedCode);
    };
};

/**
 * Handles the HTTP communication with the FastAPI server
 * @param {string} generatedCode - The raw Python string from Blockly
 */
export const sendCodeToFastAPI = async (generatedCode) => {
    const consoleElement = document.getElementById('generatedCode');
    
    // Visual feedback for the Sigma Console
    consoleElement.innerText += `\n[CLIENT]: Sending code to FastAPI...`;
    consoleElement.scrollTop = consoleElement.scrollHeight;
    
    try {
        const response = await fetch('http://localhost:5000/run', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ code: generatedCode }),
        });

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }

        const result = await response.json();
        
        // Output result to the Pure Black Console
        consoleElement.innerText += `\n[FastAPI]: ${result.message}`;
        
        // If the server echoes code back, you can see it here:
        if (result.received_code) {
            consoleElement.innerText += `\n--- RECEIVED ---\n${result.received_code}\n----------------`;
        }

        consoleElement.scrollTop = consoleElement.scrollHeight;
        
    } catch (error) {
        consoleElement.innerText += `\n[ERROR]: Could not connect to FastAPI server. Ensure 'python server.py' is running.`;
        consoleElement.scrollTop = consoleElement.scrollHeight;
        console.error("Connection failed:", error);
    }
};