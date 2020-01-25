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
        v-for="n in filteredList"
        :key="n.id"
        cols="12"
        sm="4"
      >
        <card
          :name="n.name"
          :certCount="n.certificatesCount"
          :studentID="n.id"
        />

      </v-col>
    </v-row>
    <br>
  </div>
</template>

<script>
import card from '../components/studentCards'
export default {
  components: {
    card,
  },
  beforeCreate: async function () {
    this.student = await this.$axios.$get('http://localhost:3000/Student').then((data) => {
      for (var i = 0; i < data.length; i++) {
        this.names.push(data[i].name)
      };
      return data;    });

    console.log(this.student);
    console.log(this.names);
  },
  computed: {
    filteredList () {
      return this.student.filter(student => {
        return student.name.toLowerCase().includes(this.value.toLowerCase())
      })
    }
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
