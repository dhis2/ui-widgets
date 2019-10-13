const { spawn } = require('child_process')
const { killable } = require('./killable')

const cypressOpen = () => {
    const { stdin, stdout, stderr } = process
    const execution = spawn('yarn', ['cypress:browser'], {
        cwd: process.cwd(),
        stdio: [stdin, stdout, stderr],
    })

    killable(execution)
}

module.exports = { cypressOpen }
