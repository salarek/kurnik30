const users = [];
var i = 0;
var d = 0;
function joinUser(id, username, game) {
  const user = { id, username, points: 0, game };
  console.log("dodaje do tablicy ", username);
  users.push(user);
}

function getRoomUsers(game) {
  let allUsernames = [];
  let countGameUsers=0;
  for (let i = 0; i < users.length; i++) {
    if (users[i].game == game) {
      allUsernames[countGameUsers] = users[i].username + " : " + users[i].points;
      countGameUsers++;
    }
  }
  return allUsernames;
}

function userLeave(id) {
  console.log("usuwam uzytkownika");
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

function getNextUser(game) {
  console.log(users);

  for (let z = 0; i < users.length; z++) {
    i++;
    if (i == users.length) {
      i = 0;
    }
    console.log(i);
    if (users[i].game === game) {
      break;
    }
  }

  if (i === users.length || i >= users.length) {
    i = 0;
  }

  return `${users[i].username}`;
}
// function getNextSocketUser() {
//   for (let z = 0; z < users.length; z++) {
//     console.log(`uzytkownik: ${z}`, users[z].username);
//   }
//   d++;
//   if (d === users.length || d >= users.length) {
//     d = 0;
//   }

//   return `${users[d].username}`;
// }
// function getCurrentUser(id) {
//   return users.find((user) => user.id === id);
// }

function addPointsToUser(pointsR, userR, game) {
  users.find(
    (user) => user.username === userR && user.game === game
  ).points = pointsR;
}

module.exports = {
  joinUser,
  getRoomUsers,
  userLeave,
  getNextUser,
  addPointsToUser,
};
