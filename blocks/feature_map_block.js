import * as Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python';

const BLOCK_TYPE = 'feature_map';

export function registerFeatureMapBlock() {
    Blockly.Blocks[BLOCK_TYPE] = {
        init: function () {
            this.appendDummyInput()
                .appendField("Show Encoding Map");
            
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour("#34495e");
            this.setTooltip('Prints a dictionary mapping original text labels to their new numerical values.');
        }
    };

    pythonGenerator.forBlock[BLOCK_TYPE] = (block, generator) => {
        return [
            `print("\\n--- FEATURE ENCODING MAP ---")`,
            `if 'encoders' in locals() and encoders:`,
            `    for col, le in encoders.items():`,
            `        mapping = dict(zip(le.classes_, range(len(le.classes_))))`,
            `        print(f"{col}: {mapping}")`,
            `else:`,
            `    print("No categorical columns were encoded.")`,
            `print("----------------------------\\n")`
        ].join('\n') + '\n';
    };
}