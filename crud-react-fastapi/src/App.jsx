import { useState, useEffect } from "react"

function BooksItems({title, id,year,score, handlerDeleteButton}){
  return(
    <article className="w-96 bg-gray-100 rounded-xl
     shadow-lg shadow-gray-700 mx-auto mt-10 p-5">
      <h3 className="text-center text-2xl mb-5">{title}</h3>
      <p className="">Year: {year}</p>
      <p className="">Score: {score}</p>
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
    // "id":"",
    "title": "",
    "year": "",
    "score":""

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

      getBooks()
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
    <main className="w-full min-h-screen bg-gray-300 text-gray-800 pb-10"> 
      <h1 className="text-3xl font-bold text-center py-10">This is my app</h1>

      
      <form className="flex flex-col justify-center items-center px-5 my-5"
       onSubmit={handlerFormSubmit}>
      {/*   <input className="w-96 h-8 pl-3 text-gray-700 rounded-xl my-3"
        onChange={handlerFormInput} value={dataForm.id} type="text" name="id" required placeholder="ID..." /> */}
        <input className="w-96 h-8 pl-3 text-gray-700 rounded-xl my-3" 
        onChange={handlerFormInput} value={dataForm.title} type="text" name="title" required placeholder="Title..."/>
        <input className="w-96 h-8 pl-3 text-gray-700 rounded-xl my-3" 
        onChange={handlerFormInput} value={dataForm.year} type="text" name="year" required placeholder="Year..."/>
        <input className="w-96 h-8 pl-3 text-gray-700 rounded-xl my-3" 
        onChange={handlerFormInput} value={dataForm.score} type="text" name="score" required placeholder="Score..."/>
        <input className="h-10 w-32 bg-green-800 text-gray-100 rounded-xl font-semibold hover:cursor-pointer "
         type="submit" value="Create"/>

      </form>

      <div>
        {
          books.length === 0 ? "Loader ...": books.map(book =>(
              <BooksItems 
                key={book.id}
                id={book.id}
                title={book.title}
                score={book.score}
                year={book.year}
                handlerDeleteButton = { ()=> handlerDeleteButton(book.id)}
              />
            ))
        }
      </div>
    </main>
  )
}

export default App
