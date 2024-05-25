
const getElementsValues = () => {
    const title = document.getElementById('title').value
    const pages = document.getElementById('pages').value
    const synopsis = document.getElementById('synopsis').value
    const review = document.getElementById('review').value
    const image = document.getElementById('image').value

    return {
        title,
        pages,
        synopsis,
        review,
        image,

    }
}

const sendBookToSave = () => {
    const bookInformation = getElementsValues()

    const validationNullObject = Object.values(bookInformation).some((objectNull) => objectNull == '')

    if (!validationNullObject) {
        fetch('books/savebook', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(bookInformation),
        })
            .then((response) => response.text())
            .then((dado) => {
                if (dado == 'Ok') {
                    alert('Cadastrado com sucesso')
                } cleanAfterPost()
            })
            .catch((error) => {
                console.log(error)
            })
    } else {
        alert('Preencha todos os campos')
    }
}
  
const cleanAfterPost = () => {
    const allElementsArray = Array.from(document.getElementsByTagName('*'))
    allElementsArray.forEach((element) => {
        element.value = ''
    })
}

document.getElementById('submit').addEventListener('click', sendBookToSave)

