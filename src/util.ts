export interface ScriptTagAttributes extends Object {
  type: string,
  async: boolean,
  defer: boolean,
  src: string,
  id: string,
  loadInHead: boolean
}

export interface HTMLElementDimension extends Object {
  top: number,
  left: number,
  bottom: number,
  right: number
}

export interface PayloadInterface {
  detail: object;
  bubbles: boolean;
  cancelable: boolean;
}

/** Stupid type for accessing objects. */
type AnyObject = { [index: string]: any, [index: number]: any }

/** Element types */
type AllElements =  {
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
export type CreatedElement<T extends string> =
    T extends keyof AllElements ? CreatedHTMLElement<T> : HTMLElement;

/**
 * Takes any string and returns the given string with the first character
 * capitalized and the rest of the string in lower case.
 *
 * @param text A string whose first character shall be capitalized.
 * @returns The modified string.
 */
export function ucfirst(text: string): string {
  return text.toLowerCase().charAt(0).toUpperCase()
    + text.slice(1).toLowerCase();
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
export function concatValues(obj: AnyObject, glue: string): string {

  let storage: Array<string> = [];

  /* Iterate all property names of the object */
  for (let prop in obj) {

    /* If the object key is an object itself */
    if (obj[prop] instanceof Object) {

      /* Recursive call to concat the nestet object values too */
      storage.push(concatValues(obj[prop], glue));

    } else if (obj[prop] instanceof Array) {

      /* Use join function */
      storage.push(obj[prop].join());
    } else {

      /* Whatever it is, it will be added to the string */
      storage.push(obj[prop]);
    }
  }

  return storage.join(glue);
}

/**
 *
 * @param item
 */
export function decodeListItem(item: string): string {
  return decodeURIComponent(escape(atob(item)));
}

/**
 * Adds a script tag to the body using the given configuration.
 *
 * @param options containing the configuration
 * @param [callback] Function executed when the script was added
 * @returns
 */
export function loadScript(options: ScriptTagAttributes, callback: Function): void {

  /* Sane defaults for every new script tag */
  let defaults: ScriptTagAttributes = {
    type: 'text/javascript',
    async: false,
    defer: false,
    src: '',
    id: '',
    loadInHead: false
  };

  let settings: ScriptTagAttributes = <ScriptTagAttributes>mergeObjects(defaults, options);

  /* Create the script tag with given options */
  let s: HTMLScriptElement = document.createElement('script');
  s.type = settings.type;
  s.async = settings.async;
  s.defer = settings.defer;
  s.src = settings.src;
  s.id = settings.id;

  /* By default choose the body as the target */
  let target: string = 'body';

  /* If explicity set to load into the head */
  if (settings.loadInHead) {
    target = 'head';
  }

  /* Append script to chosen target */
  document.getElementsByTagName(target)[0].appendChild(s);

  /* Call the callback if given */
  if (typeof callback !== 'undefined') {
    callback();
  }
}

/**
 *
 * @param cssClass Name of the css class
 * @param event Name of the event
 * @param callback Function executed on event
 * @param [context] Element that limits the scope
 * @returns {undefined}
 */
export function addEventListenerToElements(cssClass: string, event: string, callback: EventListener, context?: HTMLElement): void {

  /* Define the default scope in which the elements are searched */
  let scope: HTMLElement|HTMLDocument = document;

  /* If a specific context is given */
  if (context) {

    /* Limit the scope to the given context */
    scope = context;
  }

  /* Get the array of elements matching the css classname */

  let list: NodeListOf<Element>|HTMLCollectionOf<Element> = scope.getElementsByClassName(cssClass);

  /* Iterate the list */
  for (let i = 0, len = list.length; i < len; i++) {

    /* Attach the event listener to each item */
    list[i].addEventListener(event, callback);
  }
}

/**
 *
 * @param cssClass Name of the css class
 * @param event Name of the event
 * @param callback Function executed on event
 * @param [context] Element that limits the scope
 * @returns
 */
export function removeEventListenerFromElements(cssClass: string, event: string, callback: EventListener, context?: HTMLElement): void {

  /* Define the default scope in which the elements are searched */
  let scope: HTMLElement|HTMLDocument = document;

  /* If a specific context is given */
  if (context) {

    /* Limit the scope to the given context */
    scope = context;
  }

  /* Get the array of elements matching the css classname */
  let list: NodeListOf<Element>|HTMLCollectionOf<Element> = scope.getElementsByClassName(cssClass);

  /* Iterate the list */
  for (let i = 0, len = list.length; i < len; i++) {

    /* Attach the event listener to each item */
    list[i].removeEventListener(event, callback);
  }
}

/**
 * Merges the two given objects into one.
 *
 * @param obj1 The first object
 * @param obj2 The second object
 * @returns The resulting merged object
 */
export function mergeObjects(obj1: AnyObject, obj2: AnyObject): object {

  /* The object containing all attributes */
  let merged: AnyObject = {};

  /* Copy all attributes from both objects into the new object */
  for (let attr1 in obj1) { merged[attr1] = obj1[attr1]; }
  for (let attr2 in obj2) { merged[attr2] = obj2[attr2]; }

  return merged;
}

/**
 * Parses all elements from the given element up to the body tag and calculates
 * the bottom left position of the element on the page.
 *
 * @param el
 * @returns
 */
export function getBottomLeftPosition(el: HTMLElement) {

  let position: HTMLElementDimension = {
    top: el.scrollHeight, // initiate with elements height
    right: 0,
    bottom: 0,
    left: 0
  };

  /* As long as there is an element to parse */
  while (el) {

    /* The body tag needs some special treatment */
    if (el.tagName === 'body') {
      // deal with browser quirks with body/window/document and page scroll
      let xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      let yScroll = el.scrollTop || document.documentElement.scrollTop;

      position.left += (el.offsetLeft - xScroll + el.clientLeft);
      position.top += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      position.left += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      position.top += (el.offsetTop - el.scrollTop + el.clientTop);
    }

    /* Now parse the parent element */
    el = <HTMLElement> el.offsetParent;
  }

  return position;
}

/**
 *
 * @param numArray
 * @returns
 */
export function getArrayMaxValue(numArray: Array<number>): number {
  return Math.max.apply(null, numArray);
}

/**
 *
 * @param elem
 * @param className
 * @returns
 */
export function getSiblings(elem: HTMLElement, className: string): Array<HTMLElement> {

  let siblings: Array<HTMLElement> = [];

  let parent: HTMLElement|null = elem.parentElement;

  if (parent === null) {
    return [];
  }

  let sibling: HTMLElement|null = <HTMLElement> parent.firstChild;

  if (sibling === null) {
    return [];
  }

  for (; sibling; sibling = <HTMLElement> sibling.nextSibling) {

    if (sibling.nodeType !== 1 || sibling === elem) {
      continue;
    }

    if (className) {
      if (sibling.classList.contains(className)) {
        siblings.push(sibling);
      }
    } else {
      siblings.push(sibling);
    }
  }

  return siblings;
}

/**
 * Generates a UUID by recursivly calling itself.
 *
 * @returns A UUID
 */
export function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : ( r & 0x3 | 0x8 );
    return v.toString(16);
  });
}

