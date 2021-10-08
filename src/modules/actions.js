const Actions = {
    addTimer(value) {
      return {
        type: 'ADD_TIMER',
        value,
      }
    },
    deleteTimer(value) {
      return {
        type: 'DELETE_TIMER',
        value,
      }
    },
    addIntervalTimer(value) {
      return {
        type: 'ADD_INTERVAL_TIMER',
        value,
      }
    },
    updateIntervalTimer(value) {
      return {
        type: 'UPDATE_INTERVAL_TIMER',
        value,
      }
    },
    deleteIntervalTimer(value) {
      return {
        type: 'DELETE_INTERVAL_TIMER',
        value,
      }
    },
    updateLoop(value) {
      return {
        type: 'UPDATE_LOOP',
        value,
      }
    },
    updateTimerStopFlag(value) {
      return {
        type: 'UPDATE_TIMER_STOP_FLAG',
        value,
      }
    },
    fetchTimer(value) {
      return {
        type: 'FETCH_TIMER',
        value,
      }
    },
    resetTimer() {
      return {
        type: 'RESET_TIMER',
      }
    },
    fetchUser(value) {
      return {
        type: 'FETCH_USER',
        value,
      }
    },
    deleteUser() {
      return {
        type: 'DELETE_USER',        
      }
    },    
  }
  
  export default Actions