// `nuxt/kit` is a helper subpath import you can use when defining local modules
// that means you do not need to add `@nuxt/kit` to your project's dependencies
import { addImportsDir, addTypeTemplate, createResolver, defineNuxtModule } from 'nuxt/kit'
import * as chains from './runtime/utils/chains'

const declarations = (specifiedChainIDs: ChainId[]) => `// Generated by archway module
declare type ChainId = ${
  Object.values(specifiedChainIDs).map(x => `"${x}"`).join(' | ')
}\n`

interface ModuleOptions {
  chains?: (typeof chains)[keyof typeof chains]['chainId'][]
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'archway',
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const supportedChains = options?.chains ?? Object.values(chains).map(x => x.chainId)

    // expose supported chains, used in the `useSupportedChains` composable
    nuxt.options.runtimeConfig.public.chains = supportedChains

    addImportsDir(resolve('./runtime/utils'))
    addImportsDir(resolve('./runtime/composables'))
    addTypeTemplate({
      filename: 'types/archway.d.ts',
      getContents: () => declarations(supportedChains),
    })
  },
})
