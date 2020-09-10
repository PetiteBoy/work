<template>
  <div>
    <h1>{{ name }}</h1>
    {{ count }}
    <button @click="add">add</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      name: "wrz",
      count: 0,
    };
  },
  methods: {
    add() {
      this.count++;
    },
  },
};
</script>

