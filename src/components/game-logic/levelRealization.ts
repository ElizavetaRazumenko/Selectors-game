/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { HTMLcode } from './HTMLcodeForLevels';
import { CSSselectors } from './CSSanswers';
import { returnsPageRenderTypes, HTMLCodeObjectKeys, ILevelRealization } from '../../types/index';

export class LevelRealization implements ILevelRealization {
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
    constructor(arrayOfUsedElements: returnsPageRenderTypes) {
        this.buttonReset = arrayOfUsedElements[0] as HTMLElement;
        this.arrayOfLevelDivs = arrayOfUsedElements[1] as HTMLElement[];
        this.arrayOfBaloons = arrayOfUsedElements[2] as HTMLElement[];
        this.arrayOfBoxes = arrayOfUsedElements[3] as HTMLElement[];
        this.cssForm = arrayOfUsedElements[4] as HTMLFormElement;
        this.cssInput = arrayOfUsedElements[5] as HTMLInputElement;
        this.cssSubmit = arrayOfUsedElements[6] as HTMLInputElement;
        this.HTMLcode = arrayOfUsedElements[7] as HTMLElement;
        this.title = arrayOfUsedElements[8] as HTMLElement;
        this.buttonHelp = arrayOfUsedElements[9] as HTMLElement;
        this.greyWindowBehind = arrayOfUsedElements[10] as HTMLElement;
        this.banner = arrayOfUsedElements[11] as HTMLElement;
        this.levelCounter = 1;
    }
    public start(): void {
        if (localStorage.getItem('level')) {
            const levelnumber = Number(localStorage.getItem('level'));
            const arrayOfSelectedLevels = localStorage.getItem('completedLevels')!.split(',');
            this.arrayOfLevelDivs.forEach((item, index) => {
                item.firstElementChild!.className = `${arrayOfSelectedLevels[index]}`;
            });
            this.levelCreate(levelnumber);
        } else {
            this.levelCreate();
        }
    }
    private levelCreate(levelnumber = 1): void {
        this.levelCounter = levelnumber;
        localStorage.setItem('level', `${levelnumber}`);
        const arrayOfSelectedLevels: string[] = [];
        this.arrayOfLevelDivs.forEach((item) => {
            arrayOfSelectedLevels.push(`${item.firstElementChild!.classList}`);
        });
        localStorage.setItem('completedLevels', `${arrayOfSelectedLevels.join(',')}`);
        const number: HTMLCodeObjectKeys = levelnumber.toString() as HTMLCodeObjectKeys;
        this.HTMLcode.textContent = HTMLcode[number];
        const { hljs }: Window & { hljs?: { highlightAll: () => void } } = window;
        hljs!.highlightAll();
        this.cssForm.onsubmit = () => {
            if (CSSselectors[number].includes(this.cssInput.value.replace(/\s/g, ''))) {
                if (
                    !this.arrayOfLevelDivs[levelnumber - 1].firstElementChild!.classList.contains(
                        'level-passed-with-help'
                    )
                ) {
                    this.arrayOfLevelDivs[levelnumber - 1].firstElementChild!.classList.add('level-passed');
                }
                const arrayOfFilteredItems: HTMLElement[] = this.arrayOfLevelDivs.filter(
                    (item) =>
                        item.firstElementChild!.classList.contains('level-passed') ||
                        item.firstElementChild!.classList.contains('level-passed-with-help')
                );
                if (arrayOfFilteredItems.length === 10) {
                    this.winBanner();
                }
                this.arrayOfBaloons.forEach((item) => {
                    if (item.classList.contains('transitionBallon')) {
                        item.classList.add('transition-fly');
                    }
                    item.onanimationend = () => {
                        item.classList.remove('transition-fly');
                        if (levelnumber + 1 > 10) {
                            this.levelCreate((levelnumber + 1) % 10);
                        } else this.levelCreate(levelnumber + 1);
                    };
                });
            } else {
                this.cssInput.classList.add('thansition-wrong');
                this.cssInput.onanimationend = () => {
                    this.cssInput.classList.remove('thansition-wrong');
                };
            }
            this.cssInput.value = '';
        };
        this.toggleAsideLevels();
        this.resetProgress();
        this.helpier();
        this.arrayOfLevelDivs.forEach((leveldiv) => {
            leveldiv.classList.remove('level-div-selected');
        });
        this.arrayOfLevelDivs[levelnumber - 1].classList.add('level-div-selected');
        switch (levelnumber) {
            case 1:
                this.createLevel1();
                break;
            case 2:
                this.createLevel2();
                break;
            case 3:
                this.createLevel3();
                break;
            case 4:
                this.createLevel4();
                break;
            case 5:
                this.createLevel5();
                break;
            case 6:
                this.createLevel6();
                break;
            case 7:
                this.createLevel7();
                break;
            case 8:
                this.createLevel8();
                break;
            case 9:
                this.createLevel9();
                break;
            case 10:
                this.createLevel10();
                break;
        }
    }
    private toggleAsideLevels(): void {
        this.arrayOfLevelDivs.forEach((level, index) => {
            level.onclick = () => {
                this.levelCreate(index + 1);
            };
        });
    }
    private resetProgress(): void {
        this.buttonReset.onclick = () => {
            this.arrayOfLevelDivs.forEach((level) => {
                level.firstElementChild!.classList.remove('level-passed');
                level.firstElementChild!.classList.remove('level-passed-with-help');
            });
            this.levelCreate();
        };
    }
    private helpier(): void {
        this.buttonHelp.onclick = () => {
            const number: HTMLCodeObjectKeys = this.levelCounter.toString() as HTMLCodeObjectKeys;
            this.cssInput.value = CSSselectors[number][0];
            this.cssInput.classList.add('text-animation');
            this.cssInput.onanimationend = () => {
                this.cssInput.classList.remove('text-animation');
            };
            this.arrayOfLevelDivs[this.levelCounter - 1].firstElementChild!.classList.add('level-passed-with-help');
        };
    }
    private winBanner(): void {
        this.greyWindowBehind.classList.remove('hidden');
        this.banner.classList.remove('hidden');
        this.greyWindowBehind.onclick = () => {
            this.greyWindowBehind.classList.add('hidden');
            this.banner.classList.add('hidden');
        };
    }
    private levelConctructor(ballunhidden: number[], ballmoving: number[], boxes?: number[]): void {
        this.arrayOfBaloons.forEach((baloon) => {
            baloon.classList.add('hidden');
            baloon.classList.remove(`transitionBallon`);
        });
        this.arrayOfBoxes.forEach((box) => {
            box.classList.add('hidden');
        });
        ballunhidden.forEach((index) => {
            this.arrayOfBaloons[index].classList.remove('hidden');
        });
        ballmoving.forEach((index) => {
            this.arrayOfBaloons[index].classList.add(`transitionBallon`);
        });
        if (boxes) {
            boxes.forEach((index) => {
                this.arrayOfBoxes[index].classList.remove('hidden');
            });
        }
    }
    private createLevel1(): void {
        const arrayOfBaloonsIndexesUnhidden = [2, 3];
        const arrayOfBaloonsIndexesMoving = [2, 3];
        const arrayOfBoxesIndexes = [1];
        this.levelConctructor(arrayOfBaloonsIndexesUnhidden, arrayOfBaloonsIndexesMoving, arrayOfBoxesIndexes);
        this.highlightsBoxes(1, [0, 1, 2, 3], '<div class="big-box"></div>');
        this.highlightsBaloons(2, 1, '<baloon/>');
        this.highlightsBaloons(3, 2, '<baloon/>');
        this.HTMLCodeListenerLevel1();
    }
    private HTMLCodeListenerLevel1(): void {
        this.HTMLcode.onmouseover = (e) => {
            const trget = e.target as HTMLElement;
            const codestringTarget = trget.closest('.hljs-tag');
            if (!codestringTarget) this.removeAllClasses();
            //                          FOR FIRST BALOON
            if (this.HTMLcode.children[1] === codestringTarget) {
                this.addedClassesForBaloons(1, 2, '<baloon/>');
            }
            //                          FOR SECOND BALOON
            if (this.HTMLcode.children[2] === codestringTarget) {
                this.addedClassesForBaloons(2, 3, '<baloon/>');
            }
            //                          FOR BOX
            if (this.HTMLcode.children[0] === codestringTarget || this.HTMLcode.children[3] === codestringTarget) {
                this.addedClassesForBoxes([0, 1, 2, 3], 1, '<div class="big-box"></div>');
            }
        };
    }
    private createLevel2(): void {
        const arrayOfBaloonsIndexesUnhidden = [1, 2, 3];
        const arrayOfBaloonsIndexesMoving = [1, 3];
        const arrayOfBoxesIndexes = [3];
        this.levelConctructor(arrayOfBaloonsIndexesUnhidden, arrayOfBaloonsIndexesMoving, arrayOfBoxesIndexes);
        this.highlightsBoxes(3, [0, 1, 2, 3, 4], '<div class="big-box"></div>');
        this.highlightsBaloons(1, 1, '<baloon type="moving"/>');
        this.highlightsBaloons(2, 2, '<baloon/>');
        this.highlightsBaloons(3, 3, '<baloon type="moving"/>');
        this.HTMLCodeListenerLevel2();
    }
    private HTMLCodeListenerLevel2(): void {
        this.HTMLcode.onmouseover = (e) => {
            const trget = e.target as HTMLElement;
            const codestringTarget = trget.closest('.hljs-tag');
            if (!codestringTarget) this.removeAllClasses();
            //                          FOR FIRST BALOON
            if (this.HTMLcode.children[1] === codestringTarget) {
                this.addedClassesForBaloons(1, 1, '<baloon type="moving"/>');
            }
            //                          FOR SECOND BALOON
            if (this.HTMLcode.children[2] === codestringTarget) {
                this.addedClassesForBaloons(2, 2, '<baloon/>');
            }
            //                          FOR THIRD BALOON
            if (this.HTMLcode.children[3] === codestringTarget) {
                this.addedClassesForBaloons(3, 3, '<baloon type="moving"/>');
            }
            //                          FOR BOX
            if (this.HTMLcode.children[0] === codestringTarget || this.HTMLcode.children[4] === codestringTarget) {
                this.addedClassesForBoxes([0, 1, 2, 3, 4], 3, '<div class="big-box"></div>');
            }
        };
    }
    private createLevel3(): void {
        const arrayOfBaloonsIndexesUnhidden = [2, 3];
        const arrayOfBaloonsIndexesMoving = [3];
        const arrayOfBoxesIndexes = [1];
        this.levelConctructor(arrayOfBaloonsIndexesUnhidden, arrayOfBaloonsIndexesMoving, arrayOfBoxesIndexes);
        this.highlightsBoxes(1, [0, 1, 2, 3], '<div class="big-box"></div>');
        this.highlightsBaloons(2, 1, '<baloon/>');
        this.highlightsBaloons(3, 2, '<baloon/>');
        this.HTMLCodeListenerLevel3();
    }
    private HTMLCodeListenerLevel3(): void {
        this.HTMLcode.onmouseover = (e) => {
            const trget = e.target as HTMLElement;
            const codestringTarget = trget.closest('.hljs-tag');
            if (!codestringTarget) this.removeAllClasses();
            //                          FOR FIRST BALOON
            if (this.HTMLcode.children[1] === codestringTarget) {
                this.addedClassesForBaloons(1, 2, '<baloon/>');
            }
            //                          FOR SECOND BALOON
            if (this.HTMLcode.children[2] === codestringTarget) {
                this.addedClassesForBaloons(2, 3, '<baloon/>');
            }
            //                          FOR BOX
            if (this.HTMLcode.children[0] === codestringTarget || this.HTMLcode.children[3] === codestringTarget) {
                this.addedClassesForBoxes([0, 1, 2, 3], 1, '<div class="big-box"></div>');
            }
        };
    }
    private createLevel4(): void {
        const arrayOfBaloonsIndexesUnhidden = [2, 3, 5];
        const arrayOfBaloonsIndexesMoving = [2, 5];
        const arrayOfBoxesIndexes = [1, 2];
        this.levelConctructor(arrayOfBaloonsIndexesUnhidden, arrayOfBaloonsIndexesMoving, arrayOfBoxesIndexes);
        this.highlightsBoxes(1, [0, 1, 2, 3], '<div class="big-box"></div>');
        this.highlightsBoxes(2, [4, 5, 6], '<div class="small-box"></div>');
        this.highlightsBaloons(2, 1, '<baloon class="baloon"/>');
        this.highlightsBaloons(3, 2, '<baloon/>');
        this.highlightsBaloons(5, 5, '<baloon class="baloon"/>');
        this.HTMLCodeListenerLevel4();
    }
    private HTMLCodeListenerLevel4(): void {
        this.HTMLcode.onmouseover = (e) => {
            const trget = e.target as HTMLElement;
            const codestringTarget = trget.closest('.hljs-tag');
            if (!codestringTarget) this.removeAllClasses();
            //                          FOR FIRST BALOON
            if (this.HTMLcode.children[1] === codestringTarget) {
                this.addedClassesForBaloons(1, 2, '<baloon class="baloon"/>');
            }
            //                          FOR SECOND BALOON
            if (this.HTMLcode.children[2] === codestringTarget) {
                this.addedClassesForBaloons(2, 3, '<baloon/>');
            }
            //                          FOR BOX
            if (this.HTMLcode.children[0] === codestringTarget || this.HTMLcode.children[3] === codestringTarget) {
                this.addedClassesForBoxes([0, 1, 2, 3], 1, '<div class="big-box"></div>');
            }
            //                          FOR THIRD BALOON
            if (this.HTMLcode.children[5] === codestringTarget) {
                this.addedClassesForBaloons(5, 5, '<baloon class="baloon"/>');
            }
            //                          FOR SECOND BOX
            if (this.HTMLcode.children[4] === codestringTarget || this.HTMLcode.children[6] === codestringTarget) {
                this.addedClassesForBoxes([4, 5, 6], 2, '<div class="small-box"></div>');
            }
        };
    }
    private createLevel5(): void {
        const arrayOfBaloonsIndexesUnhidden = [0, 2, 3, 5];
        const arrayOfBaloonsIndexesMoving = [0, 2, 5];
        const arrayOfBoxesIndexes = [1, 2];
        this.levelConctructor(arrayOfBaloonsIndexesUnhidden, arrayOfBaloonsIndexesMoving, arrayOfBoxesIndexes);
        this.highlightsBoxes(1, [1, 2, 3, 4], '<div class="big-box"></div>');
        this.highlightsBoxes(2, [5, 6, 7], '<div class="small-box"></div>');
        this.highlightsBaloons(0, 0, '<baloon/>');
        this.highlightsBaloons(2, 2, '<baloon/>');
        this.highlightsBaloons(3, 3, '<baloon class ="pink"/>');
        this.highlightsBaloons(5, 6, '<baloon/>');
        this.HTMLCodeListenerLevel5();
    }
    private HTMLCodeListenerLevel5(): void {
        this.HTMLcode.onmouseover = (e) => {
            const trget = e.target as HTMLElement;
            const codestringTarget = trget.closest('.hljs-tag');
            if (!codestringTarget) this.removeAllClasses();
            //                          FOR FIRST BALOON
            if (this.HTMLcode.children[0] === codestringTarget) {
                this.addedClassesForBaloons(0, 0, '<baloon/>');
            }
            //                          FOR SECOND BALOON
            if (this.HTMLcode.children[2] === codestringTarget) {
                this.addedClassesForBaloons(2, 2, '<baloon/>');
            }
            //                          FOR THIRD BALOON
            if (this.HTMLcode.children[3] === codestringTarget) {
                this.addedClassesForBaloons(3, 3, '<baloon class ="pink"/>');
            }
            //                          FOR FIRST BOX
            if (this.HTMLcode.children[1] === codestringTarget || this.HTMLcode.children[4] === codestringTarget) {
                this.addedClassesForBoxes([1, 2, 3, 4], 1, '<div class="big-box"></div>');
            }
            //                          FOR FOURTH BALOON
            if (this.HTMLcode.children[6] === codestringTarget) {
                this.addedClassesForBaloons(6, 5, '<baloon/>');
            }
            //                          FOR SECOND BOX
            if (this.HTMLcode.children[5] === codestringTarget || this.HTMLcode.children[7] === codestringTarget) {
                this.addedClassesForBoxes([5, 6, 7], 2, '<div class="small-box"></div>');
            }
        };
    }
    private createLevel6(): void {
        const arrayOfBaloonsIndexesUnhidden = [1, 2, 3, 4];
        const arrayOfBaloonsIndexesMoving = [2, 4];
        const arrayOfBoxesIndexes = [3];
        this.levelConctructor(arrayOfBaloonsIndexesUnhidden, arrayOfBaloonsIndexesMoving, arrayOfBoxesIndexes);
        this.highlightsBoxes(3, [0, 1, 2, 3, 4, 5], '<div class="big-box"></div>');
        this.highlightsBaloons(1, 1, '<baloon/>');
        this.highlightsBaloons(2, 2, '<baloon/>');
        this.highlightsBaloons(3, 3, '<baloon/>');
        this.highlightsBaloons(4, 4, '<baloon/>');
        this.HTMLCodeListenerLevel6();
    }
    private HTMLCodeListenerLevel6(): void {
        this.HTMLcode.onmouseover = (e) => {
            const trget = e.target as HTMLElement;
            const codestringTarget = trget.closest('.hljs-tag');
            if (!codestringTarget) this.removeAllClasses();
            //                          FOR FIRST BALOON
            if (this.HTMLcode.children[1] === codestringTarget) {
                this.addedClassesForBaloons(1, 1, '<baloon/>');
            }
            //                          FOR SECOND BALOON
            if (this.HTMLcode.children[2] === codestringTarget) {
                this.addedClassesForBaloons(2, 2, '<baloon/>');
            }
            //                          FOR THIRD BALOON
            if (this.HTMLcode.children[3] === codestringTarget) {
                this.addedClassesForBaloons(3, 3, '<baloon/>');
            }
            //                          FOR FOURTH BALOON
            if (this.HTMLcode.children[4] === codestringTarget) {
                this.addedClassesForBaloons(4, 4, '<baloon/>');
            }
            //                          FOR BOX
            if (this.HTMLcode.children[0] === codestringTarget || this.HTMLcode.children[5] === codestringTarget) {
                this.addedClassesForBoxes([0, 1, 2, 3, 4, 5], 3, '<div class="big-box"></div>');
            }
        };
    }
    private createLevel7(): void {
        const arrayOfBaloonsIndexesUnhidden = [0, 1, 2, 3, 4, 5];
        const arrayOfBaloonsIndexesMoving = [0, 1, 2, 3, 4, 5];
        this.levelConctructor(arrayOfBaloonsIndexesUnhidden, arrayOfBaloonsIndexesMoving);
        this.highlightsBaloons(0, 0, '<baloon/>');
        this.highlightsBaloons(1, 1, '<baloon/>');
        this.highlightsBaloons(2, 2, '<baloon/>');
        this.highlightsBaloons(3, 3, '<baloon/>');
        this.highlightsBaloons(4, 4, '<baloon/>');
        this.highlightsBaloons(5, 5, '<baloon/>');
        this.HTMLCodeListenerLevel7();
    }
    private HTMLCodeListenerLevel7(): void {
        this.HTMLcode.onmouseover = (e) => {
            const trget = e.target as HTMLElement;
            const codestringTarget = trget.closest('.hljs-tag');
            if (!codestringTarget) this.removeAllClasses();
            //                          FOR FIRST BALOON
            if (this.HTMLcode.children[0] === codestringTarget) {
                this.addedClassesForBaloons(0, 0, '<baloon/>');
            }
            //                          FOR SECOND BALOON
            if (this.HTMLcode.children[1] === codestringTarget) {
                this.addedClassesForBaloons(1, 1, '<baloon/>');
            }
            //                          FOR THIRD BALOON
            if (this.HTMLcode.children[2] === codestringTarget) {
                this.addedClassesForBaloons(2, 2, '<baloon/>');
            }
            //                          FOR FOURTH BALOON
            if (this.HTMLcode.children[3] === codestringTarget) {
                this.addedClassesForBaloons(3, 3, '<baloon/>');
            }
            //                          FOR FIFTH BALOON
            if (this.HTMLcode.children[4] === codestringTarget) {
                this.addedClassesForBaloons(4, 4, '<baloon/>');
            }
            //                          FOR SIXTH BALOON
            if (this.HTMLcode.children[5] === codestringTarget) {
                this.addedClassesForBaloons(5, 5, '<baloon/>');
            }
        };
    }
    private createLevel8(): void {
        const arrayOfBaloonsIndexesUnhidden = [0, 1, 2, 3, 5];
        const arrayOfBaloonsIndexesMoving = [0, 3, 5];
        const arrayOfBoxesIndexes = [0, 2, 3];
        this.levelConctructor(arrayOfBaloonsIndexesUnhidden, arrayOfBaloonsIndexesMoving, arrayOfBoxesIndexes);
        this.highlightsBoxes(0, [0, 1, 2], '<div class="small-box"></div>');
        this.highlightsBoxes(3, [3, 4, 5, 6, 7], '<div class="big-box"></div>');
        this.highlightsBoxes(2, [8, 9, 10], '<div class="small-box"></div>');
        this.highlightsBaloons(0, 1, '<baloonblue type="baloonblue"/>');
        this.highlightsBaloons(1, 4, '<baloongreen/>');
        this.highlightsBaloons(2, 5, '<baloonorange/>');
        this.highlightsBaloons(3, 6, '<baloonpink type="baloonpink"/>');
        this.highlightsBaloons(5, 9, '<baloonyellow type="baloonyellow"/>');
        this.HTMLCodeListenerLevel8();
    }
    private HTMLCodeListenerLevel8(): void {
        this.HTMLcode.onmouseover = (e) => {
            const trget = e.target as HTMLElement;
            const codestringTarget = trget.closest('.hljs-tag');
            if (!codestringTarget) this.removeAllClasses();
            //                          FOR FIRST BALOON
            if (this.HTMLcode.children[1] === codestringTarget) {
                this.addedClassesForBaloons(1, 0, '<baloonblue type="baloonblue"/>');
            }
            //                          FOR SECOND BALOON
            if (this.HTMLcode.children[4] === codestringTarget) {
                this.addedClassesForBaloons(4, 1, '<baloongreen/>');
            }
            //                          FOR THIRD BALOON
            if (this.HTMLcode.children[5] === codestringTarget) {
                this.addedClassesForBaloons(5, 2, '<baloonorange/>');
            }
            //                          FOR FOURTH BALOON
            if (this.HTMLcode.children[6] === codestringTarget) {
                this.addedClassesForBaloons(6, 3, '<baloonpink type="baloonpink"/>');
            }
            //                          FOR FIFTH BALOON
            if (this.HTMLcode.children[9] === codestringTarget) {
                this.addedClassesForBaloons(9, 5, '<baloonyellow type="baloonyellow"/>');
            }
            //                          FOR FIRST BOX
            if (this.HTMLcode.children[0] === codestringTarget || this.HTMLcode.children[2] === codestringTarget) {
                this.addedClassesForBoxes([0, 1, 2], 0, '<div class="small-box"></div>');
            }
            //                          FOR SECOND BOX
            if (this.HTMLcode.children[3] === codestringTarget || this.HTMLcode.children[7] === codestringTarget) {
                this.addedClassesForBoxes([3, 4, 5, 6, 7], 3, '<div class="big-box"></div>');
            }
            //                          FOR THIRD BOX
            if (this.HTMLcode.children[8] === codestringTarget || this.HTMLcode.children[10] === codestringTarget) {
                this.addedClassesForBoxes([8, 9, 10], 2, '<div class="small-box"></div>');
            }
        };
    }
    private createLevel9(): void {
        const arrayOfBaloonsIndexesUnhidden = [0, 2, 3, 5];
        const arrayOfBaloonsIndexesMoving = [0, 3, 5];
        const arrayOfBoxesIndexes = [0, 1, 2];
        this.levelConctructor(arrayOfBaloonsIndexesUnhidden, arrayOfBaloonsIndexesMoving, arrayOfBoxesIndexes);
        this.highlightsBoxes(0, [0, 1, 2], '<div class="small-box"></div>');
        this.highlightsBoxes(1, [3, 4, 5, 6], '<div class="big-box"></div>');
        this.highlightsBoxes(2, [7, 8, 9], '<div class="small-box"></div>');
        this.highlightsBaloons(0, 1, '<baloonblue type="bluebaloon"/>');
        this.highlightsBaloons(2, 4, '<baloonorange/>');
        this.highlightsBaloons(3, 5, 'baloonpink type="pinkbaloon"/>');
        this.highlightsBaloons(5, 8, '<baloonyellow type=yellowbaloon/>');
        this.HTMLCodeListenerLevel9();
    }
    private HTMLCodeListenerLevel9(): void {
        this.HTMLcode.onmouseover = (e) => {
            const trget = e.target as HTMLElement;
            const codestringTarget = trget.closest('.hljs-tag');
            if (!codestringTarget) this.removeAllClasses();
            //                          FOR FIRST BALOON
            if (this.HTMLcode.children[1] === codestringTarget) {
                this.addedClassesForBaloons(1, 0, '<baloonblue type="bluebaloon"/>');
            }
            //                          FOR SECOND BALOON
            if (this.HTMLcode.children[4] === codestringTarget) {
                this.addedClassesForBaloons(4, 2, '<baloonorange/>');
            }
            //                          FOR THIRD BALOON
            if (this.HTMLcode.children[5] === codestringTarget) {
                this.addedClassesForBaloons(5, 3, '<baloonpink type="pinkbaloon"/>');
            }
            //                          FOR FOURTH BALOON
            if (this.HTMLcode.children[8] === codestringTarget) {
                this.addedClassesForBaloons(8, 5, '<baloonyellow type=yellowbaloon/>');
            }
            //                          FOR FIRST BOX
            if (this.HTMLcode.children[0] === codestringTarget || this.HTMLcode.children[2] === codestringTarget) {
                this.addedClassesForBoxes([0, 1, 2], 0, '<div class="small-box"></div>');
            }
            //                          FOR SECOND BOX
            if (this.HTMLcode.children[3] === codestringTarget || this.HTMLcode.children[6] === codestringTarget) {
                this.addedClassesForBoxes([3, 4, 5, 6], 1, '<div class="big-box"></div>');
            }
            //                          FOR THIRD BOX
            if (this.HTMLcode.children[7] === codestringTarget || this.HTMLcode.children[9] === codestringTarget) {
                this.addedClassesForBoxes([7, 8, 9], 2, '<div class="small-box"></div>');
            }
        };
    }
    private createLevel10(): void {
        const arrayOfBaloonsIndexesUnhidden = [0, 1, 2, 3, 4, 5];
        const arrayOfBaloonsIndexesMoving = [1, 5];
        const arrayOfBoxesIndexes = [0, 1, 4];
        this.levelConctructor(arrayOfBaloonsIndexesUnhidden, arrayOfBaloonsIndexesMoving, arrayOfBoxesIndexes);
        this.highlightsBoxes(0, [0, 1, 2], '<div class="small-box"></div>');
        this.highlightsBoxes(1, [4, 5, 6, 7], '<div class="big-box"></div>');
        this.highlightsBoxes(4, [8, 9, 10], '<div class="small-box"></div>');
        this.highlightsBaloons(0, 1, '<baloonblue class="baloon"/>');
        this.highlightsBaloons(1, 3, '<baloongreen class="baloon"/>');
        this.highlightsBaloons(2, 5, '<baloonorange class="baloon"/>');
        this.highlightsBaloons(3, 6, '<baloonpink/>');
        this.highlightsBaloons(4, 9, '<baloonred class="baloon"/>');
        this.highlightsBaloons(5, 11, '<baloonyellow class="baloon"/>');
        this.HTMLCodeListenerLevel10();
    }
    private HTMLCodeListenerLevel10(): void {
        this.HTMLcode.onmouseover = (e) => {
            const trget = e.target as HTMLElement;
            const codestringTarget = trget.closest('.hljs-tag');
            if (!codestringTarget) this.removeAllClasses();
            //                          FOR FIRST BALOON
            if (this.HTMLcode.children[1] === codestringTarget) {
                this.addedClassesForBaloons(1, 0, '<baloonblue class="baloon"/>');
            }
            //                          FOR SECOND BALOON
            if (this.HTMLcode.children[3] === codestringTarget) {
                this.addedClassesForBaloons(3, 1, '<baloongreen class="baloon"/>');
            }
            //                          FOR THIRD BALOON
            if (this.HTMLcode.children[5] === codestringTarget) {
                this.addedClassesForBaloons(5, 2, '<baloonorange class="baloon"/>');
            }
            //                          FOR FOURTH BALOON
            if (this.HTMLcode.children[6] === codestringTarget) {
                this.addedClassesForBaloons(6, 3, '<baloonpink/>');
            }
            //                          FOR FIFTH BALOON
            if (this.HTMLcode.children[9] === codestringTarget) {
                this.addedClassesForBaloons(9, 4, '<baloonred class="baloon"/>');
            }
            //                          FOR SIXTH BALOON
            if (this.HTMLcode.children[11] === codestringTarget) {
                this.addedClassesForBaloons(11, 5, '<baloonyellow class="baloon"/>');
            }
            //                          FOR FIRST BOX
            if (this.HTMLcode.children[0] === codestringTarget || this.HTMLcode.children[2] === codestringTarget) {
                this.addedClassesForBoxes([0, 1, 2], 0, '<div class="small-box"></div>');
            }
            //                          FOR SECOND BOX
            if (this.HTMLcode.children[4] === codestringTarget || this.HTMLcode.children[7] === codestringTarget) {
                this.addedClassesForBoxes([4, 5, 6, 7], 1, '<div class="big-box"></div>');
            }
            //                          FOR THIRD BOX
            if (this.HTMLcode.children[8] === codestringTarget || this.HTMLcode.children[10] === codestringTarget) {
                this.addedClassesForBoxes([8, 9, 10], 4, '<div class="small-box"></div>');
            }
        };
    }
    private highlightsBaloons(baloon: number, codestring: number, content: string): void {
        this.arrayOfBaloons[baloon].onmouseover = () => {
            const baloon_tag: HTMLElement = this.HTMLcode.children[codestring] as HTMLElement;
            baloon_tag.classList.add('hljs-tagHover');
            this.title.textContent = content;
            console.log('1');
        };
        this.arrayOfBaloons[baloon].onmouseout = () => {
            const baloon_tag: HTMLElement = this.HTMLcode.children[codestring] as HTMLElement;
            baloon_tag.classList.remove('hljs-tagHover');
        };
    }
    private highlightsBoxes(box: number, codeelements: number[], content: string): void {
        this.arrayOfBoxes[box].onmouseover = () => {
            const boxCodeElements: Element[] = [];
            codeelements.forEach((elem) => boxCodeElements.push(this.HTMLcode.children[elem]));
            boxCodeElements.forEach((item) => item.classList.add('hljs-tagHover'));
            this.title.textContent = content;
        };
        this.arrayOfBoxes[box].onmouseout = () => {
            const boxCodeElements: Element[] = [];
            codeelements.forEach((elem) => boxCodeElements.push(this.HTMLcode.children[elem]));
            boxCodeElements.forEach((item) => item.classList.remove('hljs-tagHover'));
        };
    }
    private addedClassesForBaloons(codeIndex: number, baloonIndex: number, titleContent: string): void {
        this.removeAllClasses();
        this.HTMLcode.children[codeIndex].classList.add('hljs-tagHover');
        this.arrayOfBaloons[baloonIndex].classList.add(`baloon_${baloonIndex + 1}-on-hover`);
        this.title.classList.add(`title_baloon-${baloonIndex + 1}`);
        if (titleContent) {
            this.title.textContent = titleContent;
        }
    }
    private addedClassesForBoxes(codeIndexes: number[], boxNumber: number, titleContent: string): void {
        this.removeAllClasses();
        codeIndexes.forEach((elem) => this.HTMLcode.children[elem].classList.add('hljs-tagHover'));
        this.arrayOfBoxes[boxNumber].classList.add(`box_${boxNumber + 1}-on-hover`);
        this.title.classList.add(`title_box-${boxNumber + 1}`);
        if (titleContent) this.title.textContent = titleContent;
    }
    private removeAllClasses(): void {
        for (const elem of this.HTMLcode.children) {
            elem.classList.remove('hljs-tagHover');
        }
        this.arrayOfBaloons.forEach((item, index) => {
            item.classList.remove(`baloon_${index + 1}-on-hover`);
        });
        this.arrayOfBoxes.forEach((item, index) => {
            item.classList.remove(`box_${index + 1}-on-hover`);
        });
        for (let i = 0; i < 6; i += 1) {
            this.title.classList.remove(`title_baloon-${i + 1}`);
            if (i < 5) {
                this.title.classList.remove(`title_box-${i + 1}`);
            }
        }
    }
}
