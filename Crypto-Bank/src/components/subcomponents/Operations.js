import React from 'react';
import Balance from '../../Images/checkBalance.png';
import deposit from '../../Images/deposit.png';
import withdraw from '../../Images/withdraw.svg';
import Buttoncrypto from './Buttoncrypto';
import { useNavigate } from 'react-router-dom';
import { balanceContext } from '../../App';
// import { contract } from './Choosecrypto'
import { bankABI } from './ABI/simpleBank';
import { bank } from './ABI/TokenBank';

import { signer, signerAddress } from './Homepagecontent';
import '../../App';
import { useContext, useState, useEffect } from 'react';
import { Ethercontract, Bankcontract } from './ContractInstances';
import DropdownMenu from './dropdown';
import { EventRepeat } from '@mui/icons-material';
const { ethers } = require('ethers');

const Operations = (props) => {
  const {
    setOperation,
    setType,
    setAmount,
    walletAddress,
    setWalletAddress,
    bankContract,
    setEvents,
    tokenAddress,
  } = useContext(balanceContext);
  const navigate = useNavigate();
  let contract;

  async function checkBalance() {
    const { signer, EtherContract } = await Ethercontract();
    const signerAddress = await signer.getAddress();
    const network = localStorage.getItem('Network');
    let Amount;

    console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii', tokenAddress);

    // const tokenadd = localStorage.getItem('TokenBalance');
    const jwttoken = localStorage.getItem('JWTToken');
    const res = await fetch('http://localhost:8000/api/etherbalance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `BEARER ${jwttoken}`,
      },
      body: JSON.stringify({ signerAddress, network }),
    });
    console.log('Ether Balance');
    // Amount = await contract.userTokenBalance(signerAddress, tokenAddress);
    contract = EtherContract;
    // Amount = await contract.balances(signerAddress);
    const balance = (await res.json()).amount;

    // const balance = ethers.utils.formatEther(
    //   ethers.utils.parseUnits(Amount.toString(), 'wei'),
    // );
    setAmount(balance);

    setType(props.name);
    setOperation('CHECK');
    navigate('/complete');
  }

  function dateConversion(timestampInSeconds) {
    const date = new Date(timestampInSeconds * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
  }

  function storelogdata(events, eventsArray) {
    events.map((event) => {
      const Transaction = {
        From: event.from.slice(0, 20) + '....',
        To: event.to.slice(0, 20) + '....',
        Amount: event.amount,
        Timestamp: event.timestamp,
      };
      const Time = dateConversion(Transaction.Timestamp);
      eventsArray.push({
        From: Transaction.From,
        To: Transaction.To,
        Amount: Transaction.Amount,
        Timestamp: Time,
      });
    });
  }

  async function listenEvents() {
    let eventsArray = [];
    const { signer, EtherContract } = await Ethercontract();
    const { BankContract } = await Bankcontract();
    const Network = localStorage.getItem('Network');
    const TokenAddress = localStorage.getItem('TokenAddress');
    if (TokenAddress) {
      contract = BankContract;
    } else {
      contract = EtherContract;
    }
    console.log('Ether Contract', contract);
    const signerAddress = await signer.getAddress();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const network = await provider.getNetwork();
    const jwttoken = localStorage.getItem('JWTToken');

    const link = TokenAddress
      ? 'http://localhost:8000/api/logbalance'
      : 'http://localhost:8000/api/etherlogbalance';
    if (network.chainId != '80001') {
      const transactionlog = await fetch(link, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `BEARER ${jwttoken}`,
        },
        body: JSON.stringify({
          signerAddress: signerAddress,
          network: Network,
        }),
      });
      const log = (await transactionlog.json()).data;

      storelogdata(log, eventsArray);
    } else {
      const provider = new ethers.providers.JsonRpcProvider(
        ' https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78',
      );
      const contractAddress = '0x4c42db57C5aed07d7dA496865C69B56Fd5186d30';
      const BankAddress = '0x099C75ED7a12b5AACBaF1eb03e5E824176A9C8ac';
      let Mcontract;
      if (TokenAddress) {
        Mcontract = new ethers.Contract(BankAddress, bank, provider);
      } else {
        Mcontract = new ethers.Contract(contractAddress, bankABI, provider);
      }
      const transactionlog = await fetch(link, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `BEARER ${jwttoken}`,
        },
        body: JSON.stringify({
          signerAddress: signerAddress,
          network: Network,
        }),
      });
      const log = (await transactionlog.json()).data;
      storelogdata(log, eventsArray);
      // let depositedevents = await Mcontract.queryFilter('AmountDeposited');

      // storeEventsdata(depositedevents, eventsArray, signerAddress, true);

      // let withdrawnevents = await Mcontract.queryFilter('AmountWithdrawn');
      // storeEventsdata(withdrawnevents, eventsArray, signerAddress, false);
    }

    console.log(eventsArray);
    setEvents(eventsArray);
    navigate('/transactionlog');
  }

  return (
    <div className="float-right m-auto">
      <div className="flex justify-around flex-col">
        {/* <h1>{console.log(walletAddress)}</h1> */}
        <div className="flex w-fit justify-center m-auto mt-10">
          <h1 className="bg-white shadow-lg shadow-primary rounded-lg px-20 py-6  m-auto outline-none font-bold text-primary text-2xl ">
            CHOOSE &nbsp; YOUR &nbsp; OPERATION
          </h1>
        </div>

        <div className="flex justify-start ml-0 place-content-center mb-14 gap-14 m-auto ">
          <Buttoncrypto image={deposit} text="DEPOSIT" name={props.name} />

          {/* {props.name == 'TOKEN' && <Buttoncrypto image={Balance} text="CHECK" name={props.name} />} */}
          {
            <div className="flex flex-col justify-center place-content-center mb-14 mt-10 pt-10 mr-10">
              <div className="image-container">
                <img
                  className="m-auto mt-10 "
                  src={Balance}
                  alt="image not found"
                  width={150}
                  height={100}
                />
              </div>
              {props.name === 'ETHER' && (
                <button
                  className="bg-primary rounded-full mt-3 mb-4 h-16 px-8 w-max outline-none shadow-md font-bold text-white text-2xl shadow-black hover:bg-least"
                  onClick={checkBalance}
                >
                  CHECK BALANCE
                </button>
              )}
              {props.name === 'TOKEN' && <DropdownMenu balance={true} />}
            </div>
          }

          <Buttoncrypto image={withdraw} text="WITHDRAW" name={props.name} />
          <div></div>
        </div>

        <div className="flex justify-center m-auto">
          <button
            className="bg-primary rounded-full px-20 py-5 mb-10 outline-none shadow-md font-bold text-white text-2xl shadow-black hover:bg-least"
            onClick={listenEvents}
          >
            TRANSACTION LOG
          </button>
        </div>
      </div>
    </div>
  );
};

export default Operations;
