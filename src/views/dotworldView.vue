<template>
  <div>
    <dotworld />
  </div>
</template>

<script>
import dotworld from "@/components/dotworld.vue";

export default {
  name: "dotworldView",
  components: {
    dotworld,
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
