<template>
  <div id="app">
    <input v-model="gameName" />
    <div v-if="gameName === 'saper'">
      <saper />
    </div>
    <div v-if="gameName === 'helloWorld'">
      <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
    <!-- <button @click="chooseGame">Wybierz</button> -->
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import saper from "./components/saper.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    saper,
  },
  data() {
    return {
      gameName: "",
    };
  },
};
</script>

<style></style>
