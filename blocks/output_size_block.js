import * as Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python';

const BLOCK_TYPE = 'output_size';

export function registerOutputSizeBlock() {
    Blockly.Blocks[BLOCK_TYPE] = {
        init: function () {
            this.setTooltip('Prints the value provided by the input block.');

            // The change is here:
            this.appendValueInput('OUTPUT_SIZE')
                .setCheck(['Number'])
                .appendField("output size:");
            const activationOptions = [
                ['ReLU', 'relu'],
                ['Sigmoid', 'sigmoid'],
                ['Softmax', 'softmax'],
                ['None', 'linear']
            ];

            this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("Activation:")
                .appendField(new Blockly.FieldDropdown(activationOptions), 'ACTIVATION_FUNC');
            this.setColour("#1F3A5F");

            this.setPreviousStatement(true, 'layer');
            this.setNextStatement(false, null);
        }
    };


pythonGenerator.forBlock['output_size'] = function (block, generator) {

    const output_size = generator.valueToCode(block, 'OUTPUT_SIZE', generator.ORDER_NONE) || '""';
    const activation_func = block.getFieldValue('ACTIVATION_FUNC');
    

    const code = `Dense(${output_size}, activation='${activation_func}')\n`;
    
    return code;
};

    
}


