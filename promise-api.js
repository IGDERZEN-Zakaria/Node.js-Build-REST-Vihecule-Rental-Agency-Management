
const p = Promise.resolve({ id: 1 });
p.then(result => console.log('p => ', result));

const pp = Promise.reject(new Error('reason for rejection...'));
pp.catch(err => console.log('pp => Error : ', err.message));


const p1 = new Promise((resolve/*, reject*/) => {
  setTimeout(() => {
    console.log('Async operation 1...');
    resolve(1);
    //reject(new Error('Because Something Failed.'));
  }, 2000);
});


const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('Async operation 2...');
    resolve(2);
  }, 2000);
});


// the result is an array of results
// Promise.all([p1, p2])
//   .then(result => console.log(result))
//   .catch(err => console.log('Error : ', err.message));


// The result is the value of the first fullfiled promise
Promise.race([p1, p2])
  .then(result => console.log(result))
  .catch(err => console.log('Error : ', err.message));

console.log(process.versions);