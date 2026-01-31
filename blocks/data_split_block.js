import * as Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python';

const BLOCK_TYPE = 'data_split';

export function registerDataSplitBlock() {
    Blockly.Blocks[BLOCK_TYPE] = {
        init: function () {
            this.appendDummyInput()
                .appendField("Split Data");
            
            this.appendDummyInput()
                .appendField("Target Column:")
                .appendField(new Blockly.FieldTextInput("target"), "TARGET");

            this.setPreviousStatement(true, "dataframe"); 
            this.setNextStatement(true); 
            
            this.setColour("#34495e");
            this.setTooltip('Must be connected to a CSV Loader block.');
        }
    };

    pythonGenerator.forBlock[BLOCK_TYPE] = (block, generator) => {
        const target = block.getFieldValue('TARGET');
        
        return [
            `X = df.drop(columns=['${target}']).values.astype('float32')`,
            `y_raw = df['${target}']`,
            `if y_raw.dtype == 'object':`,
            `    from sklearn.preprocessing import LabelEncoder`,
            `    le = LabelEncoder()`,
            `    y = le.fit_transform(y_raw)`,
            `    print(f"[DATA]: Encoded text labels into numbers: {list(le.classes_)}")`,
            `else:`,
            `    y = y_raw.values`,
            `print(f"Features: {X.shape}, Target: {y.shape}")`
        ].join('\n') + '\n';
    };
}