import React from "react";
import Popup from "reactjs-popup";
import CoinDetails from "../CoinDetails/CoinDetails";
import "./ICOlist.css";

const ICOlist = ({
  tokenName,
  tokenSymbol,
  tokenAddress,
  tokenSupply,
  tokenStartDate,
  tokenEndDate,
  tokenRate,
}) => {
  return (
    <div className="list">
      <div className="img">{tokenSymbol[0]}</div>
      <h4>{tokenSymbol}</h4>
      <h4>{tokenName}</h4>
      <h4>{tokenAddress}</h4>
      <h4>{tokenSupply}</h4>
      <Popup
        trigger={<button className="detailsButton">View Details</button>}
        modal
      >
        <div>
          <CoinDetails
            tokenName={tokenName}
            tokenSymbol={tokenSymbol}
            tokenAddress={tokenAddress}
            tokenSupply={tokenSupply}
            tokenStartDate={tokenStartDate}
            tokenEndDate={tokenEndDate}
            tokenRate={tokenRate}
          />
        </div>
      </Popup>
    </div>
  );
};

export default ICOlist;
