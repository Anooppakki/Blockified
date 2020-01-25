<template>
  <div class="container">

    <nuxt-link to="/event">
      <v-btn>Start Event</v-btn>
    </nuxt-link>
    <div></div>
    <br>
    <h2>Certificate List</h2>
    <v-row>
      <v-col
        v-for="n in cards"
        :key="n.id"
        cols="12"
        sm="4"
      >
        <card
          :title="n[1]"
          :studentName="n[6]"
          :img="n[3]"
          :status="n[4]"
        />

      </v-col>
    </v-row>
    <br>
  </div>
</template>

<script>
import card from '../../components/certCards'

export default {
  components: {
    card
  },
  beforeCreate: async function () {
    console.log(this.$route.params.id);
    var inst = await this.$axios.$post('http://localhost:3000/listStudentCertificates', {
      studentID: this.$route.params.id
    })
      .then(function (response) {
        return (response);
      })
      .catch(function (error) {
        console.log(error);
      });
    for (var i = 0; i < inst.length; i++) {
      await this.cards.push(inst[i])
    };
    console.log(this.cards);
  },
  data: () => {
    return {
      cards: []
    }
  }
}
</script>

<style>
