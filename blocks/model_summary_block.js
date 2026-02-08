import * as Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python';

const BLOCK_TYPE = 'model_summary';

export function registerModelSummaryBlock() {
    Blockly.Blocks[BLOCK_TYPE] = {
        init: function () {
            this.appendDummyInput()
                .appendField("Show Model Architecture");
            
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour("#5E4085");
            this.setTooltip('Prints the Keras model summary including layer types and parameter counts.');
        }
    };

    pythonGenerator.forBlock[BLOCK_TYPE] = (block, generator) => {
        const model_name = generator.activeModelName || 'myModel';
        return [
            `print("\\n--- MODEL ARCHITECTURE ---")`,
            `${model_name}.summary()`,
            `print("--------------------------\\n")`
        ].join('\n') + '\n';
    };
}