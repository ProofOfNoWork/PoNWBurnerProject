# BPoNW
BurnPoNW ($BPoNW) token has a fixed total supply & can only be minted by burning Proof of No Work ($PoNW) tokens. Once minted, $BPoNW can be used to mine $PLS, PulseChain's native gas token. The $PLS is gathered from $BPoNW minters, who are charged a $PLS fee ontop of their $PoNW burn in order to mint $BPoNW. This means there is no need to sell the $BPoNW to fund the mining, putting no inherent sell pressure on $BPoNW token 🚀. 

### Links
* [DApp](https://burn.ponw.win)
* [Whitepaper](https://proofofnowork.gitbook.io/burnponw-whitepaper/) 

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

