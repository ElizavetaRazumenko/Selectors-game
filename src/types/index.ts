export enum MainElements {
    header,
    main,
    footer,
    aside,
}

export type returnsPageRenderTypes = (HTMLElement | HTMLElement[])[];
export interface IRender {
    pageRender(): returnsPageRenderTypes;
    renderMainBodyElements(elementNames: string[]): HTMLElement[];
    addHeaderH1<T extends HTMLElement>(element: T): void;
    renderAside<T extends HTMLElement>(element: T): HTMLElement[];
    renderLevelBar<T extends HTMLElement>(element: T): HTMLDivElement[];
    renderMain(element: HTMLElement): HTMLElement[];
    renderMainBoard(element: HTMLElement): HTMLElement;
    renderBallonsDivs(element: HTMLElement): HTMLElement[];
    renderBoxDivs(element: HTMLElement): HTMLElement[];
    renderMainTable(element: HTMLElement): HTMLElement[];
    renderFooter(element: HTMLElement): void;
    renderTitle(element: HTMLElement): HTMLElement;
}

export type HTMLCodeObjectKeys = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';
export type CSSarwersKeys = HTMLCodeObjectKeys;

export interface ILevelRealization {
    buttonReset: HTMLElement;
    arrayOfLevelDivs: HTMLElement[];
    arrayOfBaloons: HTMLElement[];
    arrayOfBoxes: HTMLElement[];
    cssForm: HTMLFormElement;
    cssInput: HTMLInputElement;
    cssSubmit: HTMLInputElement;
    HTMLcode: HTMLElement;
    title: HTMLElement;
    buttonHelp: HTMLElement;
    levelCounter: number;
    greyWindowBehind: HTMLElement;
    banner: HTMLElement;
    start(): void;
}
