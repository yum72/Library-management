

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
    return array.filter(item => item.publisher == what).length;
}


const uniquePublishers = (arr) => {
    const unique = []
    for (elem of arr) {
        if (unique.indexOf(elem.publisher) == -1) {
            unique.push(elem.publisher)
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

    const publishers = uniquePublishers(localBooksData)

    for (publisher of publishers) {

        const idPublisherName = publisher.split(' ').join('-')

        const publisherMarkup = createGridItemMarkup(idPublisherName, publisher)
        addGridItemMarkup(publisherMarkup)

        const count = countInArray(localBooksData, publisher)
        const countMarkup = createGridItemMarkup('count', count)
        addGridItemMarkup(countMarkup)

        const htmlButtonsMarkup = createButtonsMarkup(idPublisherName)
        addGridItemMarkup(htmlButtonsMarkup)
    }

    startListeners()
}

//add listeners on buttons
const startListeners = () => {

    let localBooksData = localStorage.getItem('booksData')
    localBooksData = JSON.parse(localBooksData)
    const buttons = document.querySelectorAll('.delete')

    for (button of buttons) {
        button.onclick = event => {
            
            console.log('clicked', event.target.getAttribute('data'))
            const clickedBookId = event.target.getAttribute('data')
            const normalPublisherName = clickedBookId.split('-').join(' ')

            const updatedBooksData = []

            //find and delete Author data
            for ([index, book] of localBooksData.entries()) {
                if (book.publisher == normalPublisherName) {
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

const populateStorage = () => {
    localStorage.setItem('booksData', JSON.stringify(booksData))
    populateData()
}

//  populateStorage()
if (!localStorage.getItem('booksData')) {
    populateStorage()
} else {
    populateData()
}
