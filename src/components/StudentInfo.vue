<template>
  <div class="container">
    <button @click="isOpen = true"><img :src="student.photo" alt="Student photo" width="100"></button>
    <div>
      <p>{{ student.name }}</p>
      <p>{{ student.group }}</p>
      <p>{{ isDonePrText }}</p>
  </div>



  <Modal :open="isOpen" @close="isOpen = !isOpen">
    <img :src="student.photo" alt="Student photo">
  </Modal>
  </div>

</template>

<script>
import axios from "axios"
import Modal from "./Modal.vue";
import { ref } from "vue";

export default {
  name:'StudentInfo',
  components:{
    Modal
  },
  props: {
    id: '',
  },
  setup() {
    const isOpen = ref(false);

    return { isOpen };
  },
  data(){
    return{
      student:{},
    }
  },
  computed: {
    isDonePrText(){
      return this.student.isDonePr ? "Здана" : "Не здана";
    }
  },
  mounted(){
    axios.get(`http://34.82.81.113:3000/students/${this.id}`).then((res)=>{
      this.student = res.data;
      console.log(res.data)
    })
  }

}
</script>

