import * as Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python';

const BLOCK_TYPE = 'model';



export function registerModelBlock() {
    Blockly.Blocks[BLOCK_TYPE] = {
        init: function () {
            this.setTooltip('Defines a new sequential TensorFlow.js model and gives it a name.');
            this.setHelpUrl('');

            // 1. Define the input for the Model Name (editable text field)
            this.appendDummyInput()
                .appendField("Define Model Name:")
                .appendField(new Blockly.FieldTextInput("myModel"), "MODEL_NAME"); // MODEL_NAME is the field's name


            this.appendStatementInput("LAYERS")
                .setCheck(null) 
                .appendField("Layers:");

            this.setColour("#8E3F3A");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, ['model','define_model']);
        }
    };

    pythonGenerator.forBlock['model'] = function (block, generator) {
    const model_name = block.getFieldValue('MODEL_NAME');

    const value = generator.statementToCode(block, 'LAYERS') || '""';
    generator.modelName = model_name;
    const code = `${model_name} = Sequential([\n${value}])\n`;
    
    return code;
};

}