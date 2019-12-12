/**
 *
 */
export interface HTMLElementDimension {
    top: number;
    left: number;
    bottom: number;
    right: number;
}

/**
 * Parses all elements from the given element up to the body tag and calculates
 * the bottom left position of the element on the page.
 *
 * @param el
 * @returns
 */
export function getBottomLeftPosition(el: HTMLElement): HTMLElementDimension {

    const position: HTMLElementDimension = {
        top: el.scrollHeight, // initiate with elements height
        right: 0,
        bottom: 0,
        left: 0
    }

    /* As long as there is an element to parse */
    while (el) {

        /* The body tag needs some special treatment */
        if (el.tagName === 'BODY') {
            // deal with browser quirks with body/window/document and page scroll
            const xScroll = el.scrollLeft || document.documentElement.scrollLeft
            const yScroll = el.scrollTop || document.documentElement.scrollTop

            position.left += (el.offsetLeft - xScroll + el.clientLeft)
            position.top += (el.offsetTop - yScroll + el.clientTop)
        } else {
            // for all other non-BODY elements
            position.left += (el.offsetLeft - el.scrollLeft + el.clientLeft)
            position.top += (el.offsetTop - el.scrollTop + el.clientTop)
        }

        /* Now parse the parent element */
        el = el.offsetParent as HTMLElement
    }

    return position
}
