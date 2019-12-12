import { expect } from 'chai'
import jsdomGlobal = require('jsdom-global')
import { loadScript, getBottomLeftPosition, getSiblings, getFirstParentId } from '..'

describe('DOM', function() {

    this.beforeEach(() => {
        jsdomGlobal()
    })

    it('should create a script element in the body', () => {

        loadScript({ src: 'test.js' })

        const result: number = document.body.getElementsByTagName('script').length;

        expect(result).to.equal(1)
    })

    it('should create a script element in the head', () => {

        loadScript({ src: 'test.js', loadInHead: true })

        const result: number = document.head.getElementsByTagName('script').length;

        expect(result).to.equal(1)
    })

    it('should create a script element and execute the callback', (done: Mocha.Done) => {

        loadScript({ src: 'test.js' }, done)
    })

    it('should create script tag with an id', () => {

        loadScript({ src: 'test.js', id: 'script-test' })

        const elem: HTMLScriptElement = document.getElementById('script-test') as HTMLScriptElement

        expect(elem.id).to.equal('script-test')
    })

    it('should get the position data from an element', () => {

        const e: HTMLDivElement = document.createElement('div')
        e.scrollLeft = 10
        e.style.width = '100px'
        e.style.height = '100px'

        const child = document.body.appendChild(e)

        const result = getBottomLeftPosition(child)

        expect(result.top).to.equal(0)
        expect(result.right).to.equal(0)
        expect(result.bottom).to.equal(0)
        expect(result.left).to.equal(-10)
    })

    it('should get the position data from the body', () => {

        const result = getBottomLeftPosition(document.body)

        expect(result.top).to.equal(0)
        expect(result.right).to.equal(0)
        expect(result.bottom).to.equal(0)
        expect(result.left).to.equal(0)
    })

    it('should get siblings', () => {

        for (let i = 0; i < 10; i++) {
            const el: HTMLDivElement = document.createElement('div')
            el.id = 'test-sibling' + i
            el.classList.add('test-siblings')
            document.body.appendChild(el)
        }

        const test5: HTMLDivElement = document.getElementById('test-sibling5') as HTMLDivElement

        const result: HTMLElement[] = getSiblings(test5, 'test-siblings')

        expect(result.length).to.equal(9)
    })

    it('should get no siblings when using non-existent css-class', () => {

        const result: HTMLElement[] = getSiblings(document.body.parentElement as HTMLElement, 'nothing')

        expect(result.length).to.equal(0)
    })

    it('should get no siblings for element with no siblings', () => {

        const el: HTMLParagraphElement = document.createElement('p')
        document.body.appendChild(el)

        const result: HTMLElement[] = getSiblings(el, 'nothing')

        expect(result.length).to.equal(0)
    })

    it('should get all siblings for element without using classname', () => {

        const el: HTMLParagraphElement = document.createElement('p')
        el.id = 'pbody'
        document.body.appendChild(el)

        for (let i = 0; i < 10; i++) {
            document.body.appendChild(document.createElement('div'))
        }

        const result: HTMLElement[] = getSiblings(document.getElementById('pbody') as HTMLElement)

        expect(result.length).to.equal(10)
    })

    it('should get the first parent with an id', () => {

        const parent: HTMLDivElement = document.createElement('div')
        parent.id = 'test-parent'
        document.body.appendChild(parent)

        const el: HTMLSpanElement = document.createElement('span')

        parent.appendChild(el)

        const id: string = getFirstParentId(el)

        expect(id).to.equal('test-parent')
    })

    it('should return body as a fallback for body', () => {

        const id: string = getFirstParentId(document.body)

        expect(id).to.equal('body')
    })

    it('should return an empty string as a fallback for the html node', () => {

        const id: string = getFirstParentId(document.body.parentElement as HTMLElement)

        expect(id).to.equal('')
    })
})
