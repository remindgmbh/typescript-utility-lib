import { expect } from 'chai'
import { getArrayMaxValue } from '..'

describe('Arrays', () => {

    it('should get the maximum value for numbers', () => {

        const values: number[] = [ 1, 2, 0.5, 33, -1, -0.0, 0, 1 ]

        const result: number = getArrayMaxValue(values)

        expect(result).to.equal(33)
    })

    it('should get the maximum value for infinity', () => {

        const values: number[] = [ 1, 2, 0.5, 33, -1, -0.0, 0, 1, Infinity ]

        const result: number = getArrayMaxValue(values)

        expect(result).to.equal(Infinity)
    })

    it('should not get the maximum value for NaN', () => {

        const values: number[] = [ 1, 2, 0.5, 33, -1, -0.0, 0, 1, Infinity, NaN ]

        const result: number = getArrayMaxValue(values)

        expect(result).to.be.NaN
    })

})
