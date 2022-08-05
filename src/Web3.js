import {Web3} from 'web3'
// import {INFURA_KEY} from '.env' 
import {contract_address , contract_abi } from "./metadata/metadata"

var web3 = new Web3(new Web3.providers.HttpProvider(`https://kovan.infura.io/v3/${process.env.INFURA_KEY}`))

// let artifacts = 
let CONTRACT_ABI = contract_abi
let CONTRACT_ADDRESS = contract_address

console.log(CONTRACT_ABI, "/n", CONTRACT_ADDRESS);

var verify = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)



