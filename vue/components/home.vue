
<template>
  <h1>This is the {{ title }}</h1>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Home extends Vue {
  get title() {
    return 'Home page'
  }
}
</script>

<style lang="scss" scoped>
h1 {
  color: green;
}
</style>
