/**
 * Takes any string and returns the given string with the first character
 * capitalized and the rest of the string in lower case.
 *
 * @param text A string whose first character shall be capitalized.
 * @returns The modified string.
 */
export function ucfirst(text: string): string {
    return text.toLowerCase().charAt(0).toUpperCase()
        + text.slice(1).toLowerCase()
}

/**
 * Concatinates all properties of an object into a flat string without
 * any separators or anything.
 * This function will recursively call itself to parse nested objects.
 *
 * @param obj The object whose values will be concatinated.
 * @param glue The glue used to concat values.
 * @returns All values of the given object.
 */
export function concatValues(obj: any, glue: string): string {

    const storage: string[] = []

    /* Iterate all property names of the object */
    for (const prop in obj) {

        /* If the object key is an object itself */
        if (obj[prop] instanceof Object) {

            /* Recursive call to concat the nestet object values too */
            storage.push(concatValues(obj[prop], glue))

        } else if (obj[prop] instanceof Array) {

            /* Use join function */
            storage.push(obj[prop].join())
        } else {

            /* Whatever it is, it will be added to the string */
            storage.push(obj[prop])
        }
    }

    return storage.join(glue)
}

/**
 *
 * @param item
 */
export function decodeListItem(item: string): string {
    return decodeURIComponent(escape(atob(item)))
}
