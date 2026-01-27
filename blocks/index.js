import { registerPrintBlock } from './print_block.js';
import { registerModelBlock } from './model_block.js';
import { registerDenseLayerBlock } from './dense_block.js';
import { registerInputSizeBlock } from './input_size_block.js';
import { registerOutputSizeBlock } from './output_size_block.js';
import { registerCompileBlock } from './compile_block.js';
import { registerRunBlock } from './run_block.js';


export function initBlocks() {
  registerPrintBlock();
  registerModelBlock();
  registerDenseLayerBlock();
  registerInputSizeBlock();
  registerOutputSizeBlock();
  registerCompileBlock();
  registerRunBlock();
}