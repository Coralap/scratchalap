export const toolbox = {
  "kind": "categoryToolbox",
  "contents": [
    {
      "kind": "category",
      "name": "Data",
      "colour": "#2A2D34",
      "contents": [
        {
          "kind": "block",
          "type": "upload_data",
          "inputs": {
            "VALUE": {
              "shadow": {
                "type": "text",
                "fields": { "TEXT": "C:\\path\\to\\your\\data.csv" }
              }
            }
          }
        },
        { "kind": "block", "type": "data_split" }
      ]
    },
    {
      "kind": "category",
      "name": "Model",
      "colour": "#5E4085",
      "contents": [
        { "kind": "block", "type": "model" },
        {
          "kind": "block",
          "type": "input_size",
          "inputs": {
            "INPUT_SIZE": {
              "shadow": { "type": "math_number", "fields": { "NUM": 13 } }
            }
          }
        },
        {
          "kind": "block",
          "type": "dense_layer",
          "inputs": {
            "NEURONS": {
              "shadow": { "type": "math_number", "fields": { "NUM": 32 } }
            }
          }
        },
        {
          "kind": "block",
          "type": "output_size",
          "inputs": {
            "OUTPUT_SIZE": {
              "shadow": { "type": "math_number", "fields": { "NUM": 1 } }
            }
          }
        },
        {
          "kind": "block",
          "type": "compile",
          "inputs": {
            "LEARNING_RATE": {
              "shadow": { "type": "math_number", "fields": { "NUM": 0.001 } }
            }
          }
        }
      ]
    },
    {
      "kind": "category",
      "name": "Train & Test",
      "colour": "#27ae60",
      "contents": [
        { "kind": "block", "type": "fit_log_frequency" },
        {
          "kind": "block",
          "type": "fit",
          "inputs": {
            "EPOCHS": {
              "shadow": { "type": "math_number", "fields": { "NUM": 100 } }
            },
            "BATCH_SIZE": {
              "shadow": { "type": "math_number", "fields": { "NUM": 32 } }
            }
          }
        },
        { "kind": "block", "type": "model_evaluate" }
      ]
    },
    {
      "kind": "category",
      "name": "Inference",
      "colour": "#3498db",
      "contents": [
        { "kind": "block", "type": "input_data" },
        { "kind": "block", "type": "model_predict" } // New Predict block added here
      ]
    },
    {
      "kind": "category",
      "name": "Debug",
      "colour": "#D9534F",
      "contents": [
        { "kind": "block", "type": "run_container" },
        { "kind": "block", "type": "plot_history" },
        {
          "kind": "block",
          "type": "print",
          "inputs": {
            "VALUE": {
              "shadow": {
                "type": "text",
                "fields": { "TEXT": "Hello, World!" }
              }
            }
          }
        }
      ]
    }
  ]
};