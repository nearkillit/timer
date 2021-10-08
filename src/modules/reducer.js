import { compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import persistState from "redux-localstorage";
import { createStore } from 'redux';

// 初期State
const initialState = {    
        user:0,
        username:'',
        pasword:'',
        timers:[
          {
            id:2,
            name:'筋トレ',
            interval:[3,3,3],
            loop:0
          }
        ],
        timerStopFlag: true,             
  }

  // Reducer処理
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_USER': {
        const user = action.value.user
        const username = action.value.username
        const password = action.value.password
        return {...state, username, password, user }
      }
      case 'DELETE_USER': {
        const user = 0
        const username = ''
        const password = ''
        return {...state, user, username, password }
      }
      case 'FETCH_TIMER': {        
        const timers = action.value.data.timers.map( t  => { return { ...t, loop:0 } })        
        return {...state, user:action.value.data.userid, timers }
      }
      case 'ADD_TIMER': {
        const initialTimer = { 
          id:0,
          name:'',            
          interval:[],
          loop:5
        }
        const newTimer = Object.assign({},initialTimer)
        const newTimers = state.timers
        newTimer.name = action.value.timerName  
        // idの付与
        newTimer.id = newTimers.reduce((p,c) => p > c.id ? p : c.id , 1) + 1
        newTimer.instanceId = 1
        newTimers.push(newTimer)             
        return { ...state, timers: newTimers }
      }
      case 'DELETE_TIMER': {        
        const newTimers = state.timers.filter(t => t.id !== action.value.timersId)
        return { ...state, timers: newTimers }
      }
      case 'RESET_TIMER': {
        const resetTimers = state.timers.map(t =>{ return {...t, instanceId:1}})
        console.log(resetTimers);
        return { ...state, timers: resetTimers }
      }
      case 'ADD_INTERVAL_TIMER': {        
        const getTimers = state.timers
        const getTimer = getTimers.filter(t => t.id === action.value.timersId)[0]        
        getTimer.interval.push(5)        
        const newTimers = getTimers.map(t => t.id === action.value.timersId ? getTimer : t)
        return { ...state, timers: newTimers }
      }
      case 'UPDATE_INTERVAL_TIMER': {
        const getTimers = state.timers
        const getTimer = getTimers.filter(t => t.id === action.value.timersId)[0]
        getTimer.interval[action.value.index] = action.value.intervalTime * 1        
        const newTimers = getTimers.map(t => t.id === action.value.timersId ? getTimer : t)        
        return { ...state, timers: newTimers }
      }
      case 'DELETE_INTERVAL_TIMER': {        
        const getTimers = state.timers
        const getTimer = getTimers.filter(t => t.id === action.value.timersId)[0]
        getTimer.interval.splice(action.value.index, 1)        
        const newTimers = getTimers.map(t => t.id === action.value.timersId ? getTimer : t)        
        return { ...state, timers: newTimers }
      }
      case 'UPDATE_LOOP': {
        const getTimers = state.timers
        const getTimer = getTimers.filter(t => t.id === action.value.timersId)[0]        
        getTimer.loop = action.value.loop * 1        
        const newTimers = getTimers.map(t => t.id === action.value.timersId ? getTimer : t)        
        return { ...state, timers: newTimers }
      }
      case 'UPDATE_TIMER_STOP_FLAG': {
        return { ...state, timerStopFlag: action.value}
      }
      default: {
        return state
      }
    }
  }

const enhancer = compose(persistState(['timers','timerStopFlag'], { key: 'user' }),applyMiddleware(thunk));

const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ,
  enhancer
)

export default store