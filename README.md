# BPoNW
BurnPoNW is a deflationary crypto asset with a tokenomics philosophy and distribution algorithm that aims to contribute to PoNW's deflation, while bringing a new $BPoNW token to the PoNW ecosystem. $BPoNW is a capped token and can solely be minted through burning $PoNW tokens.

### Links
* [DApp](https://burnapp.ponw.win)
* [Whitepaper](https://proofofnowork.gitbook.io/proof-of-no-work-whitepaper/BPoNW/) 

### Prerequisites
* npm 6.14+
* node v14.17+
* [Metamask.io](https://metamask.io) browser extension

### Steps to run the frontend

1. `npm install` in root dir
2. `npx hardhat compile` in root dir
3. `cd interface` and then `npm install`
4. `npm start`
5. open http://localhost:3000

### To redeploy the contracts
_The frontend is currently linked to Polygon mainnet contracts. This section is only necessary if you want to redeploy them._

Add `.secrets.json` file in root directory and put your secret phrase as a json format. For example (do not use this mnemonic!):
```
{
    "mnemonic":"crazy crazy crazy crazy crazy crazy crazy crazy crazy crazy crazy buzz"
}
```

Run deploy script (Goerli testnet)
```
npx hardhat run --network goerli scritps/deploy.js
```

