<template>
  <div class="container">
    <v-autocomplete
      v-model="value"
      :items="names"
      dense
      filled
      label="Search"
    ></v-autocomplete>
    <div></div>
    <br>
    <h2>Student List</h2>
    <v-row>
      <v-col
        v-for="n in student"
        :key="n.id"
        cols="12"
        sm="4"
      >
        <card
          :name="n[1]"
          :certCount="n[3]"
          :studentID="n[0]"
        />

      </v-col>
    </v-row>
    <br>
  </div>
</template>

<script>
import card from '../../components/studentCards'
export default {
  components: {
    card,
  },
  beforeCreate: async function () {
    console.log("testing for beforeHook");
    this.student = await this.$axios.$get('http://localhost:3000/listStudents')
      .then(function (response) {
        return (response);
      })
      .catch(function (error) {
        console.log(error);
      });
    for (var i = 0; i < this.student.length; i++) {
      await this.names.push(this.student[i][1])
    };
    console.log(this.student);
  },
  computed: {
    // filteredList () {
    //   return this.student.filter(student => {
    //     return student..toLowerCase().includes(this.value.toLowerCase())
    //   })
    // }
  },
  data: () => {
    return {
      student: [],
      names: [],
      value: '',
    }
  }
}
</script>

<style>
