import { expect } from 'chai'
import { getArrayMaxValue } from '../src/Arrays'

describe('Arrays', () => {

    it('should get the maximum value', () => {

        const values: number[] = [ 1, 2, 0.5, 33, NaN, -1, -0.0, 0, 1 ]

        const result: number = getArrayMaxValue(values)

        expect(result).to.equal(33)
    })

})
