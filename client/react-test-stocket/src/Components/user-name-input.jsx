import { useState, useContext } from "react";
import RoomContext from "../untils/RoomContext";
import '../style/user-name-input.scss'
import Alert from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';


function UserName({ showUserName, setUserNameHandler }) {


  const [open, setOpen] = useState(false)
  const [user, setUser] = useState('')

  const submitName = () => {
    if (user == '') {
      setOpen(true)
      return
    } else {
      setUserNameHandler(user)
      showUserName(false)
      setUser('')
    }
  }

  const setInputHandler = (e) => {
    setUser(e)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <div className="user_name">
        <input
          type="text"
          placeholder="請輸入名稱"
          value={user}
          onChange={(e) => setInputHandler(e.target.value.trim())} />
        <button onClick={submitName}>確認</button>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={handleClose}
        >
          <Alert severity="error">請輸入正確名稱!</Alert>
        </Snackbar>
      </div>
    </>
  )
}

export default UserName