const fs = require('fs');
const bcrypt = require('bcryptjs');
const users = require('./usersTours.json');
let nRounds = 13;
let hashedUsers = [];
let start = new Date(); // timing code
console.log(`Starting password hashing with nRounds = ${nRounds}, ${start}`);
console.log(users.length);

// Your code here to process the passwords

for (let i = 0; i < users.length; i++) {
    //console.log(users[i].password);
    let salt = bcrypt.genSaltSync(10); // New salt everytime!
    let passHash = bcrypt.hashSync(users[i].password, salt);
    //hashedUsers[i] = passHash;
    hashedUsers.push({"firstName": users[i].firstName, "lastName":users[i].lastName,"email":users[i].email,"passHash":passHash,"role":users[i].role});
    //console.log(hashedUsers[i]);
  }

//console.log('Output');
//console.log(hashedUsers);



let elapsed = new Date(); // timing code  / 1000)
console.log(`Finished password hashing, ${(elapsed % 60000)/1000} seconds.`);
fs.writeFileSync("userTourHash.json", JSON.stringify(hashedUsers, null, 2));
