const grid = document.querySelector('.grid')


const createButtonsMarkup = (idData) => {

    let div = document.createElement('div')
    div.className = 'grid-item action';

    const button1 = `<button class=delete data = ${idData}>Delete</button>`
    const button2 = `<button class=update data = ${idData}>Update</button>`
    const button3 = `<button class=update-done data = ${idData}>Done</button>`
    const button4 = `<button class=update-cancel data = ${idData}>Cancel</button>`
    const markup = button1 + button2 + button3 + button4

    div.innerHTML = markup

    return div
}


const createGridItemMarkup = (propertyName, bookData) => {

    let div = document.createElement('div')
    div.className = 'grid-item';

    const markup = `<p class="item-text" data = "${propertyName}" >${bookData}</p>`

    div.innerHTML = markup

    return div
}


const addGridItemMarkup = (htmlMarkup) => {
    grid.appendChild(htmlMarkup)
}


//deletes all grid elements except first row
const deleteAllElems = () => {

    let allElements = document.querySelectorAll('.grid-item')

    for (element of allElements) {
        if (!element.classList.contains('first')) {
            element.outerHTML = ''
        }
    }

}

const dateValidation = (date) => {
    date = date.split('-')
    if (date.length == 3 && date[0].length == 4 && date[1].length == 2 && date[2].length == 2) {
        return true
    }
    else {
        return false
    }
}



const editMarkup = (fieldData) => {

    const markup = `<input type="text" class="editInput" value="${fieldData}">`

    return markup

}


//edit data markup changes
const updateDataMarkup = (dataName) => {
    const updateSelectors = document.querySelectorAll(`[data=${dataName}]`)

    for (let i = 1; i < 5; i++) {
        const fieldData = updateSelectors[i].innerText
        const newMarkup = editMarkup(fieldData)

        updateSelectors[i].parentElement.innerHTML = newMarkup
    }

    //hide all buttons and display done/cancel
    const buttons = document.querySelectorAll(`.grid button`)
    for (button of buttons) {
        button.style.display = 'none';
    }

    document.querySelector(`.update-done[data=${dataName}]`).style.display = 'block';
    document.querySelector(`.update-cancel[data=${dataName}]`).style.display = 'block';

}


//add listeners on buttons
const startListeners = () => {

    let localBooksData = localStorage.getItem('booksData')
    localBooksData = JSON.parse(localBooksData)

    //delete button listeners and logic
    let buttons = document.querySelectorAll('.delete')
    for (button of buttons) {
        button.onclick = event => {
            console.log('clicked', event.target.getAttribute('data'))
            const clickedBookId = event.target.getAttribute('data')
            const normalBookName = clickedBookId.split('-').join(' ')

            //find and delete book
            for ([index, book] of localBooksData.entries()) {
                if (book.bookName == normalBookName) {
                    console.log('found, deleted')
                    localBooksData.splice(index, 1)
                    localStorage.setItem('booksData', JSON.stringify(localBooksData))
                    deleteAllElems()
                    start()
                    break;
                }
            }

        }
    }

    //update button listeners and logic
    const updateButtons = document.querySelectorAll('.update')

    for (updateButton of updateButtons) {
        updateButton.onclick = event => {
            console.log('update clicked', event.target.getAttribute('data'))
            const clickedBookId = event.target.getAttribute('data')
            updateDataMarkup(clickedBookId)
        }
    }

    //cancel button refreshes table and removes input fields added by update
    const cancelButtons = document.querySelectorAll('.update-cancel')

    for (cancelButton of cancelButtons) {
        cancelButton.onclick = event => {
            deleteAllElems()
            start()
        }
    }

    //Done button listeners and logic
    const doneButtons = document.querySelectorAll('.update-done')

    for (doneButton of doneButtons) {
        doneButton.onclick = event => {
            console.log('done clicked', event.target.getAttribute('data'))

            const bookName = event.target.getAttribute('data').split('-').join(' ')
            const inputFieldName = document.querySelectorAll('.editInput')[0].value
            const inputAuthor = document.querySelectorAll('.editInput')[1].value
            const inputPublisher = document.querySelectorAll('.editInput')[2].value
            const inputDate = document.querySelectorAll('.editInput')[3].value

            if (inputFieldName && inputAuthor && inputPublisher && inputDate) {
                if (dateValidation(inputDate)) {
                    for ([index, book] of localBooksData.entries()) {
                        if (bookName == book.bookName) {
                            localBooksData.splice(index, 1)
                            localStorage.setItem('booksData', JSON.stringify(localBooksData))
                            break;
                        }
                    }

                    localBooksData.push({
                        bookName: inputFieldName,
                        author: inputAuthor,
                        publisher: inputPublisher,
                        date: inputDate
                    })

                    localStorage.setItem('booksData', JSON.stringify(localBooksData))

                    deleteAllElems()
                    start()
                    alert("Book Updated!")
                }
                else {
                    alert("Date Format should be yyyy-mm-dd")
                }
            }
            else {
                alert("No Empty Fields")
            }

        }
    }
}


//populate books data
const populateData = () => {

    let localBooksData = localStorage.getItem('booksData')
    localBooksData = JSON.parse(localBooksData)

    for ([index, book] of localBooksData.entries()) {

        const idBookName = book.bookName.split(' ').join('-')

        const htmlNumberingMarkup = createGridItemMarkup(idBookName, index + 1)
        addGridItemMarkup(htmlNumberingMarkup)

        for (property in book) {
            const htmlMarkup = createGridItemMarkup(idBookName, book[property])
            addGridItemMarkup(htmlMarkup)
        }

        const htmlButtonsMarkup = createButtonsMarkup(idBookName)
        addGridItemMarkup(htmlButtonsMarkup)
    }

}



const start = () => {
    if (!localStorage.getItem('booksData')) {
        try {
            localStorage.setItem('booksData', JSON.stringify(booksData))
            populateData()
            startListeners()
        }
        catch (e) {   //Catch any error if localStorage is disabled
            alert('Please Enable localStorage')
            console.log(e)
            populateData()
        }
    } else {
        populateData()
        startListeners()
    }
}

start()