import * as Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python';
const BLOCK_TYPE = 'dense_layer';

export function registerDenseLayerBlock() {
    Blockly.Blocks[BLOCK_TYPE] = {
        init: function () {
            this.setTooltip('Prints the value provided by the input block.');

            // The change is here:
            this.appendValueInput('NEURONS')
                .setCheck(['Number'])
                .appendField("Dense Layer With Neurons:");

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
            this.setColour("#284E7D");

            this.setPreviousStatement(true, 'layer');
            this.setNextStatement(true, 'layer');
        }
    };

    pythonGenerator.forBlock[BLOCK_TYPE] = function (block, generator) {
            const neurons = generator.valueToCode(block, 'NEURONS', generator.ORDER_NONE) || '0';
            const activationFunc = block.getFieldValue('ACTIVATION_FUNC');

            // ייצור הקוד עבור שכבת Keras
            const code = `Dense(${neurons}, activation='${activationFunc}'),\n`;
            
            return code;
        };

    
}



