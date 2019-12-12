/**
 * Returns either the first id found in the parent hierarchy or the body literal
 * when no id has been found. Starting from and including the element itself.
 *
 * @param element
 * @returns The first id attibute value or "body" as a fallback
 */
export function getFirstParentId(element: HTMLElement): string {

    /* Assign the id value */
    let id: string | null = element.getAttribute('id')

    if (id === null) {
        id = ''
    }

    /* If we have reached the body tag */
    if (element.tagName === 'BODY') {
        id = 'body' // assign default value
    }

    /* If no value was returned */
    if (!id) {

        const parent: HTMLElement | null = element.parentElement

        if (parent !== null) {

            /* Try the parent element */
            id = getFirstParentId(parent)
        }
    }

    return id
}
