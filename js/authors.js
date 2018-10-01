

const createButtonsMarkup = (idData) => {

    let div = document.createElement('div')
    div.className = 'grid-item action';

    const button1 = `<button class=delete data = ${idData}>Delete</button>`

    div.innerHTML = button1

    return div
}


const createGridItemMarkup = (propertyName, bookData) => {

    let div = document.createElement('div')
    div.className = 'grid-item';

    const markup = `<p class="item-text" data = ${propertyName} >${bookData}</p>`

    div.innerHTML = markup

    return div
}


const addGridItemMarkup = (htmlMarkup) => {
    document.querySelector('.grid').appendChild(htmlMarkup)
}


const countInArray = (array, what) => {
    return array.filter(item => item.author == what).length;
}


const uniqueAuthors = (arr) => {
    const unique = []
    for (elem of arr) {
        if (unique.indexOf(elem.author) == -1) {
            unique.push(elem.author)
        }
    }
    return unique
}


//deletes all grid elements except first row
const deleteAllElems = () => {

    const allElements = document.querySelectorAll('.grid-item')

    for (element of allElements) {
        if (!element.classList.contains('first')) {
            element.outerHTML = ''
        }
    }

}


//populate books data
const populateData = () => {

    let localBooksData = localStorage.getItem('booksData')
    localBooksData = JSON.parse(localBooksData)

    const authors = uniqueAuthors(localBooksData)

    for (author of authors) {

        const idAuthorName = author.split(' ').join('-')

        const authorMarkup = createGridItemMarkup(idAuthorName, author)
        addGridItemMarkup(authorMarkup)

        const count = countInArray(localBooksData, author)
        const countMarkup = createGridItemMarkup('count', count)
        addGridItemMarkup(countMarkup)

        const htmlButtonsMarkup = createButtonsMarkup(idAuthorName)
        addGridItemMarkup(htmlButtonsMarkup)
    }

    startListeners()
}

//add listeners on buttons
const startListeners = () => {

    let localBooksData = localStorage.getItem('booksData')
    localBooksData = JSON.parse(localBooksData)
    let buttons = document.querySelectorAll('.delete')

    for (button of buttons) {
        button.onclick = event => {
            
            console.log('clicked', event.target.getAttribute('data'))
            const clickedBookId = event.target.getAttribute('data')
            const normalAuthorName = clickedBookId.split('-').join(' ')

            const updatedBooksData = []

            //find and delete Author data
            for ([index, book] of localBooksData.entries()) {
                if (book.author == normalAuthorName) {
                    console.log('found, deleted')
                }
                else {
                    updatedBooksData.push(book)
                }
            }

            localStorage.setItem('booksData', JSON.stringify(updatedBooksData))
            deleteAllElems()
            populateData()

        }
    }

}


if (!localStorage.getItem('booksData')) {
    try{
        localStorage.setItem('booksData', JSON.stringify(booksData))
        populateData()
    }
    catch(e){   //Catch any error if localStorage is disabled
        alert('Please Enable localStorage')
        console.log(e)
        populateData()
    }
} else {
    populateData()
}
