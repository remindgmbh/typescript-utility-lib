/**
 *
 */
export interface ScriptTagAttributes {
    type?: string;
    async?: boolean;
    defer?: boolean;
    src: string;
    id?: string;
    loadInHead?: boolean;
}

/**
 * Adds a script tag to the body using the given configuration.
 *
 * @param options containing the configuration
 * @param [callback] Function executed when the script was added
 */
export function loadScript(options: ScriptTagAttributes, callback?: Function): void {

    /* Create the script tag with given options */
    const s: HTMLScriptElement = document.createElement('script')
    s.type = options.type || ''
    s.async = options.async || false
    s.defer = options.defer || false
    s.src = options.src
    s.id = options.id || ''

    /* By default choose the body as the target */
    let target: 'body' | 'head' = 'body'

    /* If explicity set to load into the head */
    if (options.loadInHead) {
        target = 'head'
    }

    /* Append script to chosen target */
    document[target].appendChild(s)

    /* Call the callback if given */
    if (callback !== undefined) {
        callback()
    }
}
