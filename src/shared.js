const fs = require('fs')
const file = 'Sad_Shore_of_Werewolves'

const sleep = t => new Promise(r => setTimeout(r, t))
const wait = () => sleep(2000)
const done = () => console.log('done')
const getTimestampBelowFolder = () => fs.statSync('../' + file + '.wld').mtime
const getTimestampCurrentFolder = () => fs.statSync('./' + file + '.wld').mtime
const dateToEnGB = (date = null) => new Date(date).toLocaleString('en-GB', { timeZone: 'Europe/Stockholm' })

module.exports = { file, wait, done, dateToEnGB, getTimestampBelowFolder, getTimestampCurrentFolder }