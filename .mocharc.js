module.exports = {
    require: [
        'ts-node/register',
        'jsdom-global/register'
    ],
    extension: [ 'ts' ],
    recursive: true,
    reporter: 'mocha-junit-reporter'
}
