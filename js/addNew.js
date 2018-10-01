
const bookValidation = (books, inputBookName) => {

    for(book of books){
        if(book.bookName == inputBookName){
            return false
        }
    }

    return true
}


const updateData = () => {
    const button = document.querySelector('.submit')
    button.onclick = event => {

        const bookName = document.querySelector('.bookName').value
        const authorName = document.querySelector('.authorName').value
        const publisherName = document.querySelector('.publisherName').value
        const date = document.querySelector('.date').value

        if(bookName && authorName && publisherName && date){

            console.log(bookName, authorName, publisherName, date)
            let localBooksData = localStorage.getItem('booksData')
            localBooksData = JSON.parse(localBooksData)

            if(bookValidation(localBooksData, bookName)){
                console.log("New Book is welcome")
                localBooksData.push({
                    bookName : bookName,
                    author : authorName,
                    publisher : publisherName,
                    date : date
                })
                localStorage.setItem('booksData', JSON.stringify(localBooksData))
                alert("New Book Added!")
            }
            else{
                console.log("We have that book")
                alert("We have that book")
            }

        }
        else{
            alert("Enter All Fields")
        }
    }
}


const populateStorage = () => {
    localStorage.setItem('booksData', JSON.stringify(booksData))
    updateData()
}

//populateStorage()
if (!localStorage.getItem('booksData')) {
    populateStorage()
} else {
    updateData()
}

