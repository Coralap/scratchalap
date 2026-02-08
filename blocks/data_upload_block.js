import * as Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python';

const { ipcRenderer } = window.require('electron');
const BLOCK_TYPE = 'upload_data';

export function registerDataUploadBlock() {
    Blockly.Blocks[BLOCK_TYPE] = {
        init: function () {
            const browseIcon = new Blockly.FieldImage(
                "assets/folder_icon.png", 
                16, 
                16, 
                "Browse", 
                async () => {
                    const filePath = await ipcRenderer.invoke('open-file-dialog', 'csv');
                    if (filePath) {
                        const targetBlock = this.getInputTargetBlock('VALUE');
                        targetBlock?.setFieldValue(filePath, 'TEXT');
                    }
                }
            );

            this.appendDummyInput()
                .appendField("CSV Loader")
                .appendField(browseIcon, "BROWSE");

            this.appendValueInput('VALUE')
                .setCheck('String')
                .appendField("Path:");

            this.setPreviousStatement(true);
            this.setNextStatement(true,"dataframe");
            this.setColour("#2A2D34");
            this.setTooltip('Select a CSV file to load into a DataFrame');
        }
    };

    pythonGenerator.forBlock[BLOCK_TYPE] = (block, generator) => {
        const path = generator.valueToCode(block, 'VALUE', generator.ORDER_ATOMIC) || '""';
        return [
            `df = pd.read_csv(r${path})`,
            `print(f"Loaded CSV: {len(df)} rows")`
        ].join('\n') + '\n';
    };
}