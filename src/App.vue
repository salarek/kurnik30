<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <h1>ELO</h1>
      <v-text-field v-model="gameName" label="Another input"></v-text-field>

      <div v-if="gameName === 'saper'">
        <saper />
      </div>
      <div v-if="gameName === 'helloWorld'">
        <HelloWorld msg="Welcome to Your Vue.js App" />
      </div>
      <div v-if="gameName === 'blackJack'">
        <blackJack />
      </div>

      <button>Wybierz</button>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import saper from "./components/saper.vue";
import blackJack from "./components/blackJack.vue";
export default {
  name: "App",
  components: {
    HelloWorld,
    saper,
    blackJack,
  },
  data() {
    return {
      gameName: "",
    };
  },
};
</script>
<style>
input {
  color: red;
}
</style>
