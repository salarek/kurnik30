<template>
  <div id="app">
    <router-link to="/"></router-link>
    <router-view />
  </div>
</template>

<style>
.mainContainer {
  margin: 40px;
}
.browseGames {
  margin: 20px;
  float: left;
  width: 250px;
  height: 400px;
  color: white;
  text-align: center;
  font-size: 40px;
  background-color: grey;
}
.browseGames button {
  margin-top: 230px;
}
input {
  color: red;
}
</style>
