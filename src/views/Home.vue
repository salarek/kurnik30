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
          <h1>Podaj nazwe uzytkownika:</h1>
          <v-row>
            <v-col cols="12" sm="13">
              <v-text-field
                v-model="name"
                :rules="rules"
                counter="15"
                hint="Maksymalna ilosc znakow: 15"
                label="Twoja nazwa uzytkownika"
              ></v-text-field>
            </v-col>
          </v-row>
          <br />
          <h1>Wybierz Gre!</h1>

          <div class="browseGames">
            <p>Saper</p>
            <img
              style="width: 238px; border-radius: 25px"
              src="../assets/miniatury/bomba2.png"
            />
            <v-btn
              v-if="name && name.length < 16"
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
            <p>Dotworld</p>
            <img
              style="width: 238px; border-radius: 25px"
              src="../assets/miniatury/bomba2.png"
            />
            <v-btn
              v-if="name && name.length < 16"
              class="button"
              @click="setName"
              color="blue"
              dark
              large
              :to="`/dotworld/${name}`"
            >
              Graj!
            </v-btn>
          </div>
          <div class="browseGames">
            <p>BlackJack</p>
            <img style="width: 218px" src="../assets/miniatury/blackjack.png" />
            <v-btn
              v-if="name && name.length < 16"
              class="button"
              color="blue"
              dark
              large
              to="/blackJack"
            >
              <!-- <router-link to="/blackjack">ELO</router-link>
              <router-view /> -->
              Graj!
            </v-btn>
          </div>
          <div class="browseGames">
            <p>gallery</p>
            <img style="width: 218px" src="../assets/miniatury/bomba2.png" />
            <v-btn
              v-if="name && name.length < 16"
              class="button"
              color="blue"
              dark
              large
              :to="`/gallery/${name}`"
            >
              <!-- <router-link to="/gallery">ELO</router-link>
              <router-view /> -->
              Graj!
            </v-btn>
          </div>
          <div class="browseGames">
            <p>jzd</p>
            <img style="width: 218px" src="../assets/miniatury/bomba2.png" />
            <v-btn
              v-if="name && name.length < 16"
              class="button"
              color="blue"
              dark
              large
              :to="`/jzd/${name}`"
            >
              <!-- <router-link to="/jzd">ELO</router-link>
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
      title: " ",
      description: "California is a state in the western United States",
      rules: [(v) => v.length <= 15 || "Przekroczono 15 znakow!"],
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
  font-family: "Comic Neue", cursive;
  margin: 40px;
}
.browseGames {
  font-family: "Comic Neue", cursive;
  margin: 20px;
  float: left;
  width: 250px;
  height: 400px;
  color: white;
  text-align: center;
  font-size: 40px;
  background-color: grey;
}
.button {
  font-family: "Comic Neue", cursive;
  margin-top: 20px;
}
input {
  font-family: "Comic Neue", cursive;
  color: red;
}
</style>
