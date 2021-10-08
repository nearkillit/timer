// react
import { useSelector, useDispatch } from "react-redux";
import Actions from '../modules/actions'
import { useState } from "react";

// component
import Timer from './timer'

// mui
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';


// material ui のスタイルの指定https://qiita.com/uehaj/items/969ef20ccef850d2e9b1
// material ui gridの作成　https://qiita.com/vimyum/items/5ba06ca166ebe4992617
const useStyles = makeStyles({
  root: {    
    textAlign: 'center'
  },
  cardContents: {
    textAlign: 'center',    
  },
  timer: {
    position: 'relative',
  },
  cancel: {
    position: 'absolute',
    top: '0%',
    left: '80%',
    zIndex: '2',
  },
});

function TimerList(){
  const dispatch = useDispatch();
  const state = useSelector(state => state)
  const [timerName, setTimerName] = useState("")
  const classes = useStyles();

  const getTimerName = (e) => {
    setTimerName(e.target.value)
  }

  const addTimer = () => {
    dispatch(Actions.addTimer({timerName}))
  }

  const deleteTimer = (timersId) => {    
    dispatch(Actions.deleteTimer({timersId}))
  }

  return (
    <div>
      {state.timers.length < 9 ?
        <>
          <TextField label="タイマー名" variant="outlined" inputProps={{ maxLength: "16" }} onChange={getTimerName} />
          <Button onClick={addTimer}>追加する</Button>
        </>
        :
        <span>10つ以上のタイマーの作成にはプレミアムプランが必要です</span>
      }      
      <Grid container spacing={1}>
        { state.timers.map((t,i) => (
          <Grid item xs={4} key={i} className={classes.timer}>
            <IconButton className={classes.cancel} onClick={ () => deleteTimer(t.id)}>
              <ClearIcon />
            </IconButton>
            <Timer timer={t}/>   
          </Grid>
        ))}        
      </Grid>      
    </div>
  )
}

export default TimerList