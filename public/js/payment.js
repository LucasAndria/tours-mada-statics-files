import axios from 'axios';
const { showAlert } = require('./alerts');

exports.bookTour = (tourId) => {
  // Redirigena makany am ilay fausse payement
  location.assign(`/checkout-booking/${tourId}`);
};

exports.payTour = async ({ tour, user, price }) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/bookings/getBooking',
      data: {
        tour,
        user,
        price
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Tour booked successfuly!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', 'Error occured, Try again later');
  }
};
