/**
 * Returns the first matching parent element that has the given classname set.
 * Starting from and including the given element itself.
 *
 * @param element
 * @param classname
 * @returns
 */
export function getParentWithClass(element: HTMLElement, classname: string): HTMLElement | null {

    /* If we have reached the body tag */
    if (element.tagName === 'BODY') {
        return null
    }

    /* If no value was returned */
    if (!element.classList.contains(classname)) {

        const parent: HTMLElement | null = element.parentElement

        if (parent !== null) {
            /* Try the parent element recursivly */
            return getParentWithClass(parent, classname)
        }
    }

    return element
}
