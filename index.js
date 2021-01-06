//console.log('Before');

// setTimeout(() => {
//   console.log('Reading a user from a database...');
// }, 2000);

//getUser(1);

//const user = getUser(1);

// getUser(1, function (user) {
//   console.log('User', user);

// });


//Asynchronous
// getUser(1, (user) => {
//   console.log('User', user);
//   //Get the repositories
//   getRepositories(user.gitHubUserNmae, (repos) => {
//     //console.log(repos);
//     getCommits(repos[0], (commits) => {
//       //CALLBACK HELL
//        console.log(commits);
//     });
//   });
// });

// How to resolve the callback hell in asynchronous Code
// console.log('Before');
// getUser(1, getRepositories);

// function getCommits() {
//   getCommits(repo, displayCommits);
// }

// function displayCommits(commits) {
//   console.log(commits);
// }

// function getRepositories(user) {
//   getRepositories(user.gitHubUserNmae, getCommits);
// }
// console.log('After');


//Synchronous
// console.log('Before');
// const user = getUser(1);
// const repos = getRepositories(user.gitHubUserNmae);
// const commits = getCommits(repos[0]);
// console.log('After');



// getRepositories('zack', (repositories) => {
//   console.log('Repositories', repositories);

// });

//console.log('user : ', user);


// Three ways to deal with asynchronous Code
// Callbacks
// Promises
// Async/await



// function getUser(id) {
//   setTimeout(() => {
//     console.log('Reading a user from a database...');
//     return { id: id, gitHubUserNmae: 'zack' };
//   }, 2000);

//   return 1;
// }

// function getUser(id, callback) {
//   setTimeout(() => {
//     console.log('Reading a user from a database...');
//     callback({ id: id, gitHubUserNmae: 'zack' });
//   }, 2000);
// }

// function getRepositories(username) {
//   return ['repo1', 'repo2', 'repo3'];
// }

// function getRepositories(username, callback) {
//   setTimeout(() => {
//     console.log('Reading a user from a database...');
//     callback({ username: username, repositories: ['repo1', 'repo2', 'repo3'] });
//   }, 2000);
// }


// function getRepositories(username, callback) {
//   setTimeout(() => {
//     console.log('Calling GitHub API...');
//     callback(['repo1', 'repo2', 'repo3']);
//   }, 2000);
// }


// function getCommits(repo, callback) {
//   setTimeout(() => {
//     console.log('Calling GitHub API 2...');
//     callback(['commit1']);
//   }, 2000);
// }




console.log('Before');

//Promise based approche
// getUser(1)
//   .then(user => getRepositories(user.gitHubUserNmae))
//   .then(repos => getCommits(repos[0]))
//   .then(commits => console.log(commits[0]))
//   .catch(err => console.log('Error : ', err.message));

// Async & Await approach

async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUserNmae);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  }
  catch (err) {
    console.log('Error : ', err.message);
  }
}

displayCommits();

console.log('After');

function getUser(id) {
  return new Promise((resolve, reject) => {
    //Kick off some async work
    setTimeout(() => {
      console.log('Reading a user from a database...');
      resolve({ id: id, gitHubUserNmae: 'zack' });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API...');
      //resolve(['repo1', 'repo2', 'repo3']);
      reject(new Error('Could not get the repos.'));
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API 2...');
      resolve(['commit1']);
    }, 2000);
  });
}






