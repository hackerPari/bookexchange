const bookHelper = require('../db-helpers/book');
const responseUtil = require('../lib/response');
const userHelper = require('../db-helpers/user')
const exchangeRequestHelper = require('../db-helpers/exchangeRequest');
const ObjectId = require('mongoose').Types.ObjectId;
const book = require('../models/book');

const exchangeRequest = async function (req, res) {
    req.apiName = 'exchangeRequest';
    let response = responseUtil.responseObj();
    response.exchangeStatus = {
        message: "",
        successful: false
    }

    try {
        const {requested, toExchange} = req.body;

        //check if user owns any books
        if (!req.user.booksOwned || req.user.booksOwned.length == 0) {
            response.exchangeStatus.message = "You don't own any books to exchange, use your points to buy.";
            return responseUtil.sendResponse(req, res, response);
        }

        //check if user is requesting book that he doesn't own or owe or already requested
        const booksOwned = req.user.booksOwned || [];
        const booksOwed = req.user.booksOwed || [];
        const bookRequests = req.user.bookRequests || []
        
        const allBooks = [...booksOwned, ...booksOwed, ...bookRequests];

        for (var i=0; i<allBooks.length; i++) {
            if (allBooks[i].book.toString() === requested) {
                response.exchangeStatus.message = "You already have this book or requested one. Please choose a different book."
                return responseUtil.sendResponse(req, res, response);
            }
        }
        
        for (var i=0; i<req.user.booksOwned.length; i++) {
            if (req.user.booksOwned[i].book.toString() === toExchange) {
                //check if this book is already given upto the limit.
                if (req.user.booksOwned[i].givenCount >= req.user.booksOwned[i].count) {
                    response.exchangeStatus.message = "You don't have enough of this book to exchange, use your points to buy.";
                } else {
                    //this book can be requested, if match is present trigger exchange

                    req.user.booksOwned[i].givenCount = req.user.booksOwned[i].givenCount ? req.user.booksOwned[i].givenCount + 1 : 1; //update book given count
                    response.exchangeStatus.successful = true;
                    response.exchangeStatus.message = "";
                    
                    //check if entry exists for book1 = ObjectId(requested) and requestStatus = open, if so consume it.
                    //ideally should be part of a transaction for atomicity.
                    const updateResp = await exchangeRequestHelper.findAndModify( //findOneandModify would create a lock on the documents selected
                        {book1: ObjectId(requested), requestStatus: "open", user1: {'$ne': req.user._id}},
                        {requestStatus: "exchanged", user2: req.user._id, point1: 1, point2: 1}
                    )

                    const bookRequested = await bookHelper.findOne({'_id': ObjectId(requested)});
                    const bookToExchange = await bookHelper.findOne({'_id': ObjectId(toExchange)});
                    
                    const currDate = new Date();

                    if (updateResp == null) { // this would mean that there are no open exchange for the requested book                
                        const exchangeObj = {
                            user1: req.user._id,
                            book1: ObjectId(toExchange),
                            book2: ObjectId(requested),
                            point1: 0,
                            point2: 0,
                            requestStatus: "open"
                        }
                        await exchangeRequestHelper.save(exchangeObj);
                        response.exchangeStatus.message = "Exchange request placed successfully!"
                        const reqObj = {book: ObjectId(requested), name: bookRequested.name, date: currDate};
                        req.user.bookRequests = req.user.bookRequests ? [...req.user.bookRequests, reqObj] : [reqObj];
                        
                        await userHelper.updateUserProfile(req.user._id, {booksOwned: req.user.booksOwned, bookRequests: req.user.bookRequests});

                    } else {
                        
                        const borrower = await userHelper.findOne({'_id': updateResp.user1});
                        
                        //update bookLent for both users
                        const bookLent1 = {book: bookToExchange._id, name: bookToExchange.name, borrower: borrower._id, date: currDate, borrowerName: borrower.name};
                        req.user.booksLent = req.user.booksLent ? [...req.user.booksLent, bookLent1] : [bookLent1];

                        const bookLent2 = {book: bookRequested._id, name: bookRequested.name, borrower: req.user._id, date: currDate, borrowerName: req.user.name};
                        borrower.booksLent = borrower.booksLent ? [...borrower.booksLent, bookLent2] : [bookLent2];
                        

                        //update bookRequests by removing to Exchange for first user who raised the request 
                        borrower.bookRequests = borrower.bookRequests.filter(br => br.book.toString() !== toExchange);
                        
                        //update booksOwed for both users
                        const bookOwed1 = {book: bookRequested._id, name: bookRequested.name, owner: borrower._id, date: currDate, ownerName: borrower.name};
                        req.user.booksOwed = req.user.booksOwed ? [...req.user.booksOwed, bookOwed1] : [bookOwed1];

                        const bookOwed2 = {book: bookToExchange._id, name: bookToExchange.name, owner: req.user._id, date: currDate, ownerName: req.user.name};
                        borrower.booksOwed = borrower.booksOwed ? [...borrower.booksOwed, bookOwed2] : [bookOwed2];

                        await userHelper.updateUserProfile(
                            req.user._id, 
                            {
                                booksOwned: req.user.booksOwned, 
                                booksOwed: req.user.booksOwed, 
                                booksLent: req.user.booksLent,
                                points: req.user.points ? req.user.points + 1 : 1
                            });
    
                        await userHelper.updateUserProfile(
                            borrower._id,
                            {
                                booksOwed: borrower.booksOwed,
                                booksLent: borrower.booksLent,
                                bookRequests: borrower.bookRequests,
                                points: req.user.points ? req.user.points + 1 : 1
                            }
                        )

                        response.exchangeStatus.message = "Exchange is successful";
                    }
                }
            }
        }

    } catch (e) {
        response.status = responseUtil.getErrorResponse(e, 'exchangeRequestFailed');
    }
    responseUtil.sendResponse(req, res, response);
}

