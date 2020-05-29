const shell = require('shelljs')
const { file, wait, done } = require('./shared')

const pull = () => shell.exec('git pull origin master')

const pathToFile = `github-sync/${file}`

const copy_to_below = () => {
  shell.cd('..')
  shell.cp(pathToFile + '.wld', '.')
  shell.cp(pathToFile + '.wld.bak', '.')
}

const init = () =>
  wait()
    .then(pull)
    .then(wait)
    .then(copy_to_below)
    .then(done)

init()