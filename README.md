# archyard

A little trial app in the context of the Archway blockchain. First of many, probably.

---


### About

It doesn't use connect kits / tools like `CosmosKit` or `WalletConnect`, as tried to avoid a peel of abstraction and wanted to hack around the raw wallets and clients.
Instead, there's a nice custom [`archway` Nuxt module](./app/modules/archway/index.ts) that exposes some types, utils and composables (heavily utilising `vueuse` utils btw), to provide a way to connect (and re-connect after page refresh) to the network for a consumer app.

> **Warning**
> For now, the app works only with embedded wallets (`keplr` or `leap`).


### But what does this app actually do?

Not much 😄
You can type archway address (or connect your embedded wallet to pull up the address automatically) and see who are your most popular senders and recipients.

In a word, this is some sort of visualization of your interactions within the network.
