/**
 * Returns the first matching parent element that has the given data attribute
 * set. Starting from and including the given element itself.
 *
 * @param element
 * @param attr
 * @return
 */
export function getParentWithData(element: HTMLElement, attr: string): HTMLElement | null {

    /* If no matching dataset value was found */
    if (!element.dataset[attr]) {

        const parent: HTMLElement | null = element.parentElement;

        if (parent !== null) {

            /* Recursive call */
            return getParentWithData(parent, attr)
        }

        return null
    }

    return element
}
