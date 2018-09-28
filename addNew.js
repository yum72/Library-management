
let bookValidation = (books, inputBookName) => {

    for(book of books){
        if(book.bookName == inputBookName){
            return false
        }
    }

    return true
}


let updateData = () => {
    let button = document.querySelector('.submit')
    button.onclick = event => {

        let bookName = document.querySelector('.bookName').value
        let authorName = document.querySelector('.authorName').value
        let publisherName = document.querySelector('.publisherName').value
        let date = document.querySelector('.date').value

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


let populateStorage = () => {
    localStorage.setItem('booksData', JSON.stringify(booksData))
    updateData()
}

//populateStorage()
if (!localStorage.getItem('booksData')) {
    populateStorage()
} else {
    updateData()
}

