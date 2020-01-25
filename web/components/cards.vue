<template>
  <v-card>
    <v-img
      :src="img"
      height="200px"
    ></v-img>
    <v-card-title>
      title
    </v-card-title>

    <v-card-subtitle>
      student
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        text
        color="success"
      >Verify</v-btn>

      <v-spacer></v-spacer>

      <v-btn
        color="error"
        text
      >
        Reject
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    name: {
      type: String,

    },
    student: {
      type: String,

    },
    img: {
      type: String,

    }
  },

  data () {
    return {
    }
  },
  methods: {

  }
}
</script>

<style>
</style>
