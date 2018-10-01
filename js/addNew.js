
let bookName = document.querySelector('.bookName')
let authorName = document.querySelector('.authorName')
let publisherName = document.querySelector('.publisherName')
let date = document.querySelector('.date')


const bookValidation = (books, inputBookName) => {

    for (book of books) {
        if (book.bookName == inputBookName) {
            return false
        }
    }

    return true
}


const updateData = () => {
    const button = document.querySelector('.submit')
    button.onclick = event => {

        if (bookName && authorName && publisherName && date) {

            console.log(bookName, authorName, publisherName, date)
            let localBooksData = localStorage.getItem('booksData')
            localBooksData = JSON.parse(localBooksData)

            if (bookValidation(localBooksData, bookName)) {
                console.log("New Book is welcome")
                localBooksData.push({
                    bookName: bookName.value,
                    author: authorName.value,
                    publisher: publisherName.value,
                    date: date.value
                })

                bookName.value = ''
                authorName.value = ''
                publisherName.value = ''
                date.value = ''

                localStorage.setItem('booksData', JSON.stringify(localBooksData))

                alert("New Book Added!")
            }
            else {
                console.log("We have that book")
                alert("We have that book")
            }

        }
        else {
            alert("Enter All Fields")
        }
    }
}


if (!localStorage.getItem('booksData')) {
    try {
        localStorage.setItem('booksData', JSON.stringify(booksData))
        updateData()
    }
    catch (e) {   //Catch any error if localStorage is disabled
        alert(e)
        updateData()
    }
} else {
    updateData()
}
