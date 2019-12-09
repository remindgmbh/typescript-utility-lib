import { expect } from 'chai'
import { loadScript } from '../src/util'

describe('DOM', () => {

    it('should create a script element in the body', () => {

        loadScript({ src: 'test.js' })

        const result: number = document.body.getElementsByTagName('script').length;

        expect(result).to.equal(1)
    })

    it('should create script tag with an id', () => {

        loadScript({ src: 'test.js', id: 'test' })

        const elem: HTMLScriptElement = <HTMLScriptElement>document.getElementById('test')

        expect(elem.id).to.equal('test')
    })

})
