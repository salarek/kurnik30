<template>
  <div>
    <blackJack />
  </div>
</template>

<script>
import blackJack from "@/components/blackJack.vue";

export default {
  name: "blackJackView",
  components: {
    blackJack,
  },
  data() {
    return {
      drawer: null,
    };
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
  margin-top: 230px;
}
input {
  color: red;
}
</style>
