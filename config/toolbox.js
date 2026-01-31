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
              "shadow": { "type": "math_number", "fields": { "NUM": 1 } }
            }
          }
        },
        {
          "kind": "block",
          "type": "dense_layer",
          "inputs": {
            "NEURONS": {
              "shadow": { "type": "math_number", "fields": { "NUM": 1 } }
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
              "shadow": { "type": "math_number", "fields": { "NUM": 0.1 } }
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
        {
          "kind": "block",
          "type": "fit",
          "inputs": {
            "EPOCHS": {
              "shadow": { "type": "math_number", "fields": { "NUM": 10 } }
            },
            "BATCH_SIZE": {
              "shadow": { "type": "math_number", "fields": { "NUM": 32 } }
            }
          }
        }
      ]
    },
    {
      "kind": "category",
      "name": "Variables",
      "colour": "#4A90E2",
      "contents": [
        { "kind": "block", "type": "math_number", "fields": { "NUM": 0 } },
        { "kind": "block", "type": "text", "fields": { "TEXT": "" } },
        { "kind": "block", "type": "logic_boolean", "fields": { "BOOL": "TRUE" } }
      ]
    },
    {
      "kind": "category",
      "name": "Debug",
      "colour": "#D9534F",
      "contents": [
        { "kind": "block", "type": "run_container" },
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