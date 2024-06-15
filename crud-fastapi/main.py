from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Annotated
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from Models.books import Book

app = FastAPI()

models.Base.metadata.create_all(bind= engine)
origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_methods= ["*"],
    allow_headers=["*"]
)



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close

db_dependency = Annotated[Session, Depends(get_db)]
""" 
@app.get("/")
def root():
    return {
        "message":"Hi, this is my app"
    }

@app.get("/api/v1/books", response_model=list[Book])
def get_books():
    return books_db

@app.get("/api/v1/books/{book_id}",response_model=Book)
def get_book(book_id: int):
    for book in books_db:
        if book["id"] == book_id:
            return book
    raise HTTPException(status_code=404, detail="Book not found") """

""" 
@app.post("/api/v1/books",response_model=Book)
def create_book(book_data: Book):
    new_book = book_data.model_dump()
    books_db.append(new_book)
    return new_book
      """
@app.get("/api/v1/books", response_model=List[Book])
def get_books(db: Session = Depends(get_db)):
    books = db.query(models.Books).all()
    if not books:
        return []
    return books

@app.post("/api/v1/books")
def create_book(book: Book, db:db_dependency):
    db_book= models.Books(title=book.title, year=book.year,score=book.score)
    db.add(db_book)
    db.commit()

    

""" @app.delete("/api/v1/books/{book_id}", response_model=Book)
def delete_book(book_id: int):
    for book in books_db:
        if book["id"] == book_id:
            book_deleted =book
            books_db.remove(book)
            return book_deleted
    raise HTTPException(status_code=404,detail="Book not found") """