async function displayData() {
  const customer = await getCustomer(1);
  console.log('Customer: ', customer);

  if (customer.isGold) {
    const movies = await getTopMovies(customer.isGold);
    console.log('Top Movies: ', movies);

    const email = await sendEmail(customer.email, movies);
    console.log(email);
  }
}

displayData();

async function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: 'Mosh Hamedani',
        isGold: true,
        email: 'mosh@email.com'
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
      resolve(`Email Sent to ${email} with the following movies: ${movies}`);
    }, 4000);
  });
}
