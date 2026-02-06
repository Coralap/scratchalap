import * as Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python';

const BLOCK_TYPE = 'model_evaluate';

export function registerEvaluateBlock() {
    Blockly.Blocks[BLOCK_TYPE] = {
        init: function () {
            this.appendDummyInput()
                .appendField("Evaluate Model Performance");
            
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour("#27ae60");
            this.setTooltip('Tests the model on the X_test and y_test data to get the final score.');
        }
    };

    pythonGenerator.forBlock[BLOCK_TYPE] = (block, generator) => {
        const model_name = generator.activeModelName || 'myModel';
        
        return [
            `print("\\n[EVALUATION]: Testing on unseen data...")`,
            `eval_results = ${model_name}.evaluate(X_test, y_test, verbose=0)`,
            `# Keras returns [loss, accuracy]`,
            `print(f"Final Test Loss: {eval_results[0]:.4f}")`,
            `print(f"Final Test Accuracy: {eval_results[1]*100:.2f}%")`,
            ``
        ].join('\n') + '\n';
    };
}