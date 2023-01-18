<template>
  <template v-if="!isEdit">
    <router-link :to="'/student-info/'+item._id">
      <td>{{item.name}}</td>
    </router-link>
    <td><input type="checkbox" v-model="item.isDonePr"></td>
    <td>{{item.group}}</td>
    <td><a href = "#" @click="deleteStudent(item._id)">Видалити</a></td>
  </template>
  
  <InputSTD :student="newStudent" v-else></InputSTD>
  <td v-if="!isEdit"><a href = "#" @click="isEdit = !isEdit,newStudent = item">Редагувати</a></td>
  <td v-else><a href = "#" @click="updateStudent(newStudent)">Редагувати дані</a></td>

</template>

<script >
import { defineComponent } from 'vue';
import InputSTD from './InputSTD.vue';
export default defineComponent({
  name: "ShowSTD",
   components: {
    InputSTD
  },
  props: {
    item: {
      type: Object,
      require: true
    }
  },
   data() {
    return {
      isEdit:false,
      newStudent:{},
    };
  },
   methods:{
    deleteStudent(studId) {
      this.$parent.deleteStudent(studId);
    },
    updateStudent(newStudent) {
      this.isEdit=!this.isEdit;
      this.$parent.updateStudent(newStudent);
    }
  }
});
</script>