<template>
    <div id ="app">
		<input type="text" name="search" v-model="search"><br>
		<table class="table table-dark">
			<tr v-for="item in students"  v-bind:key="item._id">
        <ShowSTD :item="item"></ShowSTD>
			</tr>
		</table>
        <div class="input-container">
        <p class="add-student"> Додавання студента:</p>
        <InputSTD :student="student"></InputSTD>
		<button class="add-button" @click="addStudent()">Add student</button>
        
        </div>

			<br>
			<hr>
		
			<h3>Converter</h3>
			<p>Amount: 
				<input  v-model = "convAmount" @change="convert()">
			</p>
			<p>From:
				<select v-model="convFrom" @change="convert()">
					<option value="H">UAH</option>
					<option value="D">USD</option>
				</select>
			
				To:
				<select v-model="convTo" @change="convert()">
					<option value="H">UAH</option>
					<option value="D">USD</option>
				</select>
			</p>

			<p>
				Exchange Rates <br>
				USD => UAH = {{convDH}}<br>
				UAH => USD = {{convHD}}<br>
			</p>

			<p>
				Result: <input type="text" v-model ="convResult">
			</p>
	</div>
</template>

    
<script>
import axios from 'axios';
import InputSTD from './InputSTD.vue';
import ShowSTD from './ShowSTD.vue';

export default {
    components: {
    InputSTD,
    ShowSTD
        },
	data() {
    return {
        students: [],
        search: "",
        student: { name: "", isDonePr: false, group: "" },
        isEdit:false,
        
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
    addStudent() {
      axios.post("http://34.82.81.113:3000/students",{ ...this.student }).then(
        (response)=>{
          this.students.push(response.data);
        }
      );
    },
    deleteStudent(studId) {
      axios.delete(`http://34.82.81.113:3000/students/${studId}`).then(()=>{
        this.students = this.students.filter((item)=>item._id !== studId);
      });
    },
    updateStudent(newStudent) {
      axios.put(`http://34.82.81.113:3000/students/${newStudent._id}`,
      {
        name:newStudent.name,
        isDonePr:newStudent.isDonePr,
        group:newStudent.group
      }).then(
        (response)=>{
          console.log(response);
        }
      );
    },
    

    convert() {
        console.log(`conv${this.convFrom}${this.convTo}`);
        this.convResult =this.convAmount * this[`conv${this.convFrom}${this.convTo}`]
    },
    },
}
</script>


