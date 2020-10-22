import { expect } from 'chai'
import { mergeObjects, MergedObjectType } from '../src/Objects'

describe('Objects', () => {

    it('should merge two diffrent objects', () => {

        interface Test {
            mock: string;
        }

        interface Mock {
            test: string;
        }

        const test: Test = { mock: 'test' }
        const mock: Mock = { test: 'mock' }

        const result: MergedObjectType<Test, Mock> = mergeObjects<Test, Mock>(test, mock)

        expect(result.test).to.equal('mock')
        expect(result.mock).to.equal('test')
    })

})
