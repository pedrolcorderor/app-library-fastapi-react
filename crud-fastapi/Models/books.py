from pydantic import BaseModel

class Book(BaseModel):
    title: str
    year:  int
    score: int



