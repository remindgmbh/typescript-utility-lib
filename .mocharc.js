module.exports = {
    require: [ 'ts-node/register' ],
    extension: [ 'ts' ],
    recursive: true,
    reporter: 'mocha-junit-reporter'
}
