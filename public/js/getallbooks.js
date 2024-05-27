
const fetchToGetAllBooks = async () => {
    const allBooksData = await (await fetch('/books')).json()
    const allBookFormated = allBooksData.map((book) => `<div> Livro ${book.title}  <br>
             Lido por ${book.user} <br> 
             Livro possui ${book.pages} páginas </div> <Br> <br>`)

    $('#append').append(allBookFormated)
}

fetchToGetAllBooks()

