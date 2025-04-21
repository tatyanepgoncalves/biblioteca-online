const bookName = document.getElementById("bookName")
const bookAuthor = document.getElementById("bookAuthor")
const bookCategory = document.getElementById("bookCategory")
const bookYear = document.getElementById("bookYear")
const bookImage = document.getElementById("bookImage")
const addBook = document.getElementById("addBook")
const bookForm = document.getElementById("bookForm")
const listBooks = document.getElementById("listBooks")
const btnMode = document.getElementById("mode")
const body = document.querySelector("body")
const navLinks = document.querySelectorAll("nav a")
const sections = document.querySelectorAll("section, form")
const home = document.getElementById("home") 
const pictureHome = document.getElementById("pictureHome")

let books = JSON.parse(localStorage.getItem("books")) || []
const gerarId = () => "_" + Math.random().toString(36).substring(2, 9)

const btnModeIcon = document.createElement("img")
btnMode.appendChild(btnModeIcon)
btnModeIcon.src = "./src/images/moon.svg"


btnMode.addEventListener("click", (e) => {
  e.preventDefault()
  body.classList.toggle("dark")

  const isDark = body.classList.contains("dark")


  btnModeIcon.src = isDark ? "./src/images/sun.svg" : "./src/images/moon.svg"
  pictureHome.src = isDark ? "./src/images/library-dark.svg" : "./src/images/library-light.svg"
})

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()

    const targetId = link.getAttribute("href").replace("#", "")
    const targetSection = document.getElementById(targetId)

    sections.forEach((section) => {
      section.style.display = "none" 
    })

    if (targetId === "bookForm" || targetId === "home") {
      targetSection.style.display = "flex"
    } else {
      targetSection.style.display = "grid"
    } 

  })
})

window.addEventListener("DOMContentLoaded", () => {
  sections.forEach((section) => {
    section.style.display = "none"
  })

  document.getElementById("home").style.display = "flex"
})



function renderBooks() {
  listBooks.innerHTML = ""

  books.forEach((book, index) => {
    
    // Criação de elementod
    const bookItem = document.createElement("article")
    const bookText = document.createElement("div")
    const bookBtns = document.createElement("div")
    const bookTextName = document.createElement("h3")
    const bookTextAuthor = document.createElement("span")
    const bookTextCategory = document.createElement("span")
    const bookTextYear = document.createElement("span")
    const bookTextImage = document.createElement("img")
    const bookStatus = document.createElement("img")
    const removeBook = document.createElement("button")
    const removeBookIcon = document.createElement("img")
    const bookId = document.createElement("div")

    
    // Criação de classe para os elementos
    bookId.classList.add("book-id")
    bookText.classList.add("book-text")
    bookBtns.classList.add("book-btns")
    bookTextAuthor.classList.add("author")
    bookTextCategory.classList.add("category")
    bookTextYear.classList.add("year")


    bookTextName.textContent = book.textName
    bookTextAuthor.textContent = book.textAuthor
    bookTextCategory.textContent = book.textCategory
    bookTextYear.textContent = book.textYear
    bookTextImage.src = book.textImage
    bookTextImage.alt = book.textName
    

    bookStatus.src = book.lido ? "./src/images/circle-check.svg" : "./src/images/circle.svg"

    bookItem.addEventListener("click", () => {
      books[index].lido = !books[index].lido
      saveBooks()
      renderBooks()
    })

    
    // Remover livros
    removeBook.addEventListener("click", (e) => {
      e.stopPropagation() 
      books = books.filter((b) => b.id !== book.id)
      saveBooks()
      renderBooks()
    })
    
    removeBookIcon.src = book.lido ? "./src/images/trash.svg" : "./src/images/trash.svg"

    if (book.lido) {
      bookItem.classList.add("read")
    }

    // Mostrar elementos
    bookItem.appendChild(bookText)
    bookItem.appendChild(bookBtns)
    bookBtns.appendChild(bookStatus)
    bookItem.appendChild(bookText)
    bookText.appendChild(bookTextName)
    bookText.appendChild(bookTextAuthor)
    bookText.appendChild(bookTextImage)
    bookText.appendChild(bookId)
    bookId.appendChild(bookTextCategory)
    bookId.appendChild(bookTextYear)
    listBooks.appendChild(bookItem)
    bookBtns.appendChild(removeBook)
    removeBook.appendChild(removeBookIcon)
  });
}

function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books))
}

bookForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const textName = bookName.value.trim()
  const textAuthor = bookAuthor.value.trim()
  const textCategory = bookCategory.value.trim()
  const textYear = bookYear.value.trim()
  const textImage = bookImage.value.trim()

  if (textName !== "" && textAuthor !== "" && textCategory !== "" && textYear !== "" && textImage !== "") {
    books.push({ id: gerarId(), textName, textAuthor, textCategory, textYear, lido: false })
    saveBooks()
    renderBooks()
    bookName.value = ""
    bookAuthor.value = ""
    bookCategory.value = ""
    bookYear.value = ""
    bookImage.value = ""
  }
})

renderBooks()