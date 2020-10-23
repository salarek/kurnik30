<template>
  <div class="home">
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" app clipped>
        <v-list dense>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app clipped-left>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Kurnik 3.0</v-toolbar-title>
      </v-app-bar>

      <v-main>
        <div class="mainContainer">
          <h1>Podaj nazwę użytkownika:</h1>

          <div>
            <v-text-field
              v-model="name"
              label="Twoja Nazwa"
              hide-details="auto"
            ></v-text-field>
          </div>
          <br />
          <h1>Wybierz Grę!</h1>

          <div class="browseGames">
            <p>Saper</p>
            <v-btn
              class="button"
              @click="setName"
              color="blue"
              dark
              large
              :to="`/saper/${name}`"
            >
              Graj!
            </v-btn>
          </div>
          <div class="browseGames">
            <p>BlackJack</p>
            <v-btn class="button" color="blue" dark large to="/blackJack">
              <!-- <router-link to="/blackjack">ELO</router-link>
              <router-view /> -->
              Graj!
            </v-btn>
          </div>
        </div>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "Home",

  data() {
    return {
      drawer: null,
      user: "",
      name: "",
    };
  },
  methods: {
    setName() {
      this.user = name;
      this.$router.push({ name: "saperView", params: { data: this.user } });
    },
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
};
</script>
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
  margin-top: 430px;
}
input {
  color: red;
}
</style>
