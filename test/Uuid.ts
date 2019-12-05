import { expect } from 'chai'
import { uuid } from '../src/Uuid'

describe('uuid', () => {

  it('should uuid', () => {
      const result: string = uuid()
      expect(result).to.match(/[0-9A-Za-z]{8}-[0-9A-Za-z]{4}-4[0-9A-Za-z]{3}-[89ABab][0-9A-Za-z]{3}-[0-9A-Za-z]{12}/)
  })

})
