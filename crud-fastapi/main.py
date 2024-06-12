from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware



from model.books import Book

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_methods= ["*"],
    allow_headers=["*"]
)

books_db = [

    {
        "id":0,
        "title": "Book 1",
        "year": "2005",
        "score":5
    },
    {
        "id":1,
        "title": "Book 2",
        "year": "2952",
        "score":4
    },
    {
        "id":2,
        "title": "Book 3",
        "year": "1997",
        "score": 2
    },
]

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
    raise HTTPException(status_code=404, detail="Book not found")


@app.post("/api/v1/books",response_model=Book)
def create_book(book_data: Book):
    new_book = book_data.model_dump()
    books_db.append(new_book)
    return new_book

@app.delete("/api/v1/books/{book_id}", response_model=Book)
def delete_book(book_id: int):
    for book in books_db:
        if book["id"] == book_id:
            book_deleted =book
            books_db.remove(book)
            return book_deleted
    raise HTTPException(status_code=404,detail="Book not found")