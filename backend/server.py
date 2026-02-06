from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import sys, io, traceback, uvicorn
import pandas as pd
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Sequential, Dense, Input, Dropout
app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

class CodeSubmission(BaseModel):
    code: str

@app.post("/run")
async def run_code(submission: CodeSubmission):
    output_capture = io.StringIO()
    sys.stdout = output_capture
    error_info = None
    
    try:
        exec(submission.code, globals(), globals())
    except Exception:
        error_info = traceback.format_exc()
    finally:
        sys.stdout = sys.__stdout__

    return {
        "status": "success" if not error_info else "error",
        "output": output_capture.getvalue(),
        "code": submission.code,
        "error": error_info
    }

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5000)