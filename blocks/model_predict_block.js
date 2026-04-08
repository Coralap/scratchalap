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
            `# Check if data needs normalization before prediction`,
            `if 'scaler' in globals():`,
            `    input_data = globals()['scaler'].transform(new_data)`,
            `else:`,
            `    input_data = new_data`,
            ``,
            `raw_prediction = ${model_name}.predict(input_data, verbose=0)`,
            `# Convert probability to class (0 or 1)`,
            `prediction_class = (raw_prediction > 0.5).astype("int32")[0][0]`,
            ``,
            `if 'le' in locals() or 'le' in globals():`,
            `    encoder = locals().get('le', globals().get('le'))`,
            `    result_text = encoder.inverse_transform([prediction_class])[0]`,
            `else:`,
            `    result_text = str(prediction_class)`,
            ``,
            `print(f"\\n[PREDICTION]: Raw Output Score: {raw_prediction[0][0]:.4f}")`,
            `print(f"[RESULT]: The model predicts: {result_text}")`
        ].join('\n') + '\n';
    };
}