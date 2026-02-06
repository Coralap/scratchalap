import { registerPrintBlock } from './print_block.js';
import { registerModelBlock } from './model_block.js';
import { registerDenseLayerBlock } from './dense_block.js';
import { registerInputSizeBlock } from './input_size_block.js';
import { registerOutputSizeBlock } from './output_size_block.js';
import { registerCompileBlock } from './compile_block.js';
import { registerRunBlock } from './run_block.js';
import { registerDataUploadBlock } from './data_upload_block.js';
import { registerDataSplitBlock } from './data_split_block.js';
import { registerFitBlock } from './fit_block.js';
import { registerLogFrequencyBlock } from './fit_log_frequency_block.js';
import { registerPlotBlock } from './plot_block.js';
import { registerEvaluateBlock } from './model_evaluate_block.js';
import { registerInputDataBlock } from './input_data_block.js';
import { registerPredictBlock } from './model_predict_block.js';

export function initBlocks() {
  registerPrintBlock();
  registerModelBlock();
  registerDenseLayerBlock();
  registerInputSizeBlock();
  registerOutputSizeBlock();
  registerCompileBlock();
  registerRunBlock();
  registerDataUploadBlock();
  registerDataSplitBlock();
  registerFitBlock();
  registerLogFrequencyBlock();
  registerPlotBlock();
  registerEvaluateBlock();
  registerInputDataBlock();
  registerPredictBlock();
}