/** Element types */
type AllElements = {
    'a': HTMLAnchorElement;
    'div': HTMLDivElement;
    'span': HTMLSpanElement;
    'ul': HTMLUListElement;
    'textarea': HTMLTextAreaElement;
    'tfoot': HTMLTableSectionElement;
    'thead': HTMLTableSectionElement;
    'tbody': HTMLTableSectionElement;
    'tr': HTMLTableRowElement;
    'table': HTMLTableElement;
    'th': HTMLTableHeaderCellElement;
    'td': HTMLTableDataCellElement;
    'caption': HTMLTableCaptionElement;
    'select': HTMLSelectElement;
    'script': HTMLScriptElement;
    'q': HTMLQuoteElement;
    'p': HTMLParagraphElement;
    'option': HTMLOptionElement;
    'optgroup': HTMLOptGroupElement;
    'ol': HTMLOListElement;
    'meta': HTMLMetaElement;
    'video': HTMLVideoElement;
    'audio': HTMLAudioElement;
    'link': HTMLLinkElement;
    'legend': HTMLLegendElement;
    'label': HTMLLabelElement;
    'li': HTMLLIElement;
    'input': HTMLInputElement;
    'img': HTMLImageElement;
    'iframe': HTMLIFrameElement;
    'h1': HTMLHeadingElement;
    'h2': HTMLHeadingElement;
    'h3': HTMLHeadingElement;
    'h4': HTMLHeadingElement;
    'h5': HTMLHeadingElement;
    'h6': HTMLHeadingElement;
    'hr': HTMLHRElement;
    'form': HTMLFormElement;
    'fieldset': HTMLFieldSetElement;
    'embed': HTMLEmbedElement;
    'canvas': HTMLCanvasElement;
    'button': HTMLButtonElement;
    'br': HTMLBRElement;
}

/** Dynamic HTML element types */
type CreatedHTMLElement<T extends keyof AllElements> = AllElements[T];

/** HTML element type by string, Default HTMLElement */
export type CreatedElement<T extends string> = T extends keyof AllElements ? CreatedHTMLElement<T> : HTMLElement;

/**
 * Create html element by string and set it as type
 *
 * @param tag
 */
function createElement<T extends string>(tag: T): CreatedElement<T> {
    return document.createElement(tag) as CreatedElement<T>
}

/**
 * Add properties to HTMLElement
 *
 * @param tag
 * @param props
 * @return CreatedElement<T>
 */
export function elementFactory<T extends string>(tag: T, props: Partial<CreatedElement<T>>): CreatedElement<T> {

    let element: CreatedElement<T> = createElement(tag);

    element = Object.assign(element, props);

    return element;
}
