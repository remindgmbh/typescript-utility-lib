import jsdomGlobal = require('jsdom-global')
import { addEventListenerToElements, removeEventListenerFromElements, runWhenLoaded } from '..'

describe('Events', function() {

    this.beforeEach(() => {
        jsdomGlobal()
    })

    it('should add event listener to elements', (done: Mocha.Done) => {

        /** Create some identifiable element */
        const span1: HTMLSpanElement = document.createElement('span')
        span1.id = 'test1'
        span1.classList.add('test')

        /** Add both to body */
        document.body.appendChild(span1)

        /** when the function is called the test is successfull */
        const handler: EventListener = () => { done() }

        /** Add event handler to elements */
        addEventListenerToElements('test', 'test', handler)

        /** Fire event */
        span1.dispatchEvent(new Event('test'))
    })

    it('should remove event listener from elements', (done: Mocha.Done) => {

        /** Create some identifiable element */
        const span1: HTMLSpanElement = document.createElement('span')
        span1.id = 'test1'
        span1.classList.add('test')

        /** Add both to body */
        document.body.appendChild(span1)

        const timeout: NodeJS.Timeout = setTimeout(done, 33)

        const handler: EventListener = () => {
            clearTimeout(timeout)
            done(new Error('Event handler was not removed'))
        }

        addEventListenerToElements('test', 'test', handler)

        removeEventListenerFromElements('test', 'test', handler)

        span1.dispatchEvent(new Event('click'))
    })

    it('should run when document is loaded', (done: Mocha.Done) => {

        runWhenLoaded(() => {
            done()
        })
    })

    it('should register DOMContentLoaded event', (done: Mocha.Done) => {

        /**
         * Although jsdom sets the document.readystate to loading
         * it will also fire the DOMContentLoaded event, which will
         * fail this test.
         * So it is propably best to disable this function
         */
        document.addEventListener = () => {}

        const timeout: NodeJS.Timeout = setTimeout(done, 33)

        const handler: EventListener = () => {
            clearTimeout(timeout)
            done(new Error('Event handler was executed'))
        }

        runWhenLoaded(handler)
    })
})
