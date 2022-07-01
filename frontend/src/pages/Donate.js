import React from 'react'
import { useGetAllUserProjectsQuery } from '../services/userAuthApi';
import { getToken } from '../services/LocalStorageService';
import { useEffect, useState } from 'react';
import { Typography, Button, withStyles, TextField } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useTotalfundraisedMutation, useAlltxnsMutation } from '../services/userAuthApi';
import './css files/blogcard.css';
import Web3 from "web3";
import abi from '../abi';
let web3;
const styles = (theme) => ({

  closeButton: {
    position: 'absolute',
    color: 'warnnig',

  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Donate = () => {
  const [totalfundraised] = useTotalfundraisedMutation()
  const [userWallet, setUserWallet] = useState({
    walletAddress: ""
  })
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  });

  const token = getToken()
  const { data } = useGetAllUserProjectsQuery(token)

  const [open, setOpen] = React.useState(false);
  const [ind, setInd] = useState(0)

  const handleClickOpen = async (i) => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== '0x4') {
        alert("Please connect to rinkeby");
      }
      else {
        let wallet = accounts[0];
        setUserWallet(
          {
            walletAddress: wallet,
          }
        )
        setInd(i)
        setOpen(true);
      }
    }

  };
  const handleClose = () => {
    setOpen(false);
  };
  const [Blog, setBlog] = useState([])
  useEffect(() => {
    const getdata = async () => {
      setBlog(data)

    }
    getdata()
  }, []);
  const [alltxns] = useAlltxnsMutation()
  const check = async (e, address, data) => {
    e.preventDefault()
    let amount = e.target.amount.value
    let prevfundraied = data.Blog_fundraised;
    try {
      let sender = await web3.eth.getAccounts();
      const contract = await new web3.eth.Contract(abi, "0x7f7acD845e3B24f06F3a71706859403024CE5a28");
      if (sender[0].toLowerCase() !== address.toLowerCase()) {
        const sentfromaccount = await contract.methods.donate(address).send({ from: sender[0], value: web3.utils.toWei(amount, "ether") });
        if (sentfromaccount.status) {

          const actualData = {
            Blog_fundraised: prevfundraied + parseFloat(amount),
            id: data._id,
          }
          const res = await totalfundraised({ actualData, token })
          if (res.data.status === "success") {
            console.log("fundraised updated")
          }
          else {
            console.lof("printing error")
            console.lof(res.data.status)
          }

          const actualtxndata = {
            from_account: sentfromaccount.from,
            to_account: data.Blog_wallet,
            amount: amount,
            block_hash: sentfromaccount.blockHash,
            block_number: sentfromaccount.blockNumber,
            txn_hash: sentfromaccount.transactionHash,
            gas_used: sentfromaccount.gasUsed,
            status: sentfromaccount.status,
          }
          const res1 = await alltxns(actualtxndata)
          setOpen(false);
        }
        else if (sentfromaccount.status === false) {
          alert("Transaction Failed ! Please try again");

        }
        else {
          alert("metamask is blocked by your internet connection")
        }
      }
      else {
        alert("User and Donater Accounts are Same");
      }

    }
    catch (error) {
      if (error.code === 4001) {
        alert("Request Declined by User");
      }
      else {

        console.log(error)
      }
    }

  }
  if (data?.length !== 0) {
    return (
      <div>
        <div className="container_div">
          {
            data?.map((i, index) => {

              {/* if (i.Blog_amount !== i.Blog_fundraised) {
              } */}
              return (

                <div className='card_div' >
                  <div className='card_div_1'>
                    <table>
                      <tr><td>Blog title:</td></tr>
                      <tr><td>Total fund required:</td></tr>
                      <tr><td>Blog  wallet:</td></tr>
                      <tr><td>Reason:</td></tr>
                      <tr><td>Address:</td></tr>
                      <tr><td>Blog created by:</td></tr>
                      <tr><td>Amount raised:</td></tr>
                      <tr><td> Raised progress:</td></tr>

                    </table>
                  </div>
                  <div className='card_div_2'>
                    <table>
                      <tr><td>{i.Blog_title} </td></tr>
                      <tr><td>{i.Blog_amount} eth</td></tr>
                      <tr><td>{i.Blog_wallet}</td></tr>
                      <tr><td>{i.Blog_reason} </td></tr>
                      <tr><td> {i.Blog_city},{i.Blog_state} , {i.Blog_pincode}</td></tr>
                      <tr><td>{i.Blog_author}</td></tr>
                      <tr >
                        <td >
                          <button className='button-28'>{parseFloat(i.Blog_fundraised).toFixed(5)}eth </button>
                          <button className='button-28' style={{ marginLeft: "200px" }} onClick={() => { handleClickOpen(index) }}>Donate</button></td>
                      </tr>
                      <tr>
                        <td>
                          <div className="progress" >
                            <div className="progress-done" style={{ width: `${((i.Blog_fundraised / i.Blog_amount) * 100).toFixed(2)}%`, opacity: "1" }} >
                              <span style={{ marginLeft: "90px", color: "black" }}>{((i.Blog_fundraised / i.Blog_amount) * 100).toFixed(2)}%</span>
                            </div>
                          </div> </td>
                      </tr>
                    </table>
                  </div>
                </div>
              )
            })
          }
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              {data?.map((data, i) => {
                if (i === ind) {
                  return (
                    <div>Donate for {data.Blog_title}</div>
                  )
                }

              })}
            </DialogTitle>
            <form
              onSubmit={
                (e) => {
                  data?.map((data, i) => {
                    if (i === ind) {
                      check(e, data.Blog_wallet, data)
                    }
                  })
                }}
            >
              <DialogContent dividers>
                <TextField id="outlined-textarea" label="Donate Amount" variant="outlined" required name="amount" /><br /><br /><br />
                <Typography variant="body2" color="textSecondary" component="p">
                  {data?.map((data, i) => {
                    if (i === ind) {
                      return (
                        <div> from Account : {userWallet.walletAddress}<br></br>
                          to Account : {data.Blog_wallet}</div>
                      )
                    }

                  })}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button autoFocus color="primary" type="submit">
                  Donate money
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </div>
      </div>)

  }
  else {
    return (<div style={{ textAlign: "center", marginTop: "50px", marginBottom: "100px" }}>no blog created...</div>)
  }
}

export default Donate;