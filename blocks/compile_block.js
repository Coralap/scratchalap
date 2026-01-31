import * as Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python';

const BLOCK_TYPE = 'compile';

const optimizerOptions = [
    ['Adam', 'adam'],
    ['RMSprop', 'rmsprop'],
    ['Gradient Descent (SGD)', 'sgd'],
    ['Adagrad', 'adagrad']
];

const lossOptions = [
    ['Mean Squared Error (MSE)', 'mean_squared_error'],
    ['Binary Crossentropy', 'binary_crossentropy'],
    ['Categorical Crossentropy', 'categorical_crossentropy'],
    ['Sparse Categorical Crossentropy', 'sparse_categorical_crossentropy']
];

const metricsOptions = [
    ['Accuracy', 'accuracy'],
    ['Binary Accuracy', 'binary_accuracy'],
    ['Categorical Accuracy', 'categorical_accuracy'],
    ['Mean Absolute Error (MAE)', 'mean_absolute_error'],
    ['Precision', 'precision'],
    ['Recall', 'recall']
];

export function registerCompileBlock() {
    Blockly.Blocks[BLOCK_TYPE] = {
        init: function () {
            this.setTooltip('Configures the model using TensorFlow string aliases.');
            this.appendDummyInput()
                .appendField("Compile Model (Optimizer:")
                .appendField(new Blockly.FieldDropdown(optimizerOptions), 'OPTIMIZER_NAME')
                .appendField(")");

            this.appendDummyInput()
                .appendField("Loss Function:")
                .appendField(new Blockly.FieldDropdown(lossOptions), 'LOSS_NAME');
            
            this.appendValueInput('LEARNING_RATE')
                .setCheck('Number')
                .appendField("Learning Rate:");

            this.appendDummyInput()
                .appendField("Metrics:")
                .appendField(new Blockly.FieldDropdown(metricsOptions), 'METRICS_NAME');

            this.setColour("#5E4085");
            this.setPreviousStatement(true, 'model');
            this.setNextStatement(true, 'model');
        }
    };

    pythonGenerator.forBlock[BLOCK_TYPE] = function (block, generator) {
        const optimizer = block.getFieldValue('OPTIMIZER_NAME');
        const loss = block.getFieldValue('LOSS_NAME');
        const learning_rate = generator.valueToCode(block, 'LEARNING_RATE', generator.ORDER_ATOMIC) || '0.001';
        const metrics = block.getFieldValue('METRICS_NAME');
        const model_name = generator.modelName;

        return `${model_name}.compile(optimizer=tf.keras.optimizers.get({'class_name': '${optimizer}', 'config': {'learning_rate': ${learning_rate}}}), loss='${loss}', metrics=['${metrics}'])\n`;
    };
}