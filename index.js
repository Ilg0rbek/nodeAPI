const http = require('http')
const { v4 } = require('uuid')
const path = require('path')
const getBodyData = require('./util')

let books = [
    {
        id: '1',
        title: 'Book N1',
        pages: 250,
        authror: 'Writer 1'
    }
]

const server = http.createServer(async (req, res) => {

    //Get all books
    if (req.url === '/books' && req.method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'application/json charset=utf8'
        })
        const resp = {
            status: 'OK',
            books
        }
        res.end(JSON.stringify(resp))
    } 
    
    // Methods POST in node js

    else if (req.url === '/books' && req.method === "POST") {
        const data = await getBodyData(req)

        const { title, pages, authror } = JSON.parse(data)

        const newBook = {
            id: v4(),
            title,
            pages,
            authror
        }
        books.push(newBook)
        const resp = {
            status: 'Created',
            book: newBook
        }

        res.writeHead(200, {
            'Content-Type': 'application/json charset=utf8'
        })
        res.end(JSON.stringify(resp))
    }

    // Take for ID and get methods in node js

    else if (req.url.match(/\/books\/\w + /) && req.method === 'GET') {
        const id = req.url.split('/')[2]
        const book = books.find(b => b.id === id)
        res.writeHead(200, {
            'Content-Type': 'application/json charset=utf8'
        })
        const resp = {
            status: 'OK',
            book: newBook
        }
        res.end(JSON.stringify(resp))
    }

    // PUT methods in node js

    else if (req.url.match(/\/books\/\w + /) && req.method === 'PUT') {

        const id = req.url.split('/')[2]

        const data = await getBodyData(req)

        const { title, pages, authror } = JSON.parse(data)

        const idx = books.find(b => b.id === id)

        const changedBook = {
            id: books[idx].id,
            title: title || books[idx].title,
            pages: pages || books[idx].pages,
            authror: authror || books[idx].authror
        }
        books[idx] = changedBook

        res.writeHead(200, {
            'Content-Type': 'application/json charset=utf8'
        })
        const resp = {
            status: 'OK',
            book: changedBook
        }
        res.end(JSON.stringify(resp))
    } 
    
    //DELETE methods in Node js

    else if (req.url.match(/\/books\/\w + /) && req.method === 'DELETE') {
        const id = req.url.split('/')[2]
        books = books.filter(b => b.id !== id)
        res.writeHead(200, {
            'Content-Type': 'application/json charset=utf8'
        })
        const resp = {
            status: 'DELETE'
        }
        res.end()
    }





})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`Server has been started PORT ${PORT}`);
})