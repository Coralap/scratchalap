import * as Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python';

const BLOCK_TYPE = 'fit_log_frequency';

export function registerLogFrequencyBlock() {
    Blockly.Blocks[BLOCK_TYPE] = {
        init: function () {
            this.appendDummyInput()
                .appendField("Log Progress Every")
                .appendField(new Blockly.FieldLabelSerializable(""), "ICON")
                .appendField(new Blockly.FieldNumber(10, 1), "FREQ")
                .appendField("Epochs");

            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour("#27ae60");
            this.setTooltip('Reduces console spam by only printing every X epochs.');
        }
    };

    pythonGenerator.forBlock[BLOCK_TYPE] = (block, generator) => {
        const freq = block.getFieldValue('FREQ');
        
        const code = [
            `class SigmaLogger(tf.keras.callbacks.Callback):`,
            `    def on_epoch_end(self, epoch, logs=None):`,
            `        if (epoch + 1) % ${freq} == 0 or epoch == 0:`,
            `            print(f"Epoch {epoch+1}: loss = {logs['loss']:.4f}, accuracy = {logs['accuracy']:.4f}")`,
            `freq_callback = SigmaLogger()`,
            ``
        ].join('\n');
        return code;
    };
}