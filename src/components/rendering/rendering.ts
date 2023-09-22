/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as stylesPage from './renderingPage.css';
import * as stylesAsides from './renderingAside.css';
import * as stylesMain from './renderingMain.css';
import * as stylesFooter from './renderingFooter.css';
import { MainElements, returnsPageRenderTypes, IRender } from '../../types/index';
export class Render implements IRender {
    public pageRender(): returnsPageRenderTypes {
        const root: HTMLDivElement = document.querySelector('.root')!;
        const arrayOfMainNames: string[] = [MainElements[0], MainElements[1], MainElements[2], MainElements[3]];
        const arrayOfMainElements: HTMLElement[] = this.renderMainBodyElements(arrayOfMainNames);
        this.addHeaderH1<HTMLElement>(arrayOfMainElements[0]);
        const asideElements: HTMLElement[] = this.renderAside<HTMLElement>(arrayOfMainElements[3]);
        const buttonResetProgress: HTMLElement = asideElements[2]; //                          RETURN BUTTON RESET PROGRESS
        const asideLevelDivElements: HTMLDivElement[] = this.renderLevelBar<HTMLElement>(asideElements[1]); // RETURN ARRAY OF LEVEL DIVS
        const mainElements: HTMLElement[] = this.renderMain(arrayOfMainElements[1]);
        const board: HTMLElement = this.renderMainBoard(mainElements[0]);
        const divBaloons: HTMLElement[] = this.renderBallonsDivs(board); //                       RETURN ARRAY OF BALOONS DIV
        const divBoxes: HTMLElement[] = this.renderBoxDivs(board); //                             RETURN ARRAY OF BOXES DIV
        const tableElements: HTMLElement[] = this.renderMainTable(mainElements[1]); //            RETURN MAIN
        const CSStable: HTMLElement[] = this.renderTableCss(tableElements[0]);
        const cssForm: HTMLElement = CSStable[1]; //                                       RETURN CSS FORM
        const cssInput: HTMLElement = CSStable[2]; //                                       RETURN CSS INPUT
        const cssSubmitButton: HTMLElement = CSStable[3]; //                               RETURN CSS BUTTON SUBMIT
        const HTMLcodeSpace: HTMLElement = this.renderTableHTML(tableElements[1]); //            RETURN HTML CODE ELEMENT
        this.renderFooter(arrayOfMainElements[2]);
        const title: HTMLElement = this.renderTitle(board); //                  RETURN TITLE
        const buttonHelp: HTMLElement = asideElements[3]; //                          RETURN BUTTON HELP
        const winBannerElements: HTMLElement[] = this.renderWinBanner(root);
        const greyWindowBehind: HTMLElement = winBannerElements[0];
        const banner: HTMLElement = winBannerElements[1];
        return [
            buttonResetProgress,
            asideLevelDivElements,
            divBaloons,
            divBoxes,
            cssForm,
            cssInput,
            cssSubmitButton,
            HTMLcodeSpace,
            title,
            buttonHelp,
            greyWindowBehind,
            banner,
        ];
    }
    public renderMainBodyElements(elementNames: string[]): HTMLElement[] {
        const arrayOfElements: HTMLElement[] = [];
        elementNames.forEach((elemname) => {
            const root: HTMLDivElement = document.querySelector('.root')!;
            const element: HTMLElement = document.createElement(`${elemname}`);
            element.className = `${elemname}`;
            root.append(element);
            arrayOfElements.push(element);
        });
        return arrayOfElements;
    }
    public addHeaderH1<T extends HTMLElement>(element: T): void {
        const h1: HTMLHeadingElement = document.createElement('h1');
        h1.className = 'h1';
        h1.textContent = 'Choose the right balloons';
        element.append(h1);
    }
    public renderAside<T extends HTMLElement>(element: T): HTMLElement[] {
        const h2: HTMLHeadingElement = document.createElement('h2');
        h2.className = 'h2-aside';
        h2.textContent = 'Level';
        const levelBar: HTMLDivElement = document.createElement('div');
        levelBar.className = 'level-bar';
        const buttonAside: HTMLDivElement = document.createElement('div');
        buttonAside.className = 'button-aside';
        const buttonText: HTMLParagraphElement = document.createElement('p');
        buttonText.className = 'aside_button-text';
        buttonText.textContent = 'Reset progress';
        buttonAside.append(buttonText);
        const buttonHelp: HTMLDivElement = document.createElement('div');
        buttonHelp.className = 'button-help';
        const buttonHelpText: HTMLParagraphElement = document.createElement('p');
        buttonHelpText.className = 'help_button-text';
        buttonHelpText.textContent = 'HELP';
        buttonHelp.append(buttonHelpText);
        element.append(h2, levelBar, buttonAside, buttonHelp);
        return [h2, levelBar, buttonAside, buttonHelp];
    }
    public renderLevelBar<T extends HTMLElement>(element: T): HTMLDivElement[] {
        const arrayOfLevelDivs: HTMLDivElement[] = [];
        for (let i = 0; i < 10; i += 1) {
            const renderLevelDiv: HTMLDivElement = document.createElement('div');
            renderLevelDiv.className = `level-div level-div_${i}`;
            const renderLevelDivImg: HTMLDivElement = document.createElement('div');
            renderLevelDivImg.className = `level-divImg level-divImg_${i}`;
            const renderLevelNumber: HTMLSpanElement = document.createElement('span');
            renderLevelNumber.className = 'level-number';
            renderLevelNumber.textContent = `${i + 1}`;
            renderLevelDiv.append(renderLevelDivImg, renderLevelNumber);
            element.append(renderLevelDiv);
            arrayOfLevelDivs.push(renderLevelDiv);
        }
        return arrayOfLevelDivs;
    }
    public renderMain(element: HTMLElement): HTMLElement[] {
        const boardMain: HTMLDivElement = document.createElement('div');
        boardMain.className = 'board-main';
        const tableMain: HTMLDivElement = document.createElement('div');
        tableMain.className = 'table-main';
        element.append(boardMain, tableMain);
        return [boardMain, tableMain];
    }
    public renderMainBoard(element: HTMLElement): HTMLElement {
        const board: HTMLDivElement = document.createElement('div');
        board.className = 'board';
        element.append(board);
        return board;
    }
    public renderBallonsDivs(element: HTMLElement): HTMLElement[] {
        const arrayOfdivBallons: HTMLElement[] = [];
        for (let i = 0; i < 6; i += 1) {
            const ballon = document.createElement('div');
            ballon.className = `baloon baloon_${i + 1}`;
            element.append(ballon);
            arrayOfdivBallons.push(ballon);
        }
        return arrayOfdivBallons;
    }
    public renderBoxDivs(element: HTMLElement): HTMLElement[] {
        const arrayOfdivBoxes: HTMLElement[] = [];
        for (let i = 0; i < 5; i += 1) {
            const boxDiv = document.createElement('div');
            boxDiv.className = `box box_${i + 1}`;
            element.append(boxDiv);
            arrayOfdivBoxes.push(boxDiv);
        }
        return arrayOfdivBoxes;
    }
    public renderMainTable(element: HTMLElement): HTMLElement[] {
        const tableCSS: HTMLDivElement = document.createElement('div');
        tableCSS.className = `table-css`;
        const tableHTML: HTMLDivElement = document.createElement('div');
        tableHTML.className = `table-html`;
        element.append(tableCSS, tableHTML);
        return [tableCSS, tableHTML];
    }
    private renderTableCss(element: HTMLElement): HTMLElement[] {
        const tableCSSHeader: HTMLDivElement = document.createElement('div');
        tableCSSHeader.className = 'tableCSS-header';
        const tableCSSHeaderName: HTMLSpanElement = document.createElement('span');
        tableCSSHeaderName.textContent = 'CSS Editor';
        tableCSSHeaderName.className = 'tableCSS-header-name';
        const tableCSSDocType: HTMLSpanElement = document.createElement('span');
        tableCSSDocType.className = 'tableCSS-header-doctype';
        tableCSSDocType.textContent = 'style.css';
        tableCSSHeader.append(tableCSSHeaderName, tableCSSDocType);
        const cssForm: HTMLFormElement = document.createElement('form');
        cssForm.className = 'css-form';
        cssForm.action = '#';
        const inputTextCss: HTMLInputElement = document.createElement('input');
        inputTextCss.className = 'input-textCss';
        inputTextCss.type = 'text';
        inputTextCss.placeholder = 'Type in a CSS selector';
        const inputSubmit: HTMLInputElement = document.createElement('input');
        inputSubmit.className = 'submitCss';
        inputSubmit.type = 'submit';
        inputSubmit.value = 'enter';
        cssForm.append(inputTextCss, inputSubmit);
        element.append(tableCSSHeader, cssForm);
        return [tableCSSHeader, cssForm, inputTextCss, inputSubmit];
    }
    private renderTableHTML(element: HTMLElement): HTMLElement {
        const tableHTMLHeader: HTMLDivElement = document.createElement('div');
        tableHTMLHeader.className = 'tableHTML-header';
        const tableHTMLHeaderName: HTMLSpanElement = document.createElement('span');
        tableHTMLHeaderName.textContent = 'HTML Viewer';
        tableHTMLHeaderName.className = 'tableHTML-header-name';
        const tableHTMLDocType: HTMLSpanElement = document.createElement('span');
        tableHTMLDocType.className = 'tableHTML-header-doctype';
        tableHTMLDocType.textContent = 'table.html';
        tableHTMLHeader.append(tableHTMLHeaderName, tableHTMLDocType);
        const HTMLtextArea: HTMLDivElement = document.createElement('div');
        HTMLtextArea.className = 'HTMLtextarea';
        const HTMLnumberSpace: HTMLDivElement = document.createElement('div');
        HTMLnumberSpace.className = 'HTMLnumber-space';
        for (let i = 0; i < 15; i += 1) {
            const HTMLrowsNumbers: HTMLElement = document.createElement('div');
            HTMLrowsNumbers.className = `html-rows-number html-rows-number_${i}`;
            HTMLrowsNumbers.textContent = `${i + 1}`;
            HTMLnumberSpace.append(HTMLrowsNumbers);
        }
        const HTMLcodeSpace: HTMLDivElement = document.createElement('div');
        HTMLcodeSpace.className = 'HTMLcode-space';
        const preForHTML: HTMLPreElement = document.createElement('pre');
        preForHTML.className = 'HTML-pre';
        const HTMLcode: HTMLElement = document.createElement('code');
        HTMLcode.className = 'html';
        preForHTML.append(HTMLcode);
        HTMLcodeSpace.append(preForHTML);
        HTMLtextArea.append(HTMLnumberSpace, HTMLcodeSpace);
        element.append(tableHTMLHeader, HTMLtextArea);
        return HTMLcode;
    }
    public renderFooter(element: HTMLElement): void {
        const authorLink: HTMLAnchorElement = document.createElement('a');
        authorLink.className = 'author-link';
        authorLink.href = 'https://github.com/rolling-scopes-school/elizavetarazumenko-JSFE2023Q1';
        const year: HTMLSpanElement = document.createElement('span');
        year.className = 'year';
        year.textContent = '© 2023';
        const courseLink: HTMLAnchorElement = document.createElement('a');
        courseLink.className = 'course-link';
        courseLink.href = 'https://rs.school/js/';
        element.append(authorLink, year, courseLink);
    }
    public renderTitle(element: HTMLElement): HTMLElement {
        const title: HTMLElement = document.createElement('p');
        title.className = 'title';
        title.textContent = 'title';
        element.append(title);
        return title;
    }
    private renderWinBanner(element: HTMLElement): HTMLElement[] {
        const greyWindowBehind: HTMLElement = document.createElement('div');
        greyWindowBehind.className = 'grey-window-behind hidden';
        const banner: HTMLElement = document.createElement('div');
        banner.className = 'banner hidden';
        const bannerText: HTMLElement = document.createElement('p');
        bannerText.className = 'banner-text';
        bannerText.textContent = 'Congratulations! You passed all levels!';
        banner.append(bannerText);
        greyWindowBehind.append(banner);
        element.append(greyWindowBehind);
        return [greyWindowBehind, banner];
    }
}

function forStyles() {
    stylesPage;
    stylesAsides;
    stylesMain;
    stylesFooter;
}
forStyles();
