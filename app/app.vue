<template>
  <main class="tw-container tw-w-screen tw-min-h-screen tw-py-12 tw-flex-center">
    <div>
      Hey
      <select v-model="chain">
        <option value="archway-1">
          mainnet
        </option>
        <option value="constantine-3">
          testnet
        </option>
      </select>
      <Connect :chain="chain" />
    </div>
    <div class="tw-max-w-sm">
      {{ address }}
    </div>
  </main>
</template>

<script setup lang="ts">
const { chain: connectedChain, address } = useSharedSigningClient({ restore: true })

// Init value is restored from prev connection, mainnet as default
const chain = ref<ChainId>(connectedChain.value ?? 'archway-1')
</script>
