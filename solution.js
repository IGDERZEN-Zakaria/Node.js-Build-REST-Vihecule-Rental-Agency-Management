
async function notifyCustomer() {
  try {
    const customer = await getCustomer(1);
    console.log('Customer : ', customer);
    if (customer.isGold) {
      const movies = await getTopMovies(customer);
      console.log('Top movies: ', movies);
      await sendEmail(customer.email, movies);
      console.log('Email is sent to : ', customer.email);
    }
  }
  catch (err) {
    console.log('Error : ', err.message);
  }
}

notifyCustomer();

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: 'Mosh Hamedani',
        isGold: true,
        email: 'Mosh_Hamedani@gmail.com'
      });
    }, 4000);
  });
}

function getTopMovies() {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 4000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 4000);
  });
}