<template>
  <div class="container">

    <nuxt-link to="/event">
      <v-btn>Start Event</v-btn>
    </nuxt-link>
    <div></div>
    <br>
    <h2>Pending Verification</h2>
    <v-row>
      <v-col
        v-for="n in cards"
        :key="n.id"
        cols="12"
        sm="4"
      >
        <card
          :name="n.title"
          :student="n.student"
          :img="n.img"
        />

      </v-col>
    </v-row>
    <br>
  </div>
</template>

<script>
import card from '../components/cards'
import blocks from '../components/blocks'

export default {
  components: {
    card,
    blocks
  },
  beforeCreate: async function () {
    this.cards = await this.$axios.$get('http://localhost:3000/Certificate').then((data) => { return data });
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
