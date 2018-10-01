

let createButtonsMarkup = (idData) => {

    var div = document.createElement('div')
    div.className = 'grid-item action';

    let button1 = `<button class=delete data = ${idData}>Delete</button>`
    let markup = button1

    div.innerHTML = markup

    return div
}


let createGridItemMarkup = (propertyName, bookData) => {

    var div = document.createElement('div')
    div.className = 'grid-item';

    let markup = `<p class="item-text" data = ${propertyName} >${bookData}</p>`

    div.innerHTML = markup

    return div
}


let addGridItemMarkup = (htmlMarkup) => {
    document.querySelector('.grid').appendChild(htmlMarkup)
}


let countInArray = (array, what) => {
    return array.filter(item => item.author == what).length;
}


let uniqueAuthors = (arr) => {
    let unique = []
    for (elem of arr) {
        if (unique.indexOf(elem.author) == -1) {
            unique.push(elem.author)
        }
    }
    return unique
}


//deletes all grid elements except first row
let deleteAllElems = () => {

    let allElements = document.querySelectorAll('.grid-item')

    for (element of allElements) {
        if (!element.classList.contains('first')) {
            element.outerHTML = ''
        }
    }

}


//populate books data
let populateData = () => {

    let localBooksData = localStorage.getItem('booksData')
    localBooksData = JSON.parse(localBooksData)

    let authors = uniqueAuthors(localBooksData)

    for (author of authors) {

        let idAuthorName = author.split(' ').join('-')

        let authorMarkup = createGridItemMarkup(idAuthorName, author)
        addGridItemMarkup(authorMarkup)

        let count = countInArray(localBooksData, author)
        let countMarkup = createGridItemMarkup('count', count)
        addGridItemMarkup(countMarkup)

        let htmlButtonsMarkup = createButtonsMarkup(idAuthorName)
        addGridItemMarkup(htmlButtonsMarkup)
    }

    startListeners()
}

//add listeners on buttons
let startListeners = () => {

    let localBooksData = localStorage.getItem('booksData')
    localBooksData = JSON.parse(localBooksData)
    let buttons = document.querySelectorAll('.delete')

    for (button of buttons) {
        button.onclick = event => {
            
            console.log('clicked', event.target.getAttribute('data'))
            let clickedBookId = event.target.getAttribute('data')
            let normalAuthorName = clickedBookId.split('-').join(' ')

            let updatedBooksData = []

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

let populateStorage = () => {
    localStorage.setItem('booksData', JSON.stringify(booksData))
    populateData()
}

//  populateStorage()
if (!localStorage.getItem('booksData')) {
    populateStorage()
} else {
    populateData()
}
