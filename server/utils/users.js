
const users = [];
var i = 0;
var d = 0;
function joinUser(id, username, ) {
  const user = { id, username };
  console.log("dodaje do tablicy ", username);
    users.push(user);

}

function getCurrentUser(id ) {
 
   return users.find((user) => user.id === id);
}
function getRoomUsers(room) {
 
  return users.filter((user) => user.room === room);
}

function userLeave(id) {
    console.log('usuwam uzytkownika');
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
  
  
}

function getNextUser() {
 
    // for (let z = 0; z < users.length; z++) {
    //   console.log(`uzytkownik: ${z}`, users[z].username);
    // }
    console.log(users);
    i++;
    
    if (i === users.length || i >= users.length) {
      i = 0;
    }

    return `${users[i].username}`;
  
}
function getNextSocketUser() {
 
    for (let z = 0; z < users.length; z++) {
      console.log(`uzytkownik: ${z}`, users[z].username);
    }
    d++;
    if (d === users.length || d >= users.length) {
      d = 0;
    }

    return `${users[d].username}`;

  
}


module.exports = {
  joinUser,
  getCurrentUser,
  getRoomUsers,
  userLeave,
  getNextUser,
  getNextSocketUser,
};