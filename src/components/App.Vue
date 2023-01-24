<template>
   <div class="main" >
   <button @click="toggleTheme" class="toggle-theme-button">Toggle Theme</button>
      <h1>Students</h1>
      <div class="content">
          <router-view></router-view>
      </div>
   </div>
</template>

<script>
export default {
   name:"App",
    data() {
    return {
      theme: 'white'
    }
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'white' ? 'dark' : 'white';
      document.documentElement.style.setProperty('--bg-color', this.theme === 'white' ? 'white' : 'black');
      document.documentElement.style.setProperty('--text-color', this.theme === 'white' ? 'black' : 'white');
    }
  }
}
</script>

