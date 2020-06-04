require('dotenv').config()
const opn = require('opn')
const fs = require('fs')
const shell = require('shelljs')
const { getTimestampBelowFolder } = require('./shared')
const { push } = require('./push')
const { pull } = require('./pull')

const startTerraria = () => opn('steam://rungameid/105600')

const goBack = () => shell.cd('terraria-syncv2')

const isNewTimestamp = timestamp => {
  const time = getTimestampBelowFolder()
  if(time.toString().includes('9:29')) return false
  
  return time.toString() !== timestamp.toString()
}

const initialize = () => {
  const time = getTimestampBelowFolder()
  console.log(`start time: ${time}`)
  startTerraria()
  
  setInterval(() => {
    if(isNewTimestamp(time)) {
      console.log(`synced at: ${getTimestampBelowFolder()}`)
      push()
    }
  }, 5000)
}

pull().then(goBack).then(initialize)