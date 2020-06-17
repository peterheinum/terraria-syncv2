const shell = require('shelljs')
const {
  file,
  wait,
  done,
  dateToEnGB,
  getTimestampBelowFolder,
  getTimestampCurrentFolder
} = require('./shared')

const pullCode = () => shell.exec('git pull origin master')

const pathToFile = `terraria-syncv2/${file}`

const doneWithoutSync = () => console.log('Pull done without sync.')

const doneWithSync = () => console.log('Pull done with sync')

const copyToBelow = () => {
  shell.cd('..')
  shell.cp(pathToFile + '.wld', '.')
  shell.cp(pathToFile + '.wld.bak', '.')
  shell.cp(pathToFile + '.wld.bak2', '.')
}

const shouldSync = () => {
  const currentFolderTime = getTimestampCurrentFolder()
  const folderBelowTime = getTimestampBelowFolder()
  
  return folderBelowTime < currentFolderTime ? Promise.resolve() : Promise.reject()
}

const pull = () => new Promise((resolve, reject) => {
  wait()
    .then(pullCode)
    .then(shouldSync)
    .then(wait)
    .then(copyToBelow)
    .then(doneWithSync)
    .catch(doneWithoutSync)
    .finally(resolve)
})

require.main == module && pull()
module.exports = { pull }

