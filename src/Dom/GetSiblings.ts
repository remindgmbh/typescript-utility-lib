/**
 *
 * @param element
 * @param [className]
 * @returns All siblings
 */
export function getSiblings(element: HTMLElement, className?: string): HTMLElement[] {

    const parent: HTMLElement | null = element.parentElement

    if (parent === null) {
        return []
    }

    const siblings: HTMLElement[] = []

    let next: HTMLElement | null = parent.firstChild as HTMLElement

    while (next !== null) {

        if (next.nodeType !== 1 || next.isSameNode(element)) {
            next = next.nextSibling as HTMLElement
            continue
        }

        if (className) {
            if (next.classList.contains(className)) {
                siblings.push(next)
            }
        } else {
            siblings.push(next)
        }

        next = next.nextSibling as HTMLElement
    }

    return siblings
}
