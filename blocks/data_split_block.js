import * as Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python';

const BLOCK_TYPE = 'data_split';

export function registerDataSplitBlock() {
    Blockly.Blocks[BLOCK_TYPE] = {
        init: function () {
            this.appendDummyInput()
                .appendField("Split, Encode & Normalize Data");
            
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
            this.setTooltip('Automatically encodes labels, splits data, and applies StandardScaler normalization.');
        }
    };

    pythonGenerator.forBlock[BLOCK_TYPE] = (block, generator) => {
        const target = block.getFieldValue('TARGET');
        const testSize = block.getFieldValue('TEST_SIZE');
        
        return [
            `from sklearn.model_selection import train_test_split`,
            `from sklearn.preprocessing import LabelEncoder, StandardScaler`,
            `import pandas as pd`,
            `import numpy as np`,
            ``,
            `# 1. Cleaning & Copying`,
            `df = df.dropna()`,
            `df_processed = df.copy()`,
            `encoders = {}`,
            ``,
            `# 2. Automatic Label Encoding for Categorical Data`,
            `for col in df_processed.columns:`,
            `    if df_processed[col].dtype == 'object':`,
            `        le = LabelEncoder()`,
            `        df_processed[col] = le.fit_transform(df_processed[col].astype(str))`,
            `        encoders[col] = le`,
            `        if col == '${target}':`,
            `            globals()['le'] = le`,
            `        print(f"[DATA]: Encoded column '{col}': {list(le.classes_)}")`,
            ``,
            `# 3. Features & Target separation`,
            `X = df_processed.drop(columns=['${target}']).values.astype('float32')`,
            `y = df_processed['${target}'].values`,
            `globals()['target_col'] = '${target}'`,
            ``,
            `# 4. Train/Test Split`,
            `X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=${testSize}, random_state=42)`,
            ``,
            `# 5. AUTOMATIC NORMALIZATION (StandardScaler)`,
            `scaler = StandardScaler()`,
            `X_train = scaler.fit_transform(X_train)`,
            `X_test = scaler.transform(X_test)`,
            `globals()['scaler'] = scaler # Saved for future inference`,
            ``,
            `print(f"[DATA]: Normalization complete. All features scaled to Mean=0, Std=1.")`,
            `print(f"[DATA]: Final Features shape: {X_train.shape}")`
        ].join('\n') + '\n';
    };
}