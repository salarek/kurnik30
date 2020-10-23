<template>
  <div>
    <saper />
  </div>
</template>

<script>
import saper from "@/components/saper.vue";

export default {
  name: "saperView",
  components: {
    saper,
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

