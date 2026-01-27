import * as Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python';

const BLOCK_TYPE = 'print';

export function registerPrintBlock() {
    Blockly.Blocks[BLOCK_TYPE] = {
        init: function () {
            this.setTooltip('Prints the value provided by the input block.');

            // The change is here:
            this.appendValueInput('VALUE')
                .setCheck(['String', 'Number', 'Boolean'])
                .appendField("print");

            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour("#3E4451");
        }
    };


pythonGenerator.forBlock['print'] = function (block, generator) {

    const value = generator.valueToCode(block, 'VALUE', generator.ORDER_NONE) || '""';
    
    const code = `print(${value})\n`;
    
    return code;
};
    
}


