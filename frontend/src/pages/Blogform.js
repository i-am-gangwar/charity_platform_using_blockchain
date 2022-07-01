import { FormControlLabel, Checkbox, Button, Box, Alert } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterblogUserMutation, useGetLoggedUserQuery } from '../services/userAuthApi';
import { getToken } from '../services/LocalStorageService';
import { useDispatch } from 'react-redux';
import { setUserToken } from '../features/authSlice';
import './css files/blogform.css'
import Dashboard from './Dashboard';
import Web3 from "web3";
import abi from '../abi';
let web3;
// this page is creating blog form to raise fund it is shwon to login users only 
const Blogform = () => {
    const [userWallet, setUserWallet] = useState({
        walletAddress: ""
    })

    const [error, setError] = useState({
        status: false,
        msg: "",
        type: ""
    })
    const navigate = useNavigate();
    const [registerblogUser] = useRegisterblogUserMutation()
    const handleSubmit = async (e) => {
        setError({ status: false });
        e.preventDefault();
        // getting data from blog form submited by user for storing in data base after verification
        const data = new FormData(e.currentTarget);
        const actualData = {
            Blog_title: data.get("Blog_title"),
            Blog_content: data.get("Blog_content"),
            Blog_amount: data.get("Blog_amount"),
            Blog_wallet: data.get("Blog_wallet"),
            Blog_reason: data.get("Blog_reason"),
            Blog_city: data.get("Blog_city"),
            Blog_state: data.get("Blog_state"),
            Blog_pincode: data.get("Blog_pincode"),
            Blog_author: userData.email,
            Blog_fundraised: 0,
            tc: data.get('tc'),
        }
        // checking the required data is filled or not if not then asking for enter  required details again
        if (actualData.Blog_title && actualData.Blog_content && actualData.Blog_amount &&
            actualData.Blog_author && actualData.tc && actualData.Blog_reason
            && actualData.Blog_city && actualData.Blog_state && actualData.Blog_pincode !== null) {

            // generating transaction to save blog on blockchain
            try {
                let sender = await web3.eth.getAccounts();
                const contract = await new web3.eth.Contract(abi, "0x7f7acD845e3B24f06F3a71706859403024CE5a28");
                const create = await contract.methods.addCharity(sender[0], actualData.Blog_amount).send({ from: sender[0] });
                console.log(create.status)
                if (create.status) {
                    const res = await registerblogUser(actualData)
                    if (res.data.status === "success") {
                        navigate('/dashboard')
                    }
                    else if (res.data.status === "failed") {
                        setError({ status: true, msg: "enter fields correctly", type: 'error' })
                    }
                }
                else {
                    setError({ status: true, msg: "Transaction Failed ! Please try again", type: 'error' });
                }
            }
            catch (error) {
                if (error.code === 4001) {
                    setError({ status: true, msg: "Request Declined by User", type: 'error' });
                }
                else {
                    console.log(error)
                }
            }
        }
        else {
            setError({ status: true, msg: "All Fields are Required", type: 'error' })
        }
    }

    // getting wallet access of user automatically  by connect wallet buttons
    const getWalletAddress = async () => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            web3 = new Web3(window.ethereum);
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            // checking if rinkeby is connected or not
            if (chainId !== '0x4') {
                alert("Please connect to rinkeby");
            } else {
                let wallet = accounts[0];

                setUserWallet(
                    {
                        walletAddress: wallet,
                    }
                )
            }
        } else {
            alert("Please install Mask");
        }
    }
    const token = getToken()
    const { data, isSuccess } = useGetLoggedUserQuery(token)

    const [userData, setUserData] = useState({
        email: "",
        name: ""
    })


    useEffect(() => {
        if (data && isSuccess) {
            setUserData({
                email: data.user.email,
                name: data.user.name,
            })
        }
    }, [data, isSuccess])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setUserToken({ token: token }))
    }, [token, dispatch])
    return <>
        <Dashboard />{
            <Box component='form' noValidate sx={{ mt: 1 }} id='blog-form' onSubmit={handleSubmit} >
                <div className='startfundraiser_main_div' >
                    <div>
                        <h2>Tell us about your Fundraiser</h2>
                        <hr></hr>

                        <input type="text" placeholder="Fundraiser Title? *" id='Blog_title' name='Blog_title' required />
                        <h6>Fundraiser title should be between 5-75 characters </h6>

                        <input type="number" placeholder="How much do you want to raise? *" id='Blog_amount' name='Blog_amount' required />
                        <h6>The minimum goal amount is ₹ 5000! </h6>


                        <input type="" placeholder="Enter wallet address *" style={{ width: "70%" }} value={userWallet.walletAddress} id='Blog_wallet' name='Blog_wallet' readOnly required />
                        <button style={{ marginBottom: "0px", borderBottom: "2px solid black" }} onClick={getWalletAddress}>connect wallet address</button>
                        <br /><br />

                        <input type="text" placeholder="Please choose a cause ex- medical,ngo,animal etc.*" id='Blog_reason' name='Blog_reason' required />
                        <h6> should be between 5-25 characters </h6>

                        <input type="text" placeholder="Enter city *" id='Blog_city' name='Blog_city' required />
                        <br /><br />

                        <input type="text" placeholder="Enter state *" id='Blog_state' name='Blog_state' required />
                        <br /><br />

                        <input type="text" placeholder="Enter pincode *" id='Blog_pincode' name='Blog_pincode' required />
                        <br /><br />
                        <br /><br />

                        <div className='text_div'>
                            <h3>Tell the story about why you are running a Fundraiser</h3>
                            <textarea placeholder='Type here... *' id='Blog_content' name='Blog_content' required> </textarea>
                        </div>
                        <div className="submit_div">
                            <FormControlLabel control={<Checkbox value={true} color="primary" name="tc" id="tc" />} label="I agree to term and condition." />
                            <Box textAlign='center'>
                                <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Create Fundraise</Button>
                            </Box>
                            {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}

                        </div>
                    </div>
                </div>
            </Box>}</>
};
export default Blogform;


