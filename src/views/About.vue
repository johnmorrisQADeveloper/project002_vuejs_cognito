<template>
  <div class="border">
    <transition-group tag="ul" name="slide-up" appear>
      <li v-for="contact in contacts" :key="contact">{{ contact }}</li>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      newContact: "",
      contacts: ["Beau Thabeast", "Cindy Rella", "Alice Wunderlind"]
    };
  },
  methods: {
    addContact() {
      this.contacts.push(this.newContact);
      this.newContact = "";
    }
  }
};
</script>

<style scoped>
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
    
  