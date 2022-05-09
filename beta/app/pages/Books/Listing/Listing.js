import React from 'react';
import { Grid} from '@material-ui/core';
import style from './style'
import BookPreviewCard from 'components/BookPreviewCard';
import { isLoggedIn } from 'utils/utility';
import Cookies from 'js-cookie';

class Listing extends React.PureComponent {
  
  constructor(props) {
    super(props)
    this.state = {
        
    }
  }
  
  componentDidMount() {
    console.log("listing mounted");
    this.props.list();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.exchangeStatus !== this.props.exchangeStatus && this.props.exchangeStatus !== null) {
      alert(this.props.exchangeStatus.message);
    }
  }

  logout() {
    Cookies.remove('name');
    Cookies.remove('role');
    Cookies.remove('token');
    Cookies.remove('id');
    Cookies.remove('booksOwned');

    this.props.list();
  }

  render() {
    
    const loggedIn = isLoggedIn();

    return (
      <Grid container className="cropper-container">
        <Grid container item sm={12} xs={12} justify="center">

            <Grid container item sm={6} xs={6} className="crop-title" justify="center">
                
                <h2>
                   Welcome to Book Exchange Platform
                </h2>
                <p>Exchange your books to earn rewards, which you can use to get more books.</p>
            </Grid>

            <Grid container item sm={1} xs={1} justify="flex-end">
                {
                  loggedIn ? 
                  (<Grid className="profile-section">
                      <a onClick={this.logout.bind(this)}>Logout</a>
                      <a href="#/books/profile">Profile</a>
                  </Grid>
                    ) :
                  (<a className='header-link' href='#/books/login'>Login</a>)
                }
                
            </Grid>
        </Grid>

        <Grid container item sm={12} xs={12} justify="center">
          <Grid container item sm={8} xs={8} spacing={16}>
            {
              this.props.books && this.props.books.map((book, i) => {
                return (
                  <Grid item sm={4} key={i}>
                      <BookPreviewCard book={book} exchangeRequest={this.props.exchangeRequest}></BookPreviewCard>
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

export default Listing;
