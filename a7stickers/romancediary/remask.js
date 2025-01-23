// remask.js

// This script shall produce a inverted masked svg from given path


const fs = require('fs');

let figmapath = process.env.figmapath || 'a7stickers/romancediary/figma/icon-grail.svg';

let OUTPUT_TEMPLATE = `<svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
<defs>
    <mask id="mymask1">
    // ${fs.readFileSync(figmapath).toString()}
    </mask>
</defs>
<rect fill="black" x="0" y="0" width="400" height="400" mask="url(#mymask1)" />
</svg>`;


fs.writeFileSync(process.env.remaskedpath, OUTPUT_TEMPLATE);
