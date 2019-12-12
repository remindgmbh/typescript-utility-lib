import { expect } from 'chai'
import { ucfirst, concatValues } from '..'

describe('upper character first function', () => {

    it('should return upper case given string', () => {
        const result: string = ucfirst('herp')
        expect(result).to.equal('Herp')
    })

    it('should return an empty string', () => {
        const result: string = ucfirst('')
        expect(result).to.equal('')
    })

    it('should work with numbers', () => {
        const result: string = ucfirst('1234567890')
        expect(result).to.equal('1234567890')
    })

    it('should work with multiple words', () => {
        const result: string = ucfirst('herp derp')
        expect(result).to.equal('Herp derp')
    })

})

describe('concat values function', () => {

    it('should produce no output on empty object', () => {
        const result: string = concatValues({}, ', ')
        expect(result).to.equal('')
    })

    it('should produce concat values for plain object', () => {
        const result: string = concatValues({
            test1: 'test1 value',
            test2: 'test2 value'
        }, ', ')
        expect(result).to.equal('test1 value, test2 value')
    })

    it('should produce concat values for nested types', () => {

        const result: string = concatValues({
            test1: [
                'sub11', 'sub12'
            ],
            test2: {
                sub21: 'sub21 value',
                sub22: 'sub22 value'
            }
        }, ' - ')
        expect(result).to.equal('sub11 - sub12 - sub21 value - sub22 value')
    })

})
