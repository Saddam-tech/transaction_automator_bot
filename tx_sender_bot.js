const Web3 = require("web3");
require("dotenv").config();

// Set up web3 provider
const providerUrl = "https://rpc.lvscan.io";
const web3Provider = new Web3.providers.HttpProvider(providerUrl);

// Create web3 instance
const web3 = new Web3(web3Provider);

// Set up account and private key

// 1. 광주 GPU Server01 Account
const account = "0x210706cbd9D26c26c727f4d3007D819390934375";
const privateKey = process.env.PRIVATE_KEY;

const receiverAddrs = [
  "0x5005F7416fBDe6852C6dd5655DF56B38C1C7Eb28",
  "0x8A6BB38751d14BcD3dc4b87f7989CeeC7f10E01b",
  "0x994135c90E0fCcC6CFbbfD4637504a20fE8616Ff",
  "0xF0a1ABe905138299fbFE61405D8e1445F3C21AcC",
  "0x7a5B7B5be7dFfe7f93323C4563F69d0d4a748380",
  "0x7a5B7B5be7dFfe7f93323C4563F69d0d4a748380",
  "0x78C7Eae20FA700a7C969A0f38403d2a2d45c53b0",
  "0x8Ee6449da703C8D489C2C45BF4d0b41DcC7e0A7D",
  "0xf387AE00b9DB51464E7C52D80FeaE55d158e261B",
  "0xA90156489df9abB0F110bBa479Bfaf39B55D0D7f",
  "0x66A17060464f24edb6Cbf5b38CC47A67DFdD6A79",
  "0xf853b6215A20b0FE92ca62D43ad29Cbf552B0c72",
  "0xF2b64f0D227c0d40307cd4Ba6EE2C7818Bde008F",
  "0xCF529119C86eFF8d139Ce8CFfaF5941DA94bae5b",
];

const value = web3.utils.toWei("0.01", "ether");
const gasPrice = web3.utils.toWei("21000", "gwei");
const gasLimit = 21000;

const countTimes = 13;

// Define function to send transaction
async function sendTransaction() {
  try {
    // Create transaction object
    let txObject, nonce;

    for (let i = 0; i <= countTimes; i++) {
      nonce = await web3.eth.getTransactionCount(account, "pending");
      console.log("Transaction count", nonce);
      txObject = txObject = {
        from: account,
        to: receiverAddrs[i],
        value: value,
        gasPrice: gasPrice,
        gas: gasLimit,
        nonce,
      };
      // Sign transaction
      const signedTx = await web3.eth.accounts.signTransaction(
        txObject,
        privateKey
      );
      // Send transaction
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );
      console.log(`Transaction hash: ${receipt.transactionHash}`);
      console.log(receipt);
    }
  } catch (error) {
    console.error(`Transaction error: ${error}`);
  }
}

sendTransaction();
