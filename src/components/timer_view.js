// react
import { useDispatch } from "react-redux";
import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Actions from '../modules/actions'

// mui
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {    
      textAlign: 'center'
    },
    cardContents: {
      textAlign: 'center',      
    },
    waitTime: {
        color: '#AAA',
        backgroundColor: '#CCC',
        transition: '1s'
    },
    startTime: {
        transition: '1s'
    },
  });

function TimerView(props){
    const dispatch = useDispatch();
    const classes = useStyles();    
    // const state = useSelector(state => state)
    const [start, setStart] = useState(-1)    
    const [stop, setStop] = useState(false)
    const [timeCountDown, setTimeCountDown] = useState('')
    const [intervalCountUp, setIntervalCountUp] = useState(false)
    const getTimer = props.timer
    const [intervalTimer, setIntervalTimer] = useState(getTimer.interval.concat())
    const [loop, setLoop] = useState(getTimer.loop)
    const [endTimer, setEndTimer] = useState(false)
    const intervalTimerOrigin = getTimer.interval.concat()    
    let countDownTimer
    const audioIntervalNext = new Audio(`${process.env.PUBLIC_URL}/se/ホイッスル・単発.mp3`)
    const audioIntervalEnd = new Audio(`${process.env.PUBLIC_URL}/se/ホイッスル・連続.mp3`)

    const countDown = () => {      
      let getStart = start
      if(getStart === -1){        
          setStart(0)
          getStart = 0
      }

      const newIntervalTimer = intervalTimer.concat()
      newIntervalTimer[getStart] -= 1
      intervalTimer[getStart] -= 1
      
      // 次のインターバルタイマーへ
      if(newIntervalTimer[getStart] < 0){             
        setStart(start => start + 1)
        setIntervalTimer(() => intervalTimerOrigin.concat())
        setIntervalCountUp(true)        
        audioIntervalNext.play().catch(err => console.log(err))
      }
      // 次に行かない場合
      else{        
        setIntervalTimer(() => newIntervalTimer)
      }      
    }

    // timer関連
    const timerStart = () => {
      setStop(false)
      setEndTimer(false)
      setIntervalCountUp(false)
      dispatch(Actions.updateTimerStopFlag(false))      
      setStart(0)      
      timerCountDown()      
    }

    const timerStop = () => {
      setStop(true)
      dispatch(Actions.updateTimerStopFlag(true))
      clearInterval(timeCountDown)
    }

    const timerRestart = () => {
      timerCountDown()
      setEndTimer(false)
    }

    const timerReset = () => {
        timerStop()
        //　初期値        
        setStart(-1)
        setLoop(getTimer.loop)
        setIntervalTimer(() => intervalTimerOrigin.concat())
    }    

    const timerCountDown = () => {        
      setStop(false)
      dispatch(Actions.updateTimerStopFlag(false))
      // countDown系
      countDown()      
      countDownTimer = setInterval(() => {                
        countDown()
      }, 1000)
      setTimeCountDown(countDownTimer)            
    }        
    

    // intervalTimerの更新
    useEffect(()=>{      
      setIntervalTimer(props.timer.interval.concat())
      setLoop(props.timer.loop)
    },[props])

    useEffect(()=>{        
      if(start >= intervalTimer.length){        
        setStart(0)
        setLoop(loop => loop -1)
        if(loop < 1){          
          setEndTimer(true)
          timerReset()
        }
      }      
    },[start])

    useEffect(()=>{      
      if(intervalCountUp && !endTimer){
        setIntervalCountUp(false)
        timerStop()
        timerCountDown()        
      }
    },[intervalCountUp])
    
    useEffect(()=>{
      if(endTimer){
        audioIntervalEnd.play().catch(err => console.log(err))        
      }
    },[endTimer])

    return (
        <div>          
          {intervalTimer.map((t,i) => 
            i === start ?
            <Typography variant="h1" component="h1" key={i} className={classes.startTime}>
              {t}
            </Typography>
            :
            <Typography variant="h1" component="h1" key={i} className={classes.waitTime}>
              {t}
            </Typography>
            )}          
          {endTimer ? 
            <>
            <Typography variant="h5" component="h5" >
              終了！
            </Typography>            
            </>
            :
            <Typography variant="h5" component="h5" >
              あと{loop}周
            </Typography>
          }
          {start > -1 ?                  
            <div>
              { stop ?
                <Button onClick={timerRestart}>リスタート</Button>
                :
                <Button onClick={timerStop}>ストップ</Button>
             }                            
              <Button onClick={timerReset}>リセット</Button>
            </div>     
            :
            <div>
              <Button onClick={timerStart}>スタート</Button>
            </div>                   
          }                    
        </div>    
    )
}

export default TimerView