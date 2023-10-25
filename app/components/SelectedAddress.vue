<template>
  <div v-if="address">
    <address-representation :address="address" />
    <button @click="resetAddress">
      <Icon name="iconoir:cancel" />
    </button>
  </div>
</template>

<script setup lang="ts">
const { address, resetAddress } = useAddress()
</script>
