const shell = require('shelljs')
const { file, wait, done, dateToEnGB } = require('./shared')

const add = () => shell.exec('git add .')
const commit = () => shell.exec(`git commit -m "${dateToEnGB(Date())}"`)
const pushCode = () => shell.exec('git push origin master')

const copyFromBelow = () => {
  shell.cd('..')
  shell.cp(file + '.wld', 'terraria-syncv2')
  shell.cp(file + '.wld.bak', 'terraria-syncv2')
  shell.cp(file + '.wld.bak2', 'terraria-syncv2')
  shell.cd('terraria-syncv2')
  return wait()
}

const push = () => copyFromBelow()
  .then(add)
  .then(wait)
  .then(commit)
  .then(wait)
  .then(pushCode)
  .then(done)

require.main == module && push()
module.exports = { push }