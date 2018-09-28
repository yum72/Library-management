

let createButtonsMarkup = (idData) => {

    var div = document.createElement('div')
    div.className = 'grid-item action';

    let button1 = `<button class=delete data = ${idData}>Delete</button>`
    let button2 = `<button class=update data = ${idData}>Update</button>`
    let button3 = `<button class=update-done data = ${idData}>Done</button>`
    let button4 = `<button class=update-cancel data = ${idData}>Cancel</button>`
    let markup = button1 + button2 + button3 + button4

    div.innerHTML = markup

    return div
}


let createGridItemMarkup = (propertyName, bookData) => {

    var div = document.createElement('div')
    div.className = 'grid-item';

    let markup = `<p class="item-text" data = "${propertyName}" >${bookData}</p>`

    div.innerHTML = markup

    return div
}


let addGridItemMarkup = (htmlMarkup) => {
    document.querySelector('.grid').appendChild(htmlMarkup)
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

let editMarkup = (fieldData) => {

    let markup = `<input type="text" class="editInput" value="${fieldData}">`

    return markup

}

//edit data markup changes
let updateDataMarkup = (dataName) => {
    let updateSelectors = document.querySelectorAll(`[data=${dataName}]`)

    for (let i = 1; i < 5; i++) {
        let fieldData = updateSelectors[i].innerText
        let newMarkup = editMarkup(fieldData)

        updateSelectors[i].parentElement.innerHTML = newMarkup
    }

    //hide all buttons and display done/cancel
    let buttons = document.querySelectorAll(`.grid button`)
    for (button of buttons) {
        button.style.display = 'none';
    }

    document.querySelector(`.update-done[data=${dataName}]`).style.display = 'block';
    document.querySelector(`.update-cancel[data=${dataName}]`).style.display = 'block';

}


//populate books data
let populateData = () => {

    let localBooksData = localStorage.getItem('booksData')
    localBooksData = JSON.parse(localBooksData)

    for ([index, book] of localBooksData.entries()) {

        let idBookName = book.bookName.split(' ').join('-')

        let htmlNumberingMarkup = createGridItemMarkup(idBookName, index + 1)
        addGridItemMarkup(htmlNumberingMarkup)

        for (property in book) {
            let htmlMarkup = createGridItemMarkup(idBookName, book[property])
            addGridItemMarkup(htmlMarkup)
        }

        let htmlButtonsMarkup = createButtonsMarkup(idBookName)
        addGridItemMarkup(htmlButtonsMarkup)
    }

    startListeners()
}

//add listeners on buttons
let startListeners = () => {

    let localBooksData = localStorage.getItem('booksData')
    localBooksData = JSON.parse(localBooksData)

    //delete button listeners and logic
    let buttons = document.querySelectorAll('.delete')
    for (button of buttons) {
        button.onclick = event => {
            console.log('clicked', event.target.getAttribute('data'))
            let clickedBookId = event.target.getAttribute('data')
            let normalBookName = clickedBookId.split('-').join(' ')

            //find and delete book
            for ([index, book] of localBooksData.entries()) {
                if (book.bookName == normalBookName) {
                    console.log('found, deleted')
                    localBooksData.splice(index, 1)
                    localStorage.setItem('booksData', JSON.stringify(localBooksData))
                    deleteAllElems()
                    populateData()
                    break;
                }
            }

        }
    }

    //update button listeners and logic
    let updateButtons = document.querySelectorAll('.update')

    for (updateButton of updateButtons) {
        updateButton.onclick = event => {
            console.log('update clicked', event.target.getAttribute('data'))
            let clickedBookId = event.target.getAttribute('data')
            updateDataMarkup(clickedBookId)
        }
    }

    //cancel button refreshes table and removes input fields added by update
    let cancelButtons = document.querySelectorAll('.update-cancel')

    for (cancelButton of cancelButtons) {
        cancelButton.onclick = event => {
            deleteAllElems()
            populateData()
        }
    }

    //Done button listeners and logic
    let doneButtons = document.querySelectorAll('.update-done')

    for (doneButton of doneButtons) {
        doneButton.onclick = event => {
            console.log('done clicked', event.target.getAttribute('data'))

            let bookName = event.target.getAttribute('data').split('-').join(' ')
            let inputFieldName = document.querySelectorAll('.editInput')[0].value
            let inputAuthor = document.querySelectorAll('.editInput')[1].value
            let inputPublisher = document.querySelectorAll('.editInput')[2].value
            let inputDate = document.querySelectorAll('.editInput')[3].value

            if(inputFieldName && inputAuthor && inputPublisher && inputDate){
                
                for([index, book] of localBooksData.entries()){
                    if(bookName == book.bookName ){
                        localBooksData.splice(index, 1)
                        localStorage.setItem('booksData', JSON.stringify(localBooksData))
                        break;
                    }
                }

                localBooksData.push({
                    bookName : inputFieldName,
                    author : inputAuthor,
                    publisher : inputPublisher,
                    date : inputDate
                })

                localStorage.setItem('booksData', JSON.stringify(localBooksData))

                deleteAllElems()
                populateData()
                alert("Book Updated!")
            }
            else{
                alert("No Empty Fields")
            }

        }
    }
}

let populateStorage = () => {
    localStorage.setItem('booksData', JSON.stringify(booksData))
    populateData()
}

//populateStorage()
if (!localStorage.getItem('booksData')) {
    populateStorage()
} else {
    populateData()
}
