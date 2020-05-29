const shell = require('shelljs')
const { file, wait, done } = require('./shared')

const pull_code = () => shell.exec('git pull origin master')

const pathToFile = `terraria-syncv2/${file}`

const copy_to_below = () => {
  shell.cd('..')
  shell.cp(pathToFile + '.wld', '.')
  shell.cp(pathToFile + '.wld.bak', '.')
}

const pull = () => wait()
  .then(pull_code)
  .then(wait)
  .then(copy_to_below)
  .then(done)

module.exports = { pull }