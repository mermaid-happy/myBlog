<template>
  <div class="hint" :class="{ 'hint-failure': hint.colorRed }">
    {{ hint.info }}
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    computed: mapGetters({
      hint: 'getHint',
    }),
  };
</script>

<style>
  .hint {
    padding: 10px 0px;
    text-align: center;
    color: #468847;
    background-color: #DFF0D8;
  }

  .hint-failure {
    color: #B94A48;
    background-color: #F2DEDE;
  }
</style>
