<template>
  <section>
    <h2>Specify address</h2>
    <form @submit.prevent="submit">
      <input
        v-model="model"
        type="text"
        name="address"
        :disabled="disabled"
        :placeholder="placeholder"
      >
      <button type="submit" :disabled="disabled">
        Go!
      </button>
    </form>
  </section>
</template>

<script setup lang="ts">
const model = ref('')

const { isLoading: disabled } = useSharedSigningClient()

const selectedChain = useChain()
const chainConfig = useChainConfig(selectedChain)

const placeholder = computed(() => {
  return chainConfig.value
    ? `Address in ${chainConfig.value.chainName}`
    : 'Address'
})

const { setFormAddress } = useAddress()

const submit = () => {
  // assign local input model to stored address to start fetching data for it
  setFormAddress(model.value)
}
</script>
