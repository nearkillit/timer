// react
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react'

// component
// import Timer from './timer'
import TimerView from './timer_view'

// mui
// import Grid from '@material-ui/core/Grid';  

function TimerDetail(){    
    const {Timer_id} = useParams()
    const getTimers = useSelector(state => state.timers)    
    const [timer, setTimer] = useState(getTimers.filter(t => t.id == Timer_id)[0])   

    useEffect(()=>{      
      setTimer(getTimers.filter(t => t.id == Timer_id)[0])
    },[getTimers])

    return (
      <div>        
        {/* <Grid container spacing={1}>        
          <Grid item xs={4}>
            <Timer timer={timer} />
          </Grid>
          <Grid item xs={8}> */}
            <TimerView timer={timer}/>
          {/* </Grid>
        </Grid> */}
      </div>
    )
}

export default TimerDetail