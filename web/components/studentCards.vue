<template>
  <v-card>
    <v-card-title>
      {{name}}
    </v-card-title>

    <v-card-subtitle>
      No. of certificates : {{certCount}}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        text
        color="success"
        v-on:click="validate"
      >View Certificates</v-btn>

      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    name: {
      type: String,

    },
    certCount: {
      type: String,
    },
    studentID: {
      type: String
    }
  },
  data () {
    return {
    }
  },
  methods: {
    validate () {

      this.$router.push({ path: '/' + this.studentID })

    }
  }
}
</script>

<style>
</style>
