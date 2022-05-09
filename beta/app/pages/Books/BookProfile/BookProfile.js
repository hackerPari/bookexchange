import React from 'react';
import {Grid} from '@material-ui/core';
import style from './style'
class BookProfile extends React.PureComponent {
  
  constructor(props) {
    super(props)
    this.state = {
        
    }
  }
  
  componentDidMount() {
    this.props.bookProfile();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.books !== this.props.books) {
      console.log(this.props.books);
    }
  }

  render() {
    const {bookRequests, booksLent, booksOwed, booksOwned, points} = this.props.books ? this.props.books : {};
    return (
      <Grid container className="book-profile-container" justify="center"> 
        <Grid item sm={10} xs={10}>

            <Grid container item sm={12} className="user-points">
              <h3>Your Points: {points ? points : 0}</h3>
            </Grid>

            <Grid container item sm={12} className="books-owned">
                <Grid item sm={12}>
                  <h3>Books Owned</h3>
                </Grid>
                {
                  booksOwned && booksOwned.map((book, i) => {
                    return (
                      <Grid item sm={12} className="book-preview" key={i}>
                          <p><b>Book Name: </b> {book.name}</p>
                          <p><b>Count: </b> {book.count}</p>
                          <p><b>Given: </b> {book.givenCount ? book.givenCount : 0}</p>
                      </Grid>
                    )
                  })
                }
            </Grid>

            <Grid container item sm={12} className="books-owed">
                <Grid item sm={12}>
                  <h3>Books Borrowed</h3>
                </Grid>
                {
                  booksOwed && booksOwed.map((book, i) => {
                    return (
                      <Grid item sm={12} className="book-preview" key={i}>
                          <p><b>Book Name: </b> {book.name}</p>
                          <p><b>Owner: </b> {book.ownerName}</p>
                          <p><b>Exchange Date: </b> {book.date}</p>
                      </Grid>
                    )
                  })
                }
            </Grid>

            <Grid container item sm={12} className="books-lent">
                <Grid item sm={12}>
                  <h3>Books Lent</h3>
                </Grid>
                {
                  booksLent && booksLent.map((book, i) => {
                    return (
                      <Grid item sm={12} className="book-preview" key={i}>
                          <p><b>Book Name: </b> {book.name}</p>
                          <p><b>Borrower: </b> {book.borrowerName}</p>
                          <p><b>Exchange Date: </b> {book.date}</p>
                      </Grid>
                    )
                  })
                }
            </Grid>

            <Grid container item sm={12} className="book-requests">
                <Grid item sm={12}>
                  <h3>Open Requests</h3>
                </Grid>
                {
                  bookRequests && bookRequests.map((book, i) => {
                    return (
                      <Grid item sm={12} className="book-preview" key={i}>
                          <p><b>Book Name: </b> {book.name}</p>
                          <p><b>Request Date: </b> {book.date}</p>
                      </Grid>
                    )
                  })
                }
            </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default BookProfile;
