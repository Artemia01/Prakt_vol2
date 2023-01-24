<template>
   <div class="main" :class="{ white:isWhite , dark:!isWhite }">
      <h1>Students</h1>
      <div class="content">
      <button @click="changeTheme" id="changeThemeButton"> Змінити тему</button>
          <router-view></router-view>
      </div>
   </div>
</template>

<script>
export default {
   name:"App",
   data(){
      return{
         isWhite:"",
      }
   },
   mounted(){
      this.isWhite = this.$store.getters.getTheme;
   },
   methods:{
      changeTheme(){
         this.isWhite = !this.isWhite
         this.$store.commit('changeTheme', this.isWhite);
      }
   }
}
</script>