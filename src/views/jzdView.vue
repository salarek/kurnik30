<template>
  <div>
    <jzd />
  </div>
</template>

<script>
import jzd from "@/components/jzd.vue";

export default {
  name: "jzdView",
  components: {
    jzd,
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
