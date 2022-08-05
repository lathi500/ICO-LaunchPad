import { BigNumber, ethers } from "ethers";
import React, { useState } from "react";
import { TextInput } from "../LaunchICO/LaunchICO";
import ICO from "../../metadata/ICOLaunchpad.json";
import "./CoinDetails.css";

let listContract = "0x78b37E1637842F6A56071686f590b912d453300D";

const CoinDetails = ({
  tokenName,
  tokenSymbol,
  tokenSupply,
  tokenAddress,
  tokenStartDate,
  tokenEndDate,
  tokenRate,
}) => {
  const [buyAmount, setBuyAmount] = useState("");
  const [open, setOpen] = useState(true);

  let amount = parseInt(tokenRate) * buyAmount;
  let msgvalue = BigNumber.from(amount);
  // console.log(Tamount);

  const Transfer = async () => {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");
    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let LContract = new ethers.Contract(listContract, ICO.abi, provider);
    let LSigner = LContract.connect(signer);
    console.log("LSigner", LSigner);
    try {
      const test = await LSigner.BuyToken(
        tokenAddress.toString(),
        buyAmount.toString(),
        { value: msgvalue }
      );
      console.log("test", test);
    } catch (err) {
      console.log("err", err);
    }
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div className="coinDetailsContainer">
      {open && (
        <div className="coinDetails">
          <button className="close" onClick={closeModal}>
            &times;
          </button>
          <h4>Token Name: {tokenName}</h4>
          <h4>Token Symbol: {tokenSymbol} </h4>
          <h4>Token Total Supply: {tokenSupply}</h4>
          {/* <h4>Token Description: {tokenDescription}</h4> */}
          <h4>ICO Start Date: {tokenStartDate}</h4>
          <h4>ICO End Date: {tokenEndDate}</h4>
          <h4>Rate: {tokenRate}</h4>
          <h4>Token Address: {tokenAddress}</h4>
          <TextInput
            onChange={(e) => {
              setBuyAmount(e.target.value);
            }}
            value={buyAmount}
            label="Amount to buy"
            placeholder="amount to buy"
          />
          <button
            className="button"
            onClick={() => {
              Transfer();
              closeModal();
            }}
          >
            Buy
          </button>
        </div>
      )}
    </div>
  );
};

export default CoinDetails;
