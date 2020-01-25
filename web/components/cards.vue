<template>
  <v-card>
    <v-img
      :src="img"
      height="200px"
    ></v-img>
    <v-card-title>
      {{name}}
    </v-card-title>

    <v-card-subtitle>
      {{student}}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        text
        color="success"
        @click="verify"
      >Verify</v-btn>

      <v-spacer></v-spacer>

      <v-btn
        color="error"
        text
        @click="reject"
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

    },
    certID: {
      type: String,

    }
  },

  data () {
    return {
    }
  },
  methods: {
    async verify () {
      var val = await this.$axios.$post('http://localhost:3000/verifyCertificate', {

        certificateID: this.certID

      })
        .then(function (response) {
          window.location.reload(true)
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    async reject () {
      var val = await this.$axios.$post('http://localhost:3000/rejectCertificate', {

        certificateID: this.certID

      })
        .then(function (response) {
          window.location.reload(true)
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    }
  }
}
</script>

<style>
</style>
