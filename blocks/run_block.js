import * as Blockly from 'blockly/core';
const BLOCK_TYPE = 'run_container';

export function registerRunBlock() {
    Blockly.Blocks[BLOCK_TYPE] = {
        init: function() {
            this.appendDummyInput()
                .appendField("RUN")
                .appendField(new Blockly.FieldImage(
                    "assets/play.png", 
                    24, 
                    24, 
                    "*", 
                    function(fieldImage) {
                        window.runSpecificBlock(fieldImage.getSourceBlock());
                    }
                ), "RUN_BUTTON");
            this.appendStatementInput("STACK").setCheck(null);
            this.setColour("#2D3648");
        }
    };
        
}


