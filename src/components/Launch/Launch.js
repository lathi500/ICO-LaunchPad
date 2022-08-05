import React, { useState } from "react";
import { ethers } from "ethers";
import { TextInput } from "../LaunchICO/LaunchICO";
import IERC from "../../metadata/IERC20.json";
import ICO from "../../metadata/ICOLaunchpad.json";
import "./Launch.css";

const Launch = () => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [rate, setRate] = useState("");
  const [returnToken, setReturnToken] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [open, setOpen] = useState(true);

  let listContract = "0x78b37E1637842F6A56071686f590b912d453300D";

  const approve = async () => {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");
    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    //Approval
    let TContract = new ethers.Contract(tokenAddress, IERC.abi, provider);
    let Tsigner = TContract.connect(signer);
    Tsigner.approve(listContract, tokenAmount.toString());
  };

  const list = async () => {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");
    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    let LContract = new ethers.Contract(listContract, ICO.abi, provider);
    let LSigner = LContract.connect(signer);
    LSigner.listProject(
      tokenAddress.toString(),
      tokenAmount.toString(),
      rate.toString(),
      returnToken.toString(),
      startDate.toString(),
      endDate.toString()
    );
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      {open && (
        <div className="launch">
          <button className="close" onClick={closeModal}>
            &times;
          </button>
          <TextInput
            onChange={(e) => {
              setTokenAmount(e.target.value);
            }}
            label="Supply Amount"
            value={tokenAmount}
            placeholder="Amount To Supply"
          />
          <TextInput
            onChange={(e) => {
              setTokenAddress(e.target.value);
            }}
            label="Token Address"
            value={tokenAddress}
            placeholder="Token Address"
          />
          <TextInput
            onChange={(e) => {
              setRate(e.target.value);
            }}
            label="Rate"
            value={rate}
            placeholder="Rate"
          />
          <TextInput
            onChange={(e) => {
              setReturnToken(e.target.value);
            }}
            label="Tokens"
            value={returnToken}
            placeholder="Number of Tokens"
          />
          <TextInput
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
            label="Start Date"
            value={startDate}
            placeholder="Start date in Epoch"
          />
          <TextInput
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
            label="End Date"
            value={endDate}
            placeholder="End Date in Epoch"
          />
          <div className="buttonContainer">
            <button className="button" onClick={approve}>
              Approve
            </button>
            <button className="button" onClick={list}>
              List
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Launch;
