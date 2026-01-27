import * as Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python';

const BLOCK_TYPE = 'input_size';

export function registerInputSizeBlock() {
    Blockly.Blocks[BLOCK_TYPE] = {
        init: function () {
            this.setTooltip('Prints the value provided by the input block.');

            // The change is here:
            this.appendValueInput('INPUT_SIZE')
                .setCheck(['Number'])
                .appendField("input size:");
            this.setColour("#1F3A5F");

            this.setPreviousStatement(true, 'define_model');
            this.setNextStatement(true, 'layer');
        }
    };

pythonGenerator.forBlock['input_size'] = function (block, generator) {

    const input_size = generator.valueToCode(block, 'INPUT_SIZE', generator.ORDER_NONE) || '""';
    
    const code = `Input(shape=(${input_size},)),\n`;
    
    return code;
};

    
}


