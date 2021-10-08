import * as api from "../api"
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react"
import Actions from '../modules/actions'

// mui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// mui icon
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import BackupIcon from '@material-ui/icons/Backup';
import BookIcon from '@material-ui/icons/Book';

function AuthenticationView(){
  const state = useSelector(state => state)
  const user = useSelector(state => state.user)
  const user_name = useSelector(state => state.username)
  const dispatch = useDispatch();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')  

  const logState = () => {
    console.log(state);    
  }

  const inputUsername = (e) => {
    setUsername(e.target.value)
  }

  const inputPassword = (e) => {
    setPassword(e.target.value)
  }

  const login = () => {
    api
      .fetchTimer({ username, password })
      .then( r => {
        dispatch(Actions.fetchUser({username, password, user:0}))
        dispatch(Actions.fetchTimer({data: r.data.token}))
      })
      .catch(e => 
        alert('パスワードかユーザー名が間違っています'))
  }

  const logout = () => {
    dispatch(Actions.deleteUser())
  }

  const user_register = () => {
    const data = {username, password}
    api
      .signup(data)
      .then( r => {      
        dispatch(Actions.fetchUser({username, password, user:r.data.user}))
        dispatch(Actions.resetTimer())        
      })
      .catch( err => {
        alert('既にそのユーザーは存在しています')
      })             
  }

  const timerSave = () => {
    const data = { user:state.user,
                   username:state.username,
                   password:state.password,
                   timers:state.timers.map(t => {
                        let newId = t.id
                        if(t.instanceId) newId = t.instanceId
                        return{ id:newId, timer_name:t.name, interval:t.interval }})
                 }
    // const data_json = JSON.stringify(data)
        
    api
      .putTimer(data)
      .then( r => {
        alert('保存しました。')
        console.log(r);
      })
      .catch( err => 
        console.log(err)
      )
  }
  
    return(
        <>
          <span>            
            {user > 0 ? 
              <>
              <span>ようこそ{user_name}さん</span>              
              <Button onClick={logout}>
                <LockIcon />ログアウト
              </Button>
              <Button onClick={timerSave}>
                <BackupIcon />データを保存する
              </Button>
              {/* <Button>
                <PublishIcon />データを取得する
              </Button>               */}
              </>
              :
              <>
              <TextField onChange={inputUsername} inputProps={{ maxLength: "16" }} label="ユーザー名" />
              <TextField onChange={inputPassword} inputProps={{ maxLength: "16" }} label="パスワード" />
              <Button onClick={login}>
                <LockOpenIcon />ログイン
              </Button>
              <Button onClick={user_register}>
                <BookIcon />新規登録
              </Button>
              </>
            }
            <Button onClick={logState}>
              state log
            </Button>  
          </span>
        </> 
    )

}

export default AuthenticationView
