<template>
  <div class="border">
    <h1>CRUD App</h1>
    <transition-group name="slide-up" tag="ul" appear>
      <li v-for="(list, index) in lists" :key="index">{{ list }}</li>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      lists: ["API GATEWAY", "LAMBDA", "Dynamo Db", "Serverless"]
    };
  }
};
</script>

<style scoped>
/* group transition */
.slide-up-enter {
  transform: translateX(10px);
  opacity: 0;
}
.slide-up-enter-active {
  transition: all 0.2s ease;
}
.slide-up-move {
  transition: transform 0.5s ease-out;
}
</style>