import { expect } from 'chai'
import { uuid } from '..'

describe('UUID', () => {

    it('should create a V4 uuid', () => {
        const result: string = uuid()
        expect(result).to.match(/[0-9A-Za-z]{8}-[0-9A-Za-z]{4}-4[0-9A-Za-z]{3}-[89ABab][0-9A-Za-z]{3}-[0-9A-Za-z]{12}/)
    })

})
