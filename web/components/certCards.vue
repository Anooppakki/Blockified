<template>
  <v-card>
    <v-img
      :src="img"
      height="200px"
    ></v-img>
    <v-card-title>
      {{certTitle}}
    </v-card-title>

    <v-card-subtitle>
      {{studentName}}
    </v-card-subtitle>
    <v-card-subtitle>
      {{status}}
    </v-card-subtitle>

  </v-card>
</template>

<script>
export default {
  props: {
    certTitle: {
      type: String,

    },
    studentName: {
      type: String,

    },
    status: {
      type: String,
    },
    img: {
      type: String,

    },
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
