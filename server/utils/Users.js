const users = [];
// var i = 0;

function joinUser(id, username, game) {
  const user = { id, username, points: 0, game, playing: false };
  users.push(user);
}
function setCurrentPlayingUser(id, game) {
  users.forEach((user) => {
    if (user.game == game) {
      user.playing = false;
    }
  });
  users.find((user) => user.id === id && user.game === game).playing = true;
  const playingUser = users
    .filter((user) => {
      if (user.playing == true && user.game == game) {
        return user;
      }
    })
    .map((user) => {
      return user.username;
    });
  return playingUser;
}
function getRoomUsersWithPoints(game) {
  let roomUsers = users
    .filter((user) => {
      if (user.game == game) {
        return user;
      }
    })
    .map((user) => {
      return user.username + " : " + user.points;
    });
  console.log("roomUsers", roomUsers);
  return roomUsers;
}
function getRoomUsers(game) {
  let roomUsers = users.filter((user) => {
    if (user.game == game) {
      return user;
    }
  });

  console.log("roomUsers", roomUsers);
  return roomUsers;
}

function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    const deletedUser = users[index];
    users.splice(index, 1);
    return deletedUser.game;
  }
}

function getNextUser(game) {
  const roomUsers = getRoomUsers(game);

  console.log(roomUsers);
  let index = roomUsers.findIndex((user) => {
    if (user.playing == true) {
      return user;
    }
  });
  index = index + 1;
  console.log("INDEX", index);
  if (index >= roomUsers.length && index != -1) {
    index = 0;
  }
  setCurrentPlayingUser(roomUsers[index].id, game);
  return `${roomUsers[index].username}`;

  // for (let z = 0; i < users.length; z++) {
  //   i++;
  //   if (i == users.length) {
  //     i = 0;
  //   }
  //   console.log(i);
  //   if (users[i].game === game) {
  //     break;
  //   }
  // }

  // if (i === users.length || i >= users.length) {
  //   i = 0;
  // }

  // return `${users[i].username}`;
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
  getRoomUsersWithPoints,
  getRoomUsers,
  userLeave,
  getNextUser,
  addPointsToUser,
  setCurrentPlayingUser,
};
