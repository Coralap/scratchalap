import * as Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python';

const BLOCK_TYPE = 'input_data';

export function registerInputDataBlock() {
    Blockly.Blocks[BLOCK_TYPE] = {
        init: function () {
            this.appendDummyInput()
                .appendField("New Data:");
            
            this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput("55, 1, 3, 145, 233, ..."), "RAW_DATA");

            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour("#4A90E2");
            this.setTooltip('Enter comma-separated values matching your feature count.');
        }
    };

    pythonGenerator.forBlock[BLOCK_TYPE] = (block, generator) => {
        const rawData = block.getFieldValue('RAW_DATA');
        
        return [
            `import numpy as np`,
            `new_data_raw = [${rawData}]`,
            `new_data = np.array(new_data_raw).reshape(1, -1).astype('float32')`,
            `print(f"[INPUT]: Data prepared. Shape: {new_data.shape}")`
        ].join('\n') + '\n';
    };
}