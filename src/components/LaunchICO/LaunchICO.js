import React, { useState } from "react";
import { ethers } from "ethers";
import ERC from "../../metadata/ERC.json";
import "./LaunchICO.css";

export const TextInput = ({ label, placeholder, onChange }) => {
  return (
    <div className="textContainer">
      <label>{label} : </label>
      <input type="text" placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

const LaunchICO = () => {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [initalAmount, setInitalAmount] = useState("");
  const [open, setOpen] = useState(true);

  const deploy = async () => {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");
    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let factory = new ethers.ContractFactory(ERC.abi, ERC.bytecode, signer);
    let contract = await factory.deploy(
      initalAmount.toString(),
      tokenName.toString(),
      tokenSymbol.toString()
    );

    setOpen(false);
    await contract.deployed();
    alert(contract.address);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      {open && (
        <div className="modalContainer">
          <button className="close" onClick={closeModal}>
            &times;
          </button>
          <h1>Launch ERC20 Token</h1>
          <div className="line"></div>
          <TextInput
            value={tokenName}
            onChange={(e) => {
              setTokenName(e.target.value);
            }}
            name="tokenName"
            label="Token Name"
            placeholder="Token Name"
          />
          <TextInput
            value={tokenSymbol}
            onChange={(e) => {
              setTokenSymbol(e.target.value);
            }}
            name="tokenSymbol"
            label="Token Symbol"
            placeholder="Token Symbol"
          />
          <TextInput
            value={initalAmount}
            onChange={(e) => {
              setInitalAmount(e.target.value);
            }}
            name="initialAmount"
            label="Initial Amount"
            placeholder="Initial Amount"
          />
          <button
            onClick={() => {
              deploy();
              closeModal();
            }}
          >
            Mint
          </button>
        </div>
      )}
    </div>
  );
};

export default LaunchICO;
