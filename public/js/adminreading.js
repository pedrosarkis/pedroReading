
const fetchToSearchBook = async () => {
    const bookData = await (await fetch('/admin/getallbooks')).json()
    
    const bookDataToInnerHTML = bookData.map((book, count) => `<div class="container card">
      <div class="row">
      <div class="col-sm-6">
          <img  class='card-img' src="${book.image}" >
      </div>
      <div class="col-sm-6">
      <p><b> Sinopse </b> </p>
          ${book.synopsis}  <br>
          <p> <b> Este livro contém ${book.pages} páginas. </b> </p>
          <p> <b> Este livro foi inserido pelo ${book.user} </b></p>
      </div>
  </div>
  <div id="accordion">
      <button class="btn" data-toggle="collapse" data-target="#collapse${count}" aria-expanded="true">Resenha</button>
      <div id="collapse${count}" class="collapse hide" aria-labelledby="headingOne" data-parent="#accordion" aria-controls="collapseOne">
          <div class="card-body">
             <p class='review'>${book.review}</p>
          </div>
      </div>
  </div>
  </div>`)

    $('#append').append(bookDataToInnerHTML)
}

fetchToSearchBook()