const borrowBook = async function (req, res) {
    req.apiName = 'borrowRequest';
    let response = responseUtil.responseObj();
    response.exchangeStatus = {
        message: "",
        successful: false
    }

    try {
        const {user} = req;
        const {requested} = req.body;

        //check if user has enough points to borrow
        if (!user.points || user.points <= 0) {
            response.exchangeStatus.message = "You don't have enough points to borrow books.";
            return responseUtil.sendResponse(req, res, response);
        }

        //check if user is requesting book that he doesn't own or owe or already requested
        const booksOwned = req.user.booksOwned || [];
        const booksOwed = req.user.booksOwed || [];
        const bookRequests = req.user.bookRequests || []
        
        const allBooks = [...booksOwned, ...booksOwed, ...bookRequests];

        for (var i=0; i<allBooks.length; i++) {
            if (allBooks[i].book.toString() === requested) {
                response.exchangeStatus.message = "You already have this book or requested one. Please choose a different book."
                return responseUtil.sendResponse(req, res, response);
            }
        }
        
        //check if someone has already lent the book that the user is trying to borrow, if so borrow it immediately
        const updateResp = await exchangeRequestHelper.findAndModify( //findOneandModify would create a lock on the documents selected
            {book1: ObjectId(requested), requestStatus: "lendOpen", user1: {'$ne': req.user._id}},
            {requestStatus: "borrowed", user2: req.user._id, point1: 1, point2: 0} 
        )
        
        const bookRequested = await bookHelper.findOne({'_id': ObjectId(requested)});
        const currDate = new Date();

        if (updateResp == null) {
            const exchangeObj = {
                user1: req.user._id,
                book1: ObjectId(requested),
                point1: 0,
                point2: 0,
                requestStatus: "borrowOpen" //if no book is already open to lend, create a borrow request, which will be fulfilled when someone lends the book
            }

            const reqObj = {book: ObjectId(requested), name: bookRequested.name, date: currDate};
            req.user.bookRequests = req.user.bookRequests ? [...req.user.bookRequests, reqObj] : [reqObj];
            
            await exchangeRequestHelper.save(exchangeObj);
            await userHelper.updateUserProfile(req.user._id, {bookRequests: req.user.bookRequests});
            
            response.exchangeStatus.message = "Borrow request placed successfully!"

        } else {
            
            // if borrow is executed, update the lender and borrower users with appropriate details

            const lender = await userHelper.findOne({'_id': updateResp.user1});
            
            const bookOwed= {book: bookRequested._id, name: bookRequested.name, owner: lender._id, date: currDate, ownerName: lender.name};
            req.user.booksOwed = req.user.booksOwed ? [...req.user.booksOwed, bookOwed] : [bookOwed];

            const bookLent = {book: bookRequested._id, name: bookRequested.name, borrower: req.user._id, date: currDate, borrowerName: req.user.name};
            lender.booksLent = lender.booksLent ? [...lender.booksLent, bookLent] : [bookLent];

            await userHelper.updateUserProfile(req.user._id, {booksOwed: req.user.booksOwed});

            await userHelper.updateUserProfile(
                lender._id,
                {
                    booksLent: lender.booksLent,
                    points: req.user.points ? req.user.points + 1 : 1
                }
            )

        }

    } catch (e) {
        response.status = responseUtil.getErrorResponse(e, 'borrowRequestFailed');
    }
    responseUtil.sendResponse(req, res, response);
}

//bookLending would follow more or less the same flow as borrowBook.

module.exports = {
  exchangeRequest,
  borrowBook
}