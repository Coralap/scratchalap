import * as Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python';

const BLOCK_TYPE = 'plot_history';

export function registerPlotBlock() {
    Blockly.Blocks[BLOCK_TYPE] = {
        init: function () {
            this.appendDummyInput()
                .appendField("Visualize")
                .appendField(new Blockly.FieldDropdown([
                    ["Training Loss", "loss"],
                    ["Training Accuracy", "accuracy"],
                    ["Confusion Matrix", "confusion_matrix"]
                ]), "METRIC");

            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour("#D9534F");
            this.setTooltip('Visualizes training history or model error distribution.');
        }
    };

    pythonGenerator.forBlock[BLOCK_TYPE] = (block, generator) => {
        const metric = block.getFieldValue('METRIC');
        const model_name = generator.activeModelName || 'myModel';
        
        if (metric === 'confusion_matrix') {
            return [
                `import matplotlib.pyplot as plt`,
                `import seaborn as sns`,
                `from sklearn.metrics import confusion_matrix`,
                `import numpy as np`,
                ``,
                `# 1. Get predictions on test set`,
                `y_pred = (${model_name}.predict(X_test, verbose=0) > 0.5).astype("int32")`,
                `cm = confusion_matrix(y_test, y_pred)`,
                ``,
                `# 2. Plotting`,
                `plt.figure(figsize=(6, 5))`,
                `sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', cbar=False)`,
                `plt.title('Confusion Matrix')`,
                `plt.ylabel('Actual Label')`,
                `plt.xlabel('Predicted Label')`,
                `if 'le' in locals():`,
                `    plt.xticks(np.arange(len(le.classes_))+0.5, le.classes_)`,
                `    plt.yticks(np.arange(len(le.classes_))+0.5, le.classes_)`,
                `plt.show()`
            ].join('\n') + '\n';
        }

        return [
            `import matplotlib.pyplot as plt`,
            `plt.figure(figsize=(10, 5))`,
            `plt.plot(history.history['${metric}'])`,
            `plt.title('Model ${metric.charAt(0).toUpperCase() + metric.slice(1)}')`,
            `plt.ylabel('${metric}')`,
            `plt.xlabel('Epoch')`,
            `plt.legend(['Train'], loc='upper left')`,
            `plt.grid(True)`,
            `plt.show()`
        ].join('\n') + '\n';
    };
}