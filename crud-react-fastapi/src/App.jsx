import { useState, useEffect } from "react"
import './index.css'

function BooksItems({title,author,id,year,score,review, handlerDeleteButton}){
  return(
    <article className="w-96 bg-gray-100 rounded-xl
     shadow-lg shadow-gray-700 mx-auto mt-10 p-5 flex-item">
      <h3 className="text-center text-2xl mb-5">{title}</h3>
      <p className="">Author: {author}</p>
      <p className="">Year: {year}</p>
      <p className="">Score: {score}</p>
      <p className="">Review: {review}</p>
      <div className="flex justify-center my-5">
        <button className="bg-red-700 text-gray-100 w-32 font-semibold
          rounded-xl h-10 hover:bg-red-900 hover:text-gray-200" onClick ={handlerDeleteButton}>Delete</button>
      </div>
      
    </article>
  )
}

function App() {
  const [books, setBooks] = useState([])
  const[dataForm, setDataForm] = useState({
    "title": "",
    "author":"",
    "year": "",
    "score":"",
    "review":""

  })

  const getBooks = async() => {
    const allBooks = await fetch("http://127.0.0.1:8000/api/v1/books")
    const booksJson = await allBooks.json()
    setBooks(booksJson)
  }

  const handlerFormInput =(e) => {
    setDataForm(
      {
          ...dataForm,
          [e.target.name]: e.target.value
      }
    )
  }

  const handlerFormSubmit = async (e) => {
    e.preventDefault()
    
    await fetch(`http://127.0.0.1:8000/api/v1/books`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataForm)
      })

      getBooks();
      setDataForm({
        "title": "",
        "author":"",
        "year": "",
        "score":"",
        "review":""
      });
    }

    const handlerDeleteButton = async (id) => {
      await fetch(`http://127.0.0.1:8000/api/v1/books/${id}`,{
        method: "DELETE"
        })
        getBooks()
      }

  useEffect(()=>{
    getBooks()
  },[])

  return (
    <main  className="w-full min-h-screen ColorBackground text-gray-800 pb-10"> 
      <h1 className="text-3xl font-bold text-center title py-10">Library </h1>

      <div className="center ">
        <section className="form contentForm">
          <h1 className="center titleForm">Review</h1>
          <form id="FormReview" className="flex form flex-col justify-center items-center px-5 my-1"
          onSubmit={handlerFormSubmit}>
            
            <input className="w-96 h-8 pl-3 text-gray-700 rounded-xl my-3" 
            onChange={handlerFormInput} value={dataForm.title} type="text" name="title" required placeholder="Title..."/>
            <input className="w-96 h-8 pl-3 text-gray-700 rounded-xl my-3" 
            onChange={handlerFormInput} value={dataForm.author} type="text" name="author" required placeholder="Author..."/>
            <input className="w-96 h-8 pl-3 text-gray-700 rounded-xl my-3" 
            onChange={handlerFormInput} value={dataForm.year} type="number" name="year" required placeholder="Year..."/>
            <input className="w-96 h-8 pl-3 text-gray-700 rounded-xl my-3" 
            onChange={handlerFormInput} value={dataForm.score} type="number" name="score" required placeholder="Score..."/>
             <input className="w-96 h-8 pl-3 text-gray-700 rounded-xl my-3" 
            onChange={handlerFormInput} value={dataForm.review} type="text" name="review" required placeholder="Review..."/>
            <input className=" button  rounded-xl font-semibold hover:cursor-pointer mb-3 "
            type="submit" value="Create"/>

          </form>
        </section>
      </div>  
      <div className="containerReview">
        {
          books.length === 0 ? "Loader ...": books.map(book =>(
              <BooksItems 
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                score={book.score}
                year={book.year}
                review={book.review}
                handlerDeleteButton = { ()=> handlerDeleteButton(book.id)}
              />
            ))
        }
      </div>
    </main>
  )
}

export default App
