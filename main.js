import * as libraryBlocks from 'blockly/blocks';
import * as Blockly from 'blockly/core';
import * as En from 'blockly/msg/en';
import { toolbox } from './config/toolbox.js';
import { initBlocks } from './blocks/index.js';
import { componentStyle } from './config/design.js';
import { initWindowControls } from './windowControls.js';
import { initRunners } from './codeRunner.js';

// Setup
Blockly.setLocale(En);
initBlocks();

const theme = Blockly.Theme.defineTheme('darkMode', {
   'base': Blockly.Themes.Classic,
   'componentStyles': componentStyle
});

// Injection
const workspace = Blockly.inject('blocklyDiv', { theme, toolbox });

// Workspace Config
const flyout = workspace.getFlyout();
if (flyout) flyout.setAutoClose(false);

// Initialize modules
initWindowControls();
initRunners(workspace);

window.addEventListener('resize', () => Blockly.svgResize(workspace));