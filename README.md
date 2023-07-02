# near-art-pop
This lets you prove to your friends that your cool art generated using DALL-E was made by you.


Requirements
- Git
- Node
- Rust
- A NEAR Wallet
- NEAR-CLI


Quickstart:
Clone Repo:
`bash
git clone
`
`bash
cd frontend
npm install
npm run dev
`

Deploy the smart contract to near testnet
1. `bash ./scripts/build.sh`
2. `bash near login`
3. `bash near deploy --wasmFile res/non_fungible_token.wasm --accountId $ID `

