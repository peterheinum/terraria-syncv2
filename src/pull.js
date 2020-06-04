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

const doneWithoutSync = () => {
  console.log('Pull done without sync.')
}

const copyToBelow = () => {
  shell.cd('..')
  shell.cp(pathToFile + '.wld', '.')
  shell.cp(pathToFile + '.wld.bak', '.')
}

const shouldSync = () => {
  const currentFolderTime = dateToEnGB(getTimestampCurrentFolder())
  const folderBelowTime = dateToEnGB(getTimestampBelowFolder())
  return folderBelowTime < currentFolderTime ? Promise.resolve() : Promise.reject()
}

const pull = () => new Promise((resolve, reject) => {
  wait()
    .then(pullCode)
    .then(shouldSync)
    .then(wait)
    .then(copyToBelow)
    .then(done)
    .catch(() => {
      doneWithoutSync()
      resolve()
    })
})

require.main == module && pull()
module.exports = { pull }

