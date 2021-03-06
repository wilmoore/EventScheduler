import React, { Component, Fragment } from 'react';

import AuthContext from '../../context/authContext';
import LoadingGif from '../Loading/Loading';
import BookingsList from '../BookingsList/BookingsList';
import { fetchData } from '../../API/api';

class Bookings extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      bookings: [],
    }
  };

  componentDidMount() {
    this.getBookings();
  };

  getBookings = async () => {
    this.setState({isLoading: true})
    const requestBody = {
      query: `
        query {
          bookings {
            _id
            createdAt
            event {
              _id
              title
              date
            }
          }
        }
      `
    };
    const token = this.context.token;
    const bookings = await fetchData(requestBody, token);
    this.setState({
      bookings: bookings.data.bookings,
      isLoading: false
    });
  };

  handleCancelBooking = async bookingId => {
    this.setState({isLoading: true});
    const requestBody = {
      query: `
        mutation CancelBooking($id: ID!) {
          cancelBooking(bookingId: $id) {
            _id
            title
          }
        }
      `,
      variables: {
        id: bookingId
      }
    };
    const token = this.context.token;
    await fetchData(requestBody, token);
    this.setState(prevState => {
      const updatedBookings = prevState.bookings.filter(booking => {
        return booking._id !== bookingId;
      });
      return {
        bookings: updatedBookings,
        isLoading: false,
      };
    });
    this.setState({isLoading: false});
  };

  render() {
    return(
      <Fragment>
      {this.state.isLoading ? (
        <LoadingGif />
      ) : (
        <BookingsList
          bookings={this.state.bookings}
          cancelBooking={this.handleCancelBooking} />
      )}
      </Fragment>
    )
  };
};

export default Bookings;
