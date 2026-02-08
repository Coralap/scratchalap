import * as Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python';

const BLOCK_TYPE = 'dropout_layer';

export function registerDropoutBlock() {
    Blockly.Blocks[BLOCK_TYPE] = {
        init: function () {
            this.appendDummyInput()
                .appendField("Dropout Layer")
                .appendField(new Blockly.FieldDropdown([
                    ["20%", "0.2"],
                    ["10%", "0.1"],
                    ["30%", "0.3"],
                    ["50%", "0.5"]
                ]), "RATE");

            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour("#5E4085");
            this.setTooltip('Randomly deactivates neurons during training to prevent the model from memorizing data.');
        }
    };

    pythonGenerator.forBlock[BLOCK_TYPE] = (block, generator) => {
        const rate = block.getFieldValue('RATE');
        return `  Dropout(${rate}),\n`;
    };
}