import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";

const useStyles = makeStyles({    
    blind: {
      position: 'absolute',
      backgroundColor: 'rgba(221,221,221,0.3)',
      width: '100%',
      height: '100%',
      zIndex: '2',       
    },
    blindFont: {
      display: 'inline-block',
      transform: 'rotate(15deg)',
      color: 'rgba(140,140,140,0.7)',
      fontSize: '300%',
    }
  });

function Blind(){
  const classes = useStyles()
  const tSF = useSelector(state => state.timerStopFlag)

  return(
    <>
    {!tSF ? 
      <div className={classes.blind}>
        <p className={classes.blindFont}>Can't touch</p>
      </div>
      :
      <></>
    }   
    </> 
  )

}


export default Blind