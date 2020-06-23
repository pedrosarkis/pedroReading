
  const fetchToGetAllBooks = async () => {
    const allBooksPromise = await fetch('/books/allbooks');
    const allBooksData = await allBooksPromise.json();
    const allBookFormated = allBooksData.map((book) => `<div> Livro ${book.title}  <br>
             Lido por ${book.user} <br> 
             Livro possui ${book.pages} páginas </div> <Br> <br>`);

    $('#append').append(allBookFormated);
  }

  fetchToGetAllBooks();

