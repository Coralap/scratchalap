import { pythonGenerator } from 'blockly/python';

export const initRunners = (workspace) => {
    window.runSpecificBlock = (runBlock) => {
        const firstBlock = runBlock.getInputTargetBlock('STACK');
        
        if (!firstBlock) {
            const consoleElement = document.getElementById('generatedCode');
            consoleElement.innerText += "\n[SYSTEM]: Connect blocks to the RUN container first.";
            return;
        }

        pythonGenerator.addReservedWords('code');
        const generatedCode = pythonGenerator.blockToCode(firstBlock);
        sendCodeToFastAPI(generatedCode);
    };
};

export const sendCodeToFastAPI = async (generatedCode) => {
    const consoleElement = document.getElementById('generatedCode');
    consoleElement.innerText += `\n[CLIENT]: Sending code to python...`;
    consoleElement.scrollTop = consoleElement.scrollHeight;
    
    try {
        const response = await fetch('http://localhost:5000/run', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: generatedCode }),
        });

        if (!response.ok) throw new Error(`Server error: ${response.status}`);

        const result = await response.json();
        if(result.code){
            consoleElement.innerText += `\n[GENERATED CODE]:\n${result.code}\n`;
        }


        // Display actual Python print() output
        if (result.output) {
            consoleElement.innerText += `\n[OUTPUT]:\n${result.output}`;
        }

        // Display Python errors if they occurred
        if (result.error) {

            consoleElement.innerText += `\n[PYTHON ERROR]:\n${result.error}`;
        }else{
            consoleElement.innerText += `\n[CLIENT]: Execution finished.`;  

        }

        consoleElement.scrollTop = consoleElement.scrollHeight;
        
    } catch (error) {
        consoleElement.innerText += `\n[ERROR]: Connection failed. Check if server is running.`;
        consoleElement.scrollTop = consoleElement.scrollHeight;
    }
};