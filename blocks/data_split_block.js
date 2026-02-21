import * as Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python';

const BLOCK_TYPE = 'data_split';

export function registerDataSplitBlock() {
    Blockly.Blocks[BLOCK_TYPE] = {
        init: function () {
            this.appendDummyInput()
                .appendField("Split & Auto-Encode Data");
            
            this.appendDummyInput()
                .appendField("Target Column:")
                .appendField(new Blockly.FieldTextInput("y"), "TARGET");

            this.appendDummyInput()
                .appendField("Test Size:")
                .appendField(new Blockly.FieldDropdown([
                    ["20%", "0.2"],
                    ["10%", "0.1"],
                    ["30%", "0.3"]
                ]), "TEST_SIZE");

            this.setPreviousStatement(true, "dataframe"); 
            this.setNextStatement(true); 
            
            this.setColour("#34495e");
            this.setTooltip('Automatically encodes text in ALL columns and splits into Train/Test sets.');
        }
    };

    pythonGenerator.forBlock[BLOCK_TYPE] = (block, generator) => {
        const target = block.getFieldValue('TARGET');
        const testSize = block.getFieldValue('TEST_SIZE');
        
        return [
            `from sklearn.model_selection import train_test_split`,
            `from sklearn.preprocessing import LabelEncoder`,
            `import pandas as pd`,
            ``,
            `df_processed = df.copy()`,
            `encoders = {}`,
            ``,
            `for col in df_processed.columns:`,
            `    if df_processed[col].dtype == 'object':`,
            `        le = LabelEncoder()`,
            `        df_processed[col] = le.fit_transform(df_processed[col].astype(str))`,
            `        encoders[col] = le`,
            `        if col == '${target}':`,
            `            globals()['le'] = le  # Save target encoder for the Predict block`,
            `        print(f"[DATA]: Encoded column '{col}': {list(le.classes_)}")`,
            ``,
            `X = df_processed.drop(columns=['${target}']).values.astype('float32')`,
            `y = df_processed['${target}'].values`,
            `globals()['target_col'] = '${target}'`,
            ``,
            `X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=${testSize}, random_state=42)`,
            `print(f"[DATA]: Encoding & Split complete. Features shape: {X.shape}")`
        ].join('\n') + '\n';
    };
}