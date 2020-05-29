require('dotenv').config()
const opn = require('opn')
const fs = require('fs')
const shell = require('shelljs')
const { file } = require('./shared')
const { push } = require('./push')
const { pull } = require('./pull')

const start_terraria = () => opn('steam://rungameid/105600')
const get_file_timestamp = () => fs.statSync('../' + file + '.wld')

const is_new_timestamp = timestamp => {
  const { mtime } = get_file_timestamp()
  return mtime !== timestamp
}

const initialize = () => {
  
  const { mtime } = get_file_timestamp()
  console.log(`start time: ${mtime}`)
  start_terraria()
  
  const interval = setInterval(() => {
    if(is_new_timestamp(mtime)) {
      clearInterval(interval)
      console.log(get_file_timestamp())
      console.log(`end time: ${get_file_timestamp()}`)
      push().then(process.exit)
    }
  }, 5000)
}

const go_back = () => shell.cd('terraria-syncv2')

pull().then(go_back).then(initialize)