/// <reference types="jest" />
import { Render } from '../components/rendering/rendering';

describe('Check the correctness of rendering Aside element', () => {
    let htmlElement: HTMLElement = document.createElement('div');
    beforeEach(() => {
        htmlElement = document.createElement('div');
    });
    it('Should return four elements', () => {
        const elementsArray = new Render().renderAside(htmlElement);
        expect(elementsArray.length).toBe(4);
    });
    {
        new Render().renderAside(htmlElement);
        const child = htmlElement.firstChild as HTMLElement;
        it.each([
            [child.tagName.toLowerCase(), 'h2'],
            [child.className, 'h2-aside'],
        ])('Should create an H2 element and assign className', (value, expected) => {
            expect(value).toEqual(expected);
        });
    }
    {
        new Render().renderAside(htmlElement);
        const child = htmlElement.children[1] as HTMLElement;
        it.each([
            [child.tagName.toLowerCase(), 'div'],
            [child.className, 'level-bar'],
        ])('Should create a level bar element and assign className', (value, expected) => {
            expect(value).toEqual(expected);
        });
    }
    {
        new Render().renderAside(htmlElement);
        const child = htmlElement.children[2] as HTMLElement;
        it.each([
            [child.tagName.toLowerCase(), 'div'],
            [child.className, 'button-aside'],
        ])('Should create a button Reset element and assign className', (value, expected) => {
            expect(value).toEqual(expected);
        });
    }
    {
        new Render().renderAside(htmlElement);
        const child = htmlElement.children[3] as HTMLElement;
        it.each([
            [child.tagName.toLowerCase(), 'div'],
            [child.className, 'button-help'],
        ])('Should create a button Help element and assign className', (value, expected) => {
            expect(value).toEqual(expected);
        });
    }
});

describe('Check the correctness of rendering H1 element', () => {
    let htmlElement: HTMLElement = document.createElement('div');
    beforeEach(() => {
        htmlElement = document.createElement('div');
    });
    {
        new Render().addHeaderH1<HTMLElement>(htmlElement);
        const child = htmlElement.lastChild as HTMLElement;
        it.each([
            [child.tagName, 'H1'],
            [child.className, 'h1'],
            [child.textContent, 'Choose the right balloons'],
        ])('Should create an H1 element, assign className and give textContent', (value, expected) => {
            expect(value).toEqual(expected);
        });
    }
});

describe('Check the correctness of rendering level bar', () => {
    let htmlElement: HTMLElement = document.createElement('div');
    beforeEach(() => {
        htmlElement = document.createElement('div');
    });
    it('Should create div container for level buttons', () => {
        new Render().renderLevelBar(htmlElement);
        const lastChild = htmlElement.lastChild as HTMLElement;
        expect(lastChild.tagName.toLowerCase()).toEqual('div');
    });
    it('Should return ten levels buttons', () => {
        const collectionOfButtons = new Render().renderLevelBar(htmlElement);
        expect(collectionOfButtons.length).toEqual(10);
    });
});

describe('Check the correctness of rendering Main board element', () => {
    let htmlElement: HTMLElement = document.createElement('div');
    beforeEach(() => {
        htmlElement = document.createElement('div');
    });
    {
        new Render().renderMainBoard(htmlElement);
        const child = htmlElement.lastChild as HTMLElement;
        it.each([
            [child.tagName.toLowerCase(), 'div'],
            [child.className, 'board'],
        ])('Should create a Main board element and assign className', (value, expected) => {
            expect(value).toEqual(expected);
        });
    }
});

describe('Check the correctness of rendering Baloons divs element', () => {
    let htmlElement: HTMLElement = document.createElement('div');
    beforeEach(() => {
        htmlElement = document.createElement('div');
    });
    it('Should create Baloons divs element', () => {
        new Render().renderBallonsDivs(htmlElement);
        const arrayOfChild = htmlElement.children as HTMLCollection;
        expect(arrayOfChild.length).toBeGreaterThanOrEqual(6);
    });
});

describe('Check the correctness of rendering Boxes divs element', () => {
    let htmlElement: HTMLElement = document.createElement('div');
    beforeEach(() => {
        htmlElement = document.createElement('div');
    });
    it('Should create Baloons divs element', () => {
        new Render().renderBoxDivs(htmlElement);
        const arrayOfChild = htmlElement.children as HTMLCollection;
        expect(arrayOfChild.length).toBeLessThanOrEqual(5);
    });
});

describe('Check the correctness of rendering Main element', () => {
    let htmlElement: HTMLElement = document.createElement('div');
    beforeEach(() => {
        htmlElement = document.createElement('div');
    });
    new Render().renderMain(htmlElement);
    const arrayOfElements = htmlElement.children as HTMLCollection;
    const board = htmlElement.firstChild as HTMLElement;
    const table = htmlElement.lastChild as HTMLElement;
    it.each([
        [arrayOfElements.length, 2],
        [board.className, 'board-main'],
        [table.className, 'table-main'],
    ])('Should create two blocks and assign their className', (value, expected) => {
        expect(value).toEqual(expected);
    });
});

describe('Check the correctness of rendering Main table element', () => {
    let htmlElement: HTMLElement = document.createElement('div');
    beforeEach(() => {
        htmlElement = document.createElement('div');
    });
    new Render().renderMainTable(htmlElement);
    const tableCss = htmlElement.firstChild as HTMLElement;
    const tableHTML = htmlElement.lastChild as HTMLElement;
    it.each([
        [tableCss.className, 'table-css'],
        [tableHTML.className, 'table-html'],
    ])('Should create table css and html and assign their className', (value, expected) => {
        expect(value).toEqual(expected);
    });
});

describe('Check the correctness of rendering footer', () => {
    let htmlElement: HTMLElement = document.createElement('div');
    beforeEach(() => {
        htmlElement = document.createElement('div');
    });
    new Render().renderFooter(htmlElement);
    const elements = htmlElement.children as HTMLCollection;
    const author = htmlElement.firstChild as HTMLElement;
    const year = htmlElement.children[1] as HTMLElement;
    const courseLink = htmlElement.children[2] as HTMLElement;
    it.each([
        [elements.length, 3],
        [author.className, 'author-link'],
        [year.className, 'year'],
        [courseLink.className, 'course-link'],
    ])('Should create footer elements and assign their className', (value, expected) => {
        expect(value).toEqual(expected);
    });
});
describe('Check the correctness of rendering title', () => {
    let htmlElement: HTMLElement = document.createElement('div');
    beforeEach(() => {
        htmlElement = document.createElement('div');
    });
    new Render().renderTitle(htmlElement);
    const elements = htmlElement.children as HTMLCollection;
    const title = htmlElement.firstChild as HTMLElement;
    it.each([
        [elements.length, 1],
        [title.tagName.toLowerCase(), 'p'],
        [title.className, 'title'],
    ])('Should create title and assign className', (value, expected) => {
        expect(value).toEqual(expected);
    });
});
