from pydantic import BaseModel

class BookId(BaseModel):
    id: int
    title: str
    year:  int
    score: int



class Book(BaseModel):
    title: str
    year:  int
    score: int