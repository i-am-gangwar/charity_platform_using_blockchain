import React from 'react'
import './css files/alltxn.css'
import { useGetAlltxnsinfoQuery } from '../services/userAuthApi'
import { getToken } from '../services/LocalStorageService';
// this page is showing all the transaction history on alltxns page  for it we are fetching the data from database where we have 
// saved the transaction details. you can also check on rinkeby test netwok .
const Alltxn = ({ txn }) => {
    const token = getToken()
    const { data } = useGetAlltxnsinfoQuery(token)
    if (data?.length !== 0) {
        return (<> <h6>Track all Transaction History </h6>
            <h3 style={{ marginLeft: "100px" }}>*Recent transaction is at the top </h3>
            <div className='main_div_of_alltxn_page'>
                {data?.map((i, index) => {
                    return (<div className='alltxn_center_div'>
                        <span className='heading'>  <span className='heading_one'>from account:</span>{i.from_account}</span><span><span className='heading_one'> to account:</span> {i.to_account}</span><br />
                        <span className='heading'> <span className='heading_one'>blockHash:</span> 0xD1B87A9aB6499778D823e4599A75855f94b41194</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><span className='heading_one'>block number: </span>{i.block_number} </span> &nbsp;&nbsp;<span><span className='heading_one'>amount:</span> {i.amount} ether</span><br />
                        <span className='heading'><span className='heading_one'>Transaction hash:</span>{i.txn_hash}</span>&nbsp;&nbsp;&nbsp;<span > <span className='heading_one'>gasUsed:</span> {i.gas_used} ether</span>&nbsp;&nbsp;&nbsp;&nbsp;<span> <span className='heading_one'>status:</span> <bold style={{ color: "green" }}>{i.status}</bold> </span>
                    </div>

                    )
                })
                }</div>
        </>
        )
    }

    else {
        return (<div style={{ textAlign: "center", marginTop: "50px", marginBottom: "100px" }}>no txns have done yet...</div>)
    }
}

export default Alltxn;