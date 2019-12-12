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

    const first: HTMLElement = parent.firstChild as HTMLElement

    const siblings: HTMLElement[] = []

    let next: HTMLElement | null = first.nextSibling as HTMLElement

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
