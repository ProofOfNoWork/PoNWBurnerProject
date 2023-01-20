const { expect } = require("chai");
const { ethers } = require("hardhat");
const { abi } = require("../../artifacts/contracts/DBXenERC20.sol/DBXenERC20.json");
const { Permit } = require('../helpers/eip712');
const ethSigUtil = require('eth-sig-util');
const { Converter } = require("../utils/Converter.ts");
let ipfsLink = "QmWfmAHFy6hgr9BPmh2DX31qhAs4bYoteDDwK51eyG9En9";
let payload = Converter.convertStringToBytes32(ipfsLink);


describe("Test permit function", async function() {
    let rewardedAlice, dxn, dbxERC20Relayer;
    let alice;
    const chainId = 31337;
    const name = "DBXen Reward Token on Polygon";
    const version = "1";
    const nonce = 0;
    const maxDeadline = ethers.constants.MaxUint256;

    beforeEach("Set enviroment", async() => {
        [alice, relayer, messageReceiver] = await ethers.getSigners();

        const DBXen = await ethers.getContractFactory("DBXen");
        rewardedAlice = await DBXen.deploy(ethers.constants.AddressZero);
        await rewardedAlice.deployed();

        const DBXenViews = await ethers.getContractFactory("DBXenViews");
        deb0xViews = await DBXenViews.deploy(rewardedAlice.address);
        await deb0xViews.deployed();

        const dbxAddress = await rewardedAlice.dxn()
        dxn = new ethers.Contract(dbxAddress, abi, hre.ethers.provider)
        dbxERC20Relayer = dxn.connect(relayer)
    });

    it("Stake tokens after using the permit function", async function() {
        await rewardedAlice["send(address[],bytes32[][],address,uint256,uint256)"]([messageReceiver.address], [payload], ethers.constants.AddressZero, 0, 0, { value: ethers.utils.parseEther("1") })

        await hre.ethers.provider.send("evm_increaseTime", [60 * 60 * 24])
        await hre.ethers.provider.send("evm_mine")

        await rewardedAlice.claimRewards();
        const balance = await dxn.balanceOf(alice.address);
        const deadline = maxDeadline;
        const domain = { name, version, chainId, verifyingContract: dxn.address }
        const types = { Permit }
        const value = { owner: alice.address, spender: rewardedAlice.address, value: balance, nonce, deadline }
        const signature = await alice._signTypedData(domain, types, value)
        expandedSig = ethers.utils.splitSignature(signature);


        await dbxERC20Relayer.permit(alice.address, rewardedAlice.address,
            balance, maxDeadline, expandedSig.v, expandedSig.r, expandedSig.s)

        expect(await dxn.nonces(alice.address)).to.equal('1');
        expect(await dxn.allowance(alice.address, rewardedAlice.address)).to.equal(balance);

        await rewardedAlice.stake(balance)

        await hre.ethers.provider.send("evm_increaseTime", [60 * 60 * 24 * 2])
        await hre.ethers.provider.send("evm_mine")

        let unstakeAmount = await deb0xViews.getAccWithdrawableStake(alice.address)
        await rewardedAlice.unstake(unstakeAmount)

        expect(await dxn.balanceOf(alice.address)).to.equal(balance);
    })
})