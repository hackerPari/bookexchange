import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import {Card, Grid, CardContent, Typography, CardActions, Button, CardMedia, Dialog, Select, MenuItem}  from '@material-ui/core';
import { isLoggedIn } from 'utils/utility';
import Cookies from 'js-cookie';

class BookPreviewCard extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            showExchangeOptions: false,
            selectedToGive: ""
        }
    }

    booksOwned = [];

    componentDidMount() {
        if (isLoggedIn()) {
            this.booksOwned = JSON.parse(Cookies.get('booksOwned'));
            if (this.booksOwned.length > 0) {
                this.setState({selectedToGive: this.booksOwned[0].book})
            }
        }  
    }

    startExchange(book) {
        this.setState({'showExchangeOptions': true});
    }

    handeCloseModal() {
        this.setState({'showExchangeOptions': false});
    }

    selectBook(e) {
        this.setState({selectedToGive: e.target.value});
    }

    putExchangeRequest(book) {
        console.log("in putExchangeRequest");
        this.props.exchangeRequest({'requested': book._id, 'toExchange': this.state.selectedToGive}); 
        this.handeCloseModal();
    }
    
    render() {
        const {book} = this.props;
        const isLogged = isLoggedIn();
        return (
            <div>

                <Card className="book-preview-card">
                    <CardMedia className="card-media"
                        component="img"
                        height="240"
                        image={book.coverPhoto}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="title" component="div">
                            {book.name}
                        </Typography>
                        <Typography variant="body2" color="textPrimary">
                            {book.subtitle}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            <b>Authors:</b> {book.authors.join(',')}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            <b>Category:</b> {book.category}
                        </Typography>
                    </CardContent>
                    {
                        isLogged ? 
                        (
                            <CardActions onClick={this.startExchange.bind(this, book)}>
                                <Button size="small">Exchange Request</Button>
                            </CardActions>
                        ) :
                        ""
                    }
                    
                </Card>

                <Dialog
                    open={this.state.showExchangeOptions}
                    onClose={this.handeCloseModal.bind(this)}
                    maxWidth='md'
                >
                    
                    <Grid container className="exchange-detail-container">
                        <Grid container item sm={12} className="exchange-requested-container">
                            <b className="book-requested">Book Requested : </b> {book.name}
                        </Grid>
                        <Grid container className="exchange-dropdown-container">
                            <Grid item sm={12}>
                                <label>Book to exchange : </label>
                                <Select value={this.state.selectedToGive} onChange={this.selectBook.bind(this)}>
                                    {
                                        this.booksOwned.map((b, i) => {
                                            return (
                                                <MenuItem key={i} value={b.book}>{b.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </Grid>
                        </Grid>

                        <Grid className="submit-request">
                            <Button 
                                onClick={this.putExchangeRequest.bind(this, book)} >
                                    Submit Request
                            </Button>
                        </Grid>
                    </Grid>
                    
                </Dialog>
            </div>
        )
    }
}

export default BookPreviewCard;
