const shell = require('shelljs')
const { file, wait, done } = require('./shared')

const add = () => shell.exec('git add .')
const commit = () => shell.exec(`git commit -m "${new Date().toLocaleString('en-GB', { timeZone: 'Europe/Stockholm' })}"`)
const push_code = () => shell.exec('git push origin master')

const copy_from_below = () => {
  shell.cd('..')
  shell.cp(file + '.wld', 'terraria-syncv2')
  shell.cp(file + '.wld.bak', 'terraria-syncv2')
  shell.cd('terraria-syncv2')
  return wait()
}

const push = () => copy_from_below()
  .then(add)
  .then(wait)
  .then(commit)
  .then(wait)
  .then(push_code)
  .then(done)


module.exports = { push }