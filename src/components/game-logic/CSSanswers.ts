import { CSSarwersKeys } from '../../types/index';

export const CSSselectors: Record<CSSarwersKeys, string[]> = {
    '1': ['baloon', '.big-boxbaloon', '.big-box>baloon'],
    '2': ['[type]', '[type="moving"]', '.big-box[type]', '.big-box[type="moving"]', '.big-box>[type="moving"]'],
    '3': ['.big-box:last-child', '.big-box:nth-child(2)', '.big-box:nth-last-child(1)'],
    '4': ['.baloon', '.big-box.baloon, .small-box .baloon', '.big-box>.baloon, .small-box>.baloon'],
    '5': ['baloon:not(.pink)', 'ballon:not(.big-box:lastchild)'],
    '6': ['.big-box:nth-child(2),.big-box:nth-child(4)', '.big-box:nth-last-child(1), .big-box:nth-last-child(3)'],
    '7': ['*', 'baloon'],
    '8': ['[type^="baloon"]', '[type^="baloo"]', '[type^="balo"]', '[type^="bal"]', '[type^="ba"]', '[type^="b"]'],
    '9': ['[type$="ballon"]', '[type$="allon"]', '[type$="llon"]', '[type$="lon"]', '[type$="on"]', '[type$="n"]'],
    '10': ['.small-box+.baloon'],
};
