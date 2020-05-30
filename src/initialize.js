require('dotenv').config()
const opn = require('opn')
const fs = require('fs')
const shell = require('shelljs')
const { file } = require('./shared')
const { push } = require('./push')
const { pull } = require('./pull')

const start_terraria = () => opn('steam://rungameid/105600')
const get_file_timestamp = () => fs.statSync('../' + file + '.wld')
const go_back = () => shell.cd('terraria-syncv2')

const is_new_timestamp = timestamp => {
  const { mtime } = get_file_timestamp()
  if(mtime.toString().includes('9:29')) return false
  
  return mtime.toString() !== timestamp.toString()
}

const initialize = () => {
  const { mtime } = get_file_timestamp()
  console.log(`start time: ${mtime}`)
  start_terraria()
  
  setInterval(() => {
    if(is_new_timestamp(mtime)) {
      console.log(`synced at: ${get_file_timestamp().mtime}`)
      push()
    }
  }, 5000)
}

pull().then(go_back).then(initialize)