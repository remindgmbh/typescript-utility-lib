/**
 * Description of interface
 */
export interface PayloadInterface {

    /** Some detail */
    detail: object;

    /** Does the event bubble */
    bubbles: boolean;

    /** Can you cancel the event */
    cancelable: boolean;
}

/**
 * Adds an event listener to all HTMLElements that have the given css class.
 *
 * @param cssClass Name of the css class
 * @param event Name of the event
 * @param callback Function executed on event
 * @param [context] Element that limits the scope
 */
export function addEventListenerToElements(cssClass: string, event: string, callback: EventListener, context?: HTMLElement): void {

    /* Define the default scope in which the elements are searched */
    let scope: HTMLElement | HTMLDocument = document

    /* If a specific context is given */
    if (context) {

        /* Limit the scope to the given context */
        scope = context
    }

    /* Get the array of elements matching the css classname */

    const list: NodeListOf<Element> | HTMLCollectionOf<Element> = scope.getElementsByClassName(cssClass)

    /* Iterate the list */
    for (let i = 0, len = list.length; i < len; i++) {

        /* Attach the event listener to each item */
        list[i]?.addEventListener(event, callback)
    }
}

/**
 *
 * @param cssClass Name of the css class
 * @param event Name of the event
 * @param callback Function executed on event
 * @param [context] Element that limits the scope
 */
export function removeEventListenerFromElements(cssClass: string, event: string, callback: EventListener, context?: HTMLElement): void {

    /* Define the default scope in which the elements are searched */
    let scope: HTMLElement | HTMLDocument = document

    /* If a specific context is given */
    if (context) {

        /* Limit the scope to the given context */
        scope = context
    }

    /* Get the array of elements matching the css classname */
    const list: NodeListOf<Element> | HTMLCollectionOf<Element> = scope.getElementsByClassName(cssClass)

    /* Iterate the list */
    for (let i = 0, len = list.length; i < len; i++) {

        /* Attach the event listener to each item */
        list[i]?.removeEventListener(event, callback)
    }
}

/**
 * Executes a callback when the document is ready by first checking if the
 * document content has already been loaded or binding the execution of the
 * callback to the DOMContentLoaded event.
 *
 * @param callback
 */
export function runWhenLoaded(callback: EventListener): void {

    /* Test if the document is already loaded */
    if (document.readyState === 'complete') {
        callback(createCustomEvent('loaded'))

    } else if (document.readyState === 'interactive') {
        callback(createCustomEvent('DOMContentLoaded'))

    /* The DOMContentLoaded event should not have fired by now */
    } else {
        document.addEventListener('DOMContentLoaded', callback)
    }
}

/**
 * Browser compatible function to dispatch custom events
 *
 * @param target
 * @param eventName
 * @param payload
 * @returns
 */
export function dispatchCustomEvent(target: EventTarget, eventName: string, payload: PayloadInterface = { detail: {}, bubbles: false, cancelable: false }): void {

    /* Dispatch event on target */
    target.dispatchEvent(createCustomEvent(eventName, payload))
}

/**
 * Create a cross browser compatible CustomEvent instance.
 *
 * @param eventName
 * @param payload
 */
export function createCustomEvent(eventName: string, payload: PayloadInterface = { detail: {}, bubbles: false, cancelable: false }): CustomEvent {

    /*  */
    let event: CustomEvent

    /*
     * Microsoft Internet Explorer
     * typeof(Event) == object
     *
     * Chrome / Safari / MI Edge / Firefox
     * typeof(Event) == function
     *
     * Create event object or function, add eventName and payload
     */
    if (typeof (Event) === 'function') {
        event = new CustomEvent(eventName, payload)
    } else {
        event = document.createEvent('CustomEvent');
        event.initCustomEvent(eventName, payload.bubbles, payload.cancelable, payload.detail)
    }

    return event
}
