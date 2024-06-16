from pydantic import BaseModel

class BookId(BaseModel):
    id: int
    title: str
    author:str
    year:  int
    score: int
    review:str



class Book(BaseModel):
    title: str
    author:str
    year:  int
    score: int
    review: str