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
            // FIXED: Using single quotes on the outside to prevent the quote-clash
            `print(f'\\n[TRAINING]: Starting ${model_name}...')`, 
            `callbacks_list = [freq_callback] if 'freq_callback' in locals() else []`,
            `v_mode = 0 if 'freq_callback' in locals() else 2`,
            ``,
            `history = ${model_name}.fit(X_train, y_train, epochs=${epochs}, batch_size=${batchSize}, verbose=v_mode, callbacks=callbacks_list)`,
            `print(f"[TRAINING]: Complete. Final Accuracy: {history.history['accuracy'][-1]:.4f}")`
        ].join('\n') + '\n';
    };
}