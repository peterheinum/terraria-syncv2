const file = 'Sad_Shore_of_Werewolves'

const sleep = t => new Promise(r => setTimeout(r, t))
const wait = () => sleep(2000)
const done = () => console.log('done')

module.exports = { file, wait, done }