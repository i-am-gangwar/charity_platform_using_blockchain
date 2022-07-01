import React from 'react'
import Dashboard from './Dashboard';
import { useGetLoggedUserProjectsQuery } from '../services/userAuthApi';
import { getToken } from '../services/LocalStorageService';
import { useState } from 'react';
import { Typography, withStyles } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import TextareaAutosize from 'react-textarea-autosize';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import './css files/blogcard.css';
// this page for shwoing all the projects created by current logged user if any
const styles = (theme) => ({
    closeButton: {
        position: 'absolute',
        color: 'warning',

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
const Userprojects = () => {
    const token = getToken()
    const { data } = useGetLoggedUserProjectsQuery(token)
    const [open, setOpen] = React.useState(false);
    const [ind, setInd] = useState(0)
    const handleClose = () => {
        setOpen(false);
    };

    if (data?.length !== 0) {
        return (
            <div>
                <Dashboard />
                <div className="container_div" style={{ marginLeft: "350px", marginTop: "100px" }}>
                    {data?.map((i, index) => {
                        return (
                            <div className='card_div ' style={{ width: "800px" }}>
                                <div className='card_div_1'>
                                    <table>
                                        <tr><td>Blog title:</td></tr>
                                        <tr><td>Total fund required:</td></tr>
                                        <tr><td>Blog  wallet:</td></tr>
                                        <tr><td>Reason:</td></tr>
                                        <tr><td>Address:</td></tr>
                                        <tr><td>Blog created by:</td></tr>
                                        <tr><td>fund Raised:</td></tr>

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
                                        <tr>
                                            <td > <button className='button-28'>{i.Blog_fundraised} eth </button>
                                                <div className="progress" style={{ marginLeft: "200px", marginTop: "-40px" }}>
                                                    <div className="progress-done" style={{ width: `${((i.Blog_fundraised / i.Blog_amount) * 100).toFixed(2)}%`, opacity: "1" }} >
                                                        <span style={{ marginLeft: "90px", color: "black" }}>{((i.Blog_fundraised / i.Blog_amount) * 100).toFixed(2)}%</span>
                                                    </div>
                                                </div>
                                            </td>

                                        </tr>
                                    </table>
                                </div>
                                <div className='textarea_div'>
                                    <div >About:</div>
                                    <TextareaAutosize className='textarea ' value={i.Blog_content} cols={50} />
                                </div>
                            </div>

                        )
                    }
                    )
                    } <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                            {data?.map((Blog, i) => {
                                if (i === ind) {
                                    return (
                                        <div>All The Donation for {Blog.Blog_title}</div>
                                    )
                                }
                            }
                            )
                            }
                        </DialogTitle>
                        <DialogContent dividers>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {data?.map((Blog, i) => {
                                    if (i === ind) {
                                        return (
                                            <>
                                                <div>
                                                    <div> Wallet Address : {Blog.Blog_wallet}</div>
                                                </div> </>
                                        )
                                    }
                                }
                                )
                                }
                            </Typography>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>)
    }
    else {
        return (<div>Loading the page</div>)
    }
}
export default Userprojects