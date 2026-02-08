import * as Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python';

const { ipcRenderer } = window.require('electron');
const BLOCK_TYPE = 'load_model';

export function registerLoadModelBlock() {
    Blockly.Blocks[BLOCK_TYPE] = {
        init: function () {
            const browseIcon = new Blockly.FieldImage(
                "assets/folder_icon.png", 
                16, 
                16, 
                "Browse", 
                async () => {
                    const filePath = await ipcRenderer.invoke('open-file-dialog', 'model'); 
                    if (filePath) {
                        this.setFieldValue(filePath, 'FILENAME');
                    }
                }
            );

            this.appendDummyInput()
                .appendField("Load Model")
                .appendField(browseIcon, "BROWSE");

            this.appendDummyInput()
                .appendField("File:")
                .appendField(new Blockly.FieldTextInput("model.keras"), "FILENAME");

            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour("#5E4085");
            this.setTooltip('Load a pre-trained model file.');
        }
    };

    pythonGenerator.forBlock[BLOCK_TYPE] = (block, generator) => {
        const filename = block.getFieldValue('FILENAME');
        const model_name = "myModel"; 
        
        generator.model_name = model_name;

        return [
            `from tensorflow.keras.models import load_model`,
            `${model_name} = load_model(r'${filename}')`,
            `print(f"[SYSTEM]: Successfully loaded model from ${filename}")`,
            `${model_name}.summary()`
        ].join('\n') + '\n';
    };
}