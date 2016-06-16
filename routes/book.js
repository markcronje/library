var Book = require('../models/book'),
    mapper = require('../lib/model-mapper');

module.exports = function(app) {

    app.param('bookId', function(req, res, next, id) {
        Book.findById(id, function(err, book) {
            if (err) {
                next(err);
            } else {
                res.locals.book = book;
                next();
            }
        });
    });
    
    app.get('/books', function(req, res) {
        Book.find({}, function(err, books) {
            res.render('book/index', { books : books });
        });
    });

    app.get('/books/create', function(req, res) {
        res.render('book/create', { book : new Book() });
    });

    app.post('/books/create', function(req, res) { 
        var book = new Book(req.body);

        book.save(function(err) {
            if (err) {
                res.render('book/create', {
                    book : book
                });
            } else {
                res.redirect('/books');
            }
        });
    });

    app.get('/books/:bookId/edit', function(req, res) {
        res.render('book/edit');
    });

    app.post('/books/:bookId/edit', function(req, res) {
        mapper.map(req.body).to(res.locals.book);

        res.locals.book.save(function(err) {
            if (err) {
                res.render('book/edit');
            } else {
                res.redirect('/books');
            }
        });
    });

    app.get('/books/:bookId/detail', function(req, res) {
        res.render('book/detail');
    });

    app.get('/books/:bookId/delete', function(req, res) {
        res.render('book/delete');
    });

    app.post('/books/:bookId/delete', function(req, res) {
        Book.remove({ _id : req.params.bookId }, function(err) {
            res.redirect('/books');
        });
    });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
    name : 'Book',
    route : '/books'
}