/**
 * Executes a callback when the document is ready by first checking if the
 * document content has already been loaded or binding the execution of the
 * callback to the DOMContentLoaded event.
 *
 * @param callback
 * @returns
 */
export function runWhenLoaded(callback: EventListener): void {

  let event: Event = new Event('DOMContentLoaded');

  /* Test if the document is already loaded */
  if (document.readyState === 'complete') {
    callback(event);

    /* The DOMContentLoaded event should not have fired by now */
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
}

/**
 * Returns either the first id found in the parent hierarchy or the body literal
 * when no id has been found. Starting from and including the element itself.
 *
 * @param element
 * @returns The first id attibute value or "body" as a fallback
 */
export function getFirstParentId(element: HTMLElement): string {

  /* Assign the id value */
  let id: string|null = element.getAttribute('id');

  if (id === null) {
    id = '';
  }

  /* If we have reached the body tag */
  if (element.tagName === 'BODY') {
    id = 'body'; // assign default value
  }

  /* If no value was returned */
  if (!id) {

    let parent: HTMLElement|null = element.parentElement;

    if (parent !== null) {

      /* Try the parent element */
      id = getFirstParentId(parent);
    }
  }

  return id;
}

/**
 * Returns the first matching parent element that has the given classname set.
 * Starting from and including the given element itself.
 *
 * @param element
 * @param classname
 * @returns
 */
export function getParentWithClass(element: HTMLElement, classname: string): HTMLElement|null {

  /* If we have reached the body tag */
  if (element.tagName.toLowerCase() === 'body') {
    return null;
  }

  /* If no value was returned */
  if (!element.classList.contains(classname)) {

    let parent: HTMLElement|null = element.parentElement;

    if (parent !== null) {
      /* Try the parent element recursivly */
      return getParentWithClass(parent, classname);
    }
  }

  return element;
}

/**
 * Returns the first matching parent element that has the given data attribute
 * set. Starting from and including the given element itself.
 *
 * @param element
 * @param attr
 * @return
 */
export function getParentWithData(element: HTMLElement, attr: string): HTMLElement|null {

  /* If we have reached the body tag */
  if (element.tagName === 'BODY') {
    return null;
  }

  /* If no matching dataset value was found */
  if (!element.dataset[attr]) {

    let parent: HTMLElement|null = element.parentElement;

    if (parent !== null) {

      /* Recursive call */
      return getParentWithData(parent, attr);
    }
  }

  return element;
}

/**
 * Browser compatible function to dispatch custom events
 *
 * @param target
 * @param eventName
 * @param payload
 * @returns
 */
export function dispatchCustomEvent(target: EventTarget, eventName: string, payload: PayloadInterface = {detail: {}, bubbles: false, cancelable: false}): void {
  let event: CustomEvent;

  /*
   * Microsoft Internet Explorer
   * typeof(Event) == object
   *
   * Chrome / Safari / MI Edge / Firefox
   * typeof(Event) == function
   *
   * Create event object or function, add eventName and payload
   */
  if (typeof(Event) === 'function') {
    event = new CustomEvent(eventName, payload);
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, payload.bubbles, payload.cancelable, payload.detail);
  }

  /* Dispatch event on target */
  target.dispatchEvent(event);
}

/**
 * Create html element by string and set it as type
 *
 * @param tag
 */
function createElement<T extends string>(tag: T): CreatedElement<T> {
  return <CreatedElement<T>>document.createElement(tag)
}

/**
 * Add properties to HTMLElement
 *
 * @param tag
 * @param props
 * @return CreatedElement<T>
 */
export function elementFactory<T extends string>(tag: T, props: Partial<CreatedElement<T>>) : CreatedElement<T> {

  let element: CreatedElement<T> = createElement(tag);

  element = Object.assign(element, props);

  return element;
}
