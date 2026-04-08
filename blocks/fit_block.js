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
        `from sklearn.utils import class_weight`,
        `import numpy as np`,
        `class SigmaLogger(tf.keras.callbacks.Callback):`,
        `    def on_epoch_end(self, epoch, logs=None):`,
        `        if (epoch + 1) % 10 == 0 or epoch == 0:`,
        `            # Dynamic log: prints all available metrics in the logs dictionary`,
        `            metrics_str = " - ".join([f"{k}: {v:.4f}" for k, v in logs.items()])`,
        `            print(f"Epoch {epoch+1}: {metrics_str}")`,
        ``,
        `freq_callback = SigmaLogger()`,
        `print(f'\\n[TRAINING]: Starting ${model_name}...')`, 
        `callbacks_list = [freq_callback]`,
        `v_mode = 0`,
        ``,
        `weights = class_weight.compute_class_weight('balanced', classes=np.unique(y_train), y=y_train)`,
        `cw_dict = {i: weights[i] for i in range(len(weights))}`,
        `history = ${model_name}.fit(X_train, y_train, epochs=${epochs}, batch_size=${batchSize}, class_weight=cw_dict, verbose=v_mode, callbacks=callbacks_list)`,
        ``,
        `# Final summary of all metrics`,
        `metrics_results = ", ".join([f"{k.capitalize()}: {v[-1]:.4f}" for k, v in history.history.items() if not k.startswith('val_')])`,
        `print(f"[TRAINING]: Complete. {metrics_results}")`
    ].join('\n') + '\n';
};
}