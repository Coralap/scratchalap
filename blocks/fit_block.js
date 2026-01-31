import * as Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python';

const BLOCK_TYPE = 'fit';

export function registerFitBlock() {
    Blockly.Blocks[BLOCK_TYPE] = {
        init: function () {
            this.appendDummyInput()
                .appendField("Train Model (Fit)");

            this.appendValueInput("EPOCHS")
                .setCheck("Number")
                .appendField("Epochs:");

            this.appendValueInput("BATCH_SIZE")
                .setCheck("Number")
                .appendField("Batch Size:");

            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour("#27ae60");
            this.setTooltip('Starts the training using X and y data.');
        }
    };

    pythonGenerator.forBlock[BLOCK_TYPE] = (block, generator) => {
        const model_name = generator.activeModelName || 'myModel';
        const epochs = generator.valueToCode(block, 'EPOCHS', generator.ORDER_ATOMIC) || '10';
        const batchSize = generator.valueToCode(block, 'BATCH_SIZE', generator.ORDER_ATOMIC) || '32';
        
        return [
            `print(f"\\n[TRAINING]: Training ${model_name} for ${epochs} epochs...")`,
            `history = ${model_name}.fit(X, y, epochs=${epochs}, batch_size=${batchSize}, verbose=2)`,
            `print("[TRAINING]: Complete. Final Loss:", round(history.history['loss'][-1], 4))`
        ].join('\n') + '\n';
    };
}