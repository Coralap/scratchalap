from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeSubmission(BaseModel):
    code: str

@app.post("/run")
async def run_code(submission: CodeSubmission):
    print(f"--- Received Code ---\n{submission.code}\n---------------------------")
    
    return {
        "status": "success",
        "received_code": submission.code,
        "message": "server received the code successfully"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5000)