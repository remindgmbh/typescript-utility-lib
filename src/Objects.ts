/**
 * All keys that are assignable.
 * None of the others.
 */
type MinusKeys<T, U> = Pick<T, Exclude<keyof T, keyof U>>

/**
 * Only defined types.
 */
type Defined<T> = T extends undefined ? never : T

/**
 *
 */
type MergedProperties<T, U> = { [K in keyof T & keyof U]: undefined extends T[K] ? Defined<T[K] | U[K]> : T[K] }

/**
 * All keys and properties that are in both objects.
 */
export type MergedObjectType<T, U> = MinusKeys<T, U> & MinusKeys<U, T> & MergedProperties<U, T>

/**
 * Merges the two given objects into one.
 *
 * @param obj1 The first object
 * @param obj2 The second object
 * @returns The resulting merged object
 */
export function mergeObjects<T extends object, U extends object>(obj1: T, obj2: U): MergedObjectType<T, U> {
    return {
        ...(obj1 as object),
        ...(obj2 as object)
    } as MergedObjectType<T, U>
}
