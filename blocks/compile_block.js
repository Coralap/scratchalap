import * as Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python';

const BLOCK_TYPE = 'compile';
const optimizerOptions = [
    ['Adam', 'Adam'],
    ['RMSprop', 'RMSprop'],
    ['Gradient Descent (SGD)', 'SGD'],
    ['Adagrad', 'Adagrad']
];
const lossOptions = [
    ['Mean Squared Error (MSE)', 'MeanSquaredError'],
    ['Binary Crossentropy', 'BinaryCrossentropy'],
    ['Categorical Crossentropy', 'CategoricalCrossentropy'],
    ['Sparse Categorical Crossentropy', 'SparseCategoricalCrossentropy']
];

const metricsOptions = [
    ['Accuracy', 'Accuracy'],
    ['Binary Accuracy', 'BinaryAccuracy'],
    ['Categorical Accuracy', 'CategoricalAccuracy'],
    ['Mean Absolute Error (MAE)', 'MeanAbsoluteError'],
    ['Precision', 'Precision'],
    ['Recall', 'Recall']
];

export function registerCompileBlock() {
    Blockly.Blocks[BLOCK_TYPE] = {
        init: function () {
            this.setTooltip('Configures the learning process with optimizer, loss, and metrics.');
            this.setHelpUrl('');

            this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("Compile Model (Optimizer:")
                .appendField(new Blockly.FieldDropdown(optimizerOptions), 'OPTIMIZER_NAME')
                .appendField(")");

            this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("Loss Function:")
                .appendField(new Blockly.FieldDropdown(lossOptions), 'LOSS_NAME');
            
            this.appendValueInput('LEARNING_RATE')
                .setCheck('Number')
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("Learning Rate:");

            this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("METRICS:")
                .appendField(new Blockly.FieldDropdown(metricsOptions), 'METRICS_NAME');

            this.setColour("#5E4085");

            this.setPreviousStatement(true, 'model');
            this.setNextStatement(false, null);
        }
    };


pythonGenerator.forBlock['compile'] = function (block, generator) {
    const optimizer = block.getFieldValue('OPTIMIZER_NAME');
    const loss = block.getFieldValue('LOSS_NAME');
    const learning_rate = generator.valueToCode(block, 'LEARNING_RATE', generator.ORDER_NONE) || 'None';
    const metrics = block.getFieldValue('METRICS_NAME'); 
    const model_name = block.getPreviousBlock().getFieldValue('MODEL_NAME');


    const code = `${model_name}.compile(optimizer=${optimizer}(learning_rate=${learning_rate}), loss='${loss}', metrics=['${metrics}'])\n`;
    
    return code;
};
}