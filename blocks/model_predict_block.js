import * as Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python';

const BLOCK_TYPE = 'model_predict';

export function registerPredictBlock() {
    Blockly.Blocks[BLOCK_TYPE] = {
        init: function () {
            this.appendDummyInput()
                .appendField("Predict Result");

            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour("#3498db");
            this.setTooltip('predicts the output for the input data using the trained model.');
        }
    };

    pythonGenerator.forBlock[BLOCK_TYPE] = (block, generator) => {
        const model_name = generator.activeModelName || 'myModel';
        
        return [
            `raw_prediction = ${model_name}.predict(new_data, verbose=0)`,
            `# Convert probability to class (0 or 1)`,
            `prediction_class = (raw_prediction > 0.5).astype("int32")[0][0]`,
            ``,
            `if 'le' in locals():`,
            `    result_text = le.inverse_transform([prediction_class])[0]`,
            `else:`,
            `    result_text = str(prediction_class)`,
            ``,
            `print(f"\\n[PREDICTION]: Raw Output Score: {raw_prediction[0][0]:.4f}")`,
            `print(f"[RESULT]: The model predicts: {result_text}")`
        ].join('\n') + '\n';
    };
}