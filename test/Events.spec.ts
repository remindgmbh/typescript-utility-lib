import { addEventListenerToElements, removeEventListenerFromElements, runWhenLoaded } from '..'

describe('Events', () => {

    /** Create some identifiable element */
    const span1: HTMLSpanElement = document.createElement('span')
    span1.id = 'test1'
    span1.classList.add('test')

    /** Create another element */
    const span2: HTMLSpanElement = document.createElement('span')
    span2.id = 'test1'
    span2.classList.add('test')

    /** Add both to body */
    document.body.appendChild(span1)
    document.body.appendChild(span2)

    it('should add event listener to elements', (done: Mocha.Done) => {

        /** when the function is called the test is successfull */
        const handler: EventListener = () => { done() }

        /** Add event handler to elements */
        addEventListenerToElements('test', 'test', handler)

        /** Fire event */
        span1.dispatchEvent(new Event('test'))
    })

    it('should remove event listener from elements', (done: Mocha.Done) => {

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

        Object.defineProperty(document, 'readyState', {
            get() { return 'loading' }
        })

        const timeout: NodeJS.Timeout = setTimeout(done, 33)

        const handler: EventListener = () => {
            clearTimeout(timeout)
            done(new Error('Event handler was not removed'))
        }

        runWhenLoaded(handler)
    })
})
