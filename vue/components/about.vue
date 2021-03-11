
<template>
  <h1>This is the {{ title }}</h1>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class About extends Vue {
  get title() {
    return 'About page'
  }
}
</script>

<style lang="scss" scoped>
h1 {
  color: red;
}
</style>
