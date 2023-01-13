import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'



const app = createApp({
    data() {
      return {
        students: [],
        search: "",
        student: { name: "", zdav: false, group: "" },
        
        convertorData: [],
        convAmount: 1,
        convResult: 1,

        convHH: 1,
        convDD: 1,

        convHD: 1,
        convDH: 1,

        convFrom: 'D',
        convTo: 'H',

      };
    },
    mounted: function () {
      axios.get("http://34.82.81.113:3000/students").then((response) => {
        this.students = response.data;
      });
      axios.get("https://api.monobank.ua/bank/currency").then((res) =>{
        console.log(res.data); 
        this.convertorData = res.data;

        this.convDH = this.convertorData[0].rateBuy;
        this.convHD = 1 / this.convertorData[0].rateSell;
     });
    },
    methods: {
      deleteStudent(studId) {
        const index = this.students.findIndex((elem) => elem.id === studId);
        this.students.splice(index, 1);
      },
      addStudent() {
        this.student.id = this.students.length + 1;
        this.students.push({ ...this.student });
      },
      convert() {
        console.log(`conv${this.convFrom}${this.convTo}`);
        this.convResult =this.convAmount * this[`conv${this.convFrom}${this.convTo}`]
      },
    },
  });
  app.use(VueAxios, axios);
  app.mount("#app");
  