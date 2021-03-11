
<template>
  <h1>Shared component</h1>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
h1 {
  color: blue;
  font-size: 60px;
  background: orange;
  border: 4px dashed black;
}
</style>
