<template>
  <div v-if="address">
    Here will be d3 chart for
    <address-representation :address="address" />
  </div>
</template>

<script setup lang="ts">
const { address } = useAddress()
</script>
