<template>
    <div>
		<input type="text" name="search" v-model="search"><br>
		<table class="table table-dark">
			<tr v-for="item in students"  v-bind:key="item._id"> 
				<td>{{item.name}}</td><td><input type="checkbox" v-model="item.isDonePr"></td>
				<td>{{item.group}}</td><td><a href = "#" @click="deleteStudent(item._id)">Видалити</a></td>
			</tr>
		</table>

			<input v-model="student.name">
			<input type="checkbox" v-model="student.isDonePr">
			<select v-model="student.group">
				<option value="RPZ 19 1/9">RPZ 19 1/9</option>
				<option value="RPZ 19 2/9">RPZ 19 2/9</option>
			</select>
			<button @click="addStudent()">Add student</button>

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

export default {
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
}
</script>


