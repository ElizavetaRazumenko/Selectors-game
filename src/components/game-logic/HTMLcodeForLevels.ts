import { HTMLCodeObjectKeys } from '../../types/index';

export const HTMLcode: Record<HTMLCodeObjectKeys, string> = {
    '1': `<div class="big-box">
    <baloon/>
    <baloon/>
</div>`,
    '2': `<div class="big-box">
    <baloon type="moving"/>
    <baloon/>
    <baloon type="moving"/>
</div>`,
    '3': `<div class="big-box">
    <baloon/>
    <baloon/>
</div>`,
    '4': `<div class="big-box">
    <baloon class="baloon"/>
    <baloon/>
</div>
<div class="small-box">
    <baloon class="baloon"/>
</div>`,
    '5': `<baloon/>
<div class="big-box">
    <baloon/>
    <baloon class ="pink"/>
</div>
<div class="small-box">
    <baloon/>
</div>`,
    '6': `<div class="big-box">
    <baloon/>
    <baloon/>
    <baloon/>
    <baloon/>
</div>`,
    '7': `<baloon/>
<baloon/>
<baloon/>
<baloon/>
<baloon/>
<baloon/>`,
    '8': `<div class="small-box">
    <baloonblue type="baloonblue"/>
</div>
<div class="big-box">
    <baloongreen/>
    <baloonorange/>
    <baloonpink type="baloonpink"/>
</div>
<div class="small-box">
    <baloonyellow type="baloonyellow"/>
</div>`,
    '9': `<div class="small-box">
    <baloonblue type="bluebaloon"/>
</div>
<div class="big-box">
    <baloonorange/>
    <baloonpink type="pinkbaloon"/>
</div>
<div class="small-box">
    <baloonyellow type=yellowbaloon/>
</div>`,
    '10': `<div class="small-box">
    <baloonblue class="baloon"/>
</div>
<baloongreen class="baloon"/>
<div class="big-box">
    <baloonorange class="baloon"/>
    <baloonpink/>
</div>
<div class="small-box">
    <baloonred class="baloon"/>
</div>
<baloonyellow class="baloon"/>`,
};
