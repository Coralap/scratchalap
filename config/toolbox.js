export const toolbox =
{
  "kind": "categoryToolbox",
  "contents": [

    
    {
      "kind": "category",
      "name": "Debug",
      "contents": [
        {
          "kind": "block",
          "type": "run_container"
        },
        
        {
        "kind": "block",
        "type": "print",
          "shadow": false, 
          "inputs": {
            "VALUE": { 
              "shadow": {
                "type": "text", 
                "fields": {
                  "TEXT": "Hello, World!"
                }
              }
            }
          }
      }, ]
    },
    {
      "kind": "category",
      "name": "Variables",
      "contents": [{
          "kind": "block",
          "type": "math_number",
          "fields": {
            "NUM": 0
          }
        },

        {
          "kind": "block",
          "type": "text",
          "fields": {
            "TEXT": ""
          }
        },
        {
          "kind": "block",
          "type": "logic_boolean",
          "fields": {
            "BOOL": "TRUE"
          }
        }

      ]
    },

    {
      "kind": "category",
      "name": "Model",
      "contents": [{
          "kind": "block",
          "type": "model"
        },
{
          "kind": "block",
          "type": "input_size", 
          "shadow": false, 
          "inputs": {
            "INPUT_SIZE": { 
              "shadow": {
                "type": "math_number", 
                "fields": {
                  "NUM": 1 
                }
              }
            }
          }
        },
{
          "kind": "block",
          "type": "dense_layer", 
          "shadow": false, 
          "inputs": {
            "NEURONS": { 
              "shadow": {
                "type": "math_number", 
                "fields": {
                  "NUM": 1 
                }
              }
            }
          }
        },


{
          "kind": "block",
          "type": "output_size", 
          "shadow": false, 
          "inputs": {
            "OUTPUT_SIZE": { 
              "shadow": {
                "type": "math_number", 
                "fields": {
                  "NUM": 1 
                }
              }
            }
          }
        },

        {
          "kind": "block",
          "type": "compile",
          "shadow": false, 
          "inputs": {
            "LEARNING_RATE": { 
              "shadow": {
                "type": "math_number", 
                "fields": {
                  "NUM": 0.1 
                }
              }
            }
          }
        },
      ]
    }
  ]
};