import * as Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python';

const BLOCK_TYPE = 'plot_history';

export function registerPlotBlock() {
    Blockly.Blocks[BLOCK_TYPE] = {
        init: function () {
            this.appendDummyInput()
                .appendField("Visualize Training")
                .appendField(new Blockly.FieldDropdown([
                    ["Loss", "loss"],
                    ["Accuracy", "accuracy"]
                ]), "METRIC");

            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour("#D9534F");
            this.setTooltip('Plots the training progress over time.');
        }
    };

    pythonGenerator.forBlock[BLOCK_TYPE] = (block, generator) => {
        const metric = block.getFieldValue('METRIC');
        
        return [
            `import matplotlib.pyplot as plt`,
            `plt.figure(figsize=(10, 5))`,
            `plt.plot(history.history['${metric}'])`,
            `plt.title('Model ${metric.charAt(0).toUpperCase() + metric.slice(1)}')`,
            `plt.ylabel('${metric}')`,
            `plt.xlabel('Epoch')`,
            `plt.legend(['Train'], loc='upper left')`,
            `plt.show()`
        ].join('\n') + '\n';
    };
}