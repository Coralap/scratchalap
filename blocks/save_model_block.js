import * as Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python';

const { ipcRenderer } = window.require('electron');
const BLOCK_TYPE = 'save_model';

export function registerSaveModelBlock() {
    Blockly.Blocks[BLOCK_TYPE] = {
        init: function () {
            const saveIcon = new Blockly.FieldImage(
                "assets/folder_icon.png", 
                16, 
                16, 
                "Save Location", 
                async () => {
                    const filePath = await ipcRenderer.invoke('save-file-dialog', 'model.keras');
                    if (filePath) {
                        this.setFieldValue(filePath, 'FILENAME');
                    }
                }
            );

            this.appendDummyInput()
                .appendField("Save Model")
                .appendField(saveIcon, "BROWSE");

            this.appendDummyInput()
                .appendField("Path:")
                .appendField(new Blockly.FieldTextInput("my_model.keras"), "FILENAME");

            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour("#5E4085");
            this.setTooltip('Save the trained model architecture and weights.');
        }
    };

    pythonGenerator.forBlock[BLOCK_TYPE] = (block, generator) => {
        const model_name = generator.activeModelName || 'myModel';
        const filename = block.getFieldValue('FILENAME');
        
        return [
            `# Save model to disk`,
            `# Using raw string (r) for the path to handle Windows backslashes`,
            `${model_name}.save(r'${filename}')`,
            `print(fr"[SYSTEM]: Model saved successfully at: ${filename}")`
        ].join('\n') + '\n';
    };
}