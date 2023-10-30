<template>
  <section class="tw-text-center">
    <h2 class="tw-max-w-[16rem] tw-mx-auto">
      Specify address
    </h2>
    <div class="tw-space-y-4">
      <form class="tw-space-y-2" @submit.prevent="submit">
        <input
          v-model="model"
          autofocus
          type="text"
          name="address"
          class="tw-input tw-w-full tw-font-mono placeholder:tw-font-sans"
          :disabled="disabled"
          :placeholder="placeholder"
          @input="error = ''"
        >
        <button
          type="submit"
          :disabled="disabled"
          class="tw-button tw-button-primary tw-w-full"
        >
          Go!
        </button>
      </form>
      <error-message :error="error" />
    </div>
  </section>
</template>

<script setup lang="ts">
const model = ref('')

const { isLoading: disabled } = useSharedSigningClient()

const selectedChain = useChain()
const chainConfig = useChainConfig(selectedChain)

const error = ref('')

const placeholder = computed(() => {
  return chainConfig.value
    ? `Address on ${chainConfig.value.chainName}`
    : 'Address'
})

const { setFormAddress } = useAddress()

const submit = () => {
  error.value = ''

  if (!model.value) {
    error.value = 'Specify some address first!'
    return
  }

  // assign local input model to stored address to start fetching data for it
  setFormAddress(model.value)
}
</script>
