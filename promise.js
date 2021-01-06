
const p = new Promise((resolve, reject) => {
  //Kick off some async work
  //...
  setTimeout(() => {
    //resolve(1); // pending =>  resolved / fulfiled 

    reject(new Error('message of Error !!!')); // pending =>  rejected

  }, 2000);


});

p
  .then(result => console.log('result : ', result))
  .catch(err => console.log('Error : ', err.message));

