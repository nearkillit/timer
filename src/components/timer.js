// react
import { useDispatch } from "react-redux";
import Actions from '../modules/actions'
import { Switch, Route, useHistory } from 'react-router-dom'
import Blind from './timer_blind'
// mui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import InputAdornment from '@material-ui/core/InputAdornment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// mui icon
import IconButton from '@material-ui/core/IconButton';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles({
    root: {    
      textAlign: 'center'
    },
    cardContents: {
      textAlign: 'center',
      position: 'relative',
      backgroundColor: '#f0ffff',
      // color: '#fff',
    },
    cardTitle: {      
      // backgroundColor: '#e0ffff',      
    },
    add: {
      fontSize: '80%',      
    }
  });

function Timer (props){
    const classes = useStyles();    
    const dispatch = useDispatch();
    const timersId = props.timer.id
    const history = useHistory();
    const handleLink = path => history.push(path)            

    const inputIntervalTime = (event) => {
      const intervalTime = event.target.value.replace(/\D/g, '')
      if(intervalTime.length > 5) return 
      const index = event.target.name * 1
      dispatch(Actions.updateIntervalTimer({intervalTime, index, timersId}))
    }

    const addIntervalTimer = () => {
      dispatch(Actions.addIntervalTimer({timersId}))
    }

    const deleteIntervalTimer = (index) => {      
      dispatch(Actions.deleteIntervalTimer({index, timersId}))
    }

    const inputLoop = (event) => {
      const loop = event.target.value.replace(/\D/g, '')
      if(loop.length > 3) return 
      dispatch(Actions.updateLoop({loop, timersId}))
    }        

    return (
        <Card className={classes.cardContents}>
            <CardContent>
              <Blind />
              <Typography variant="h5" component="h5" className={classes.cardTitle}>
                {props.timer.name}
              </Typography>              
              <Table>
                <TableBody>
                  {props.timer.interval.map((t,i) => (
                    <TableRow key={i}>
                      <TableCell>{i}</TableCell>
                      <TableCell>
                        <TextField value={t} onChange={inputIntervalTime} name={"0" + i}
                          InputProps={{
                            endAdornment: 
                            <InputAdornment position="end">秒</InputAdornment>
                        }}/>
                      </TableCell>
                      <TableCell>
                      <IconButton onClick={ () => deleteIntervalTimer(i)}><CancelIcon /></IconButton>
                      </TableCell>
                  </TableRow>
                  ))}
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>
                      {props.timer.interval.length < 9 ?
                        <Button onClick={addIntervalTimer} className={classes.add}>
                          <ControlPointIcon />追加
                        </Button>
                        :
                        <span>9つ以上は作成できません</span>
                      }                      
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <TextField value={props.timer.loop} onChange={inputLoop}
                          InputProps={{
                            // startAdornment: 
                            // <InputAdornment position="start">LOOP数</InputAdornment>,
                            endAdornment:
                            <InputAdornment position="end">回繰り返す</InputAdornment>
                        }}/>
              <p>
                <Switch>
                  <Route path='/' exact>
                    <Button onClick={()=>handleLink('/timerdetail/' + timersId)}>スタート</Button>
                  </Route>
                </Switch>
              </p>
            </CardContent>
          </Card>          
        )
}

export default Timer