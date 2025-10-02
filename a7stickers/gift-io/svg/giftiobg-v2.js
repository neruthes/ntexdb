const fs = require('fs');


// Random number generator
function makePRNG(seed) {
    return function () {
        seed = (seed * 1664525 + 1013904223) % 4294967296;
        return seed / 4294967296;
    };
}
const get_random = makePRNG(114514 + 1919810);




const CANVAS_EXTENTS = { x: 707, y: 1000 };

const COLORS = {
    main_stroke: '#232735',
    deco1: '#002042',
    green_dark: '#003015',
}


let SVG_DEFS = '';
let SVG_CONTENT_OUTER = '';
let SVG_CONTENT_INNER = '';
let SVG_CONTENT_OVER = '';

let title_text_attrs = `
    text-anchor="middle"
    font-family="Geist"
    font-weight="600"
    font-size="132"
    stroke-linejoin="round"
    transform="scale(0.88,1)"
`;
SVG_CONTENT_OVER += `
<g id="title_text_main">
    <text x="0" y="-680" ${title_text_attrs}>RECEIPT FOR</text>
    <text x="0" y="-530" ${title_text_attrs}>DONATION &amp; GIFT</text>
</g>
<use href="#title_text_main" fill="${COLORS.green_dark}" stroke="${COLORS.green_dark}" stroke-width="33" transform="translate(0,3)" />
<use href="#title_text_main" fill="white" stroke="white" stroke-width="22" transform="translate(0,2)" />
<use href="#title_text_main" fill="${COLORS.green_dark}" stroke="${COLORS.green_dark}" stroke-width="3" />
`;



SVG_CONTENT_OVER += `
<g>
    <path d="
        M -1 -900 L 527 -900 Q 527 -820 607 -820 L 607 1
    "
    id="uuid_094215fb9b0f4abba7971124139468a0"
    fill="none" stroke-width="5" stroke="${COLORS.deco1}" opacity="1" />
    <use href="#uuid_094215fb9b0f4abba7971124139468a0" transform="scale(-1,-1)" />
    <use href="#uuid_094215fb9b0f4abba7971124139468a0" transform="scale(1,-1)" />
    <use href="#uuid_094215fb9b0f4abba7971124139468a0" transform="scale(-1,1)" />
</g>
`;



SVG_CONTENT_OVER += (function () {
    let tmpstr = '';
    for (let itr = -1; itr <= 1; itr++) {
        tmpstr += `<g transform="translate(${itr * 200}, -440)">
            <path d="M 0,25 25,0 0,-25 -25,0" fill="${COLORS.deco1}" />
            <path d="M -100,0 L -44,0 0,44 44,0 100,0" fill="none" stroke="${COLORS.deco1}" stroke-width="6" />
        </g>\n`;
    };
    tmpstr += `<g transform="translate(0, -440)">
        <path d="M -290,0 l -140,0      M 290,0 l 140,0" fill="none" stroke="${COLORS.deco1}" stroke-width="6" />
    </g>\n`;
    return tmpstr;
})();






// Background pattern
let tmpstr_bp = '';
for (let itr_x = 0; itr_x < 144; itr_x++) {
    for (let itr_y = 0; itr_y < 144; itr_y++) {
        let xx = itr_x * 19 - 800;
        let yy = itr_y * 26 + itr_x * 5 - 1900;
        let uv = [xx / 2100, yy / 2970];
        yy += Math.sin(12 * uv[0]) * 11;
        xx += Math.sin(30 * uv[1]) * 33;
        let min_threshold_y = -1300;
        if (xx < 1400 && yy < 2100 && yy > min_threshold_y) {
            tmpstr_bp += ` M ${xx.toFixed(1)},${yy.toFixed(2)}  l 15,15 -38,10   \n`;
        }
    };
};
SVG_CONTENT_INNER += `<path d="${tmpstr_bp}" fill="none" stroke="#11664420" stroke-width="3" transform="scale(1.6)" />\n`;



SVG_DEFS += `<mask id="ONLY_RIGHT_HALF">
    <rect x="-1" y="-3000" width="3000" height="6000" fill="white" />
</mask>
`;
// SVG_CONTENT_INNER += `<g transform="translate(0,-510)">
//     <g id="inner_spiral_side" mask="url(#ONLY_RIGHT_HALF)">
//         ${(function () {
//         let tmpstr = '';
//         for (let round = 8; round > 0; round--) {
//             const total_steps = 24 + 8 * round;
//             for (let step = 0; step < total_steps * 0.6; step++) {
//                 const degree = (step / total_steps * 360).toFixed(3);
//                 const opacity = 1 - round * 0.1;
//                 let main_offset = (round * 150 + 40) + Math.cos(0.35 + round + 6 * (step / total_steps) * (Math.PI * 2)) * 22;
//                 tmpstr += `<path d="
//                         M 0,-${main_offset.toFixed(2)}
//                         l ${18 * (2.5 - 0.2 * round)} -${70 * (1.5 - 0.12 * round)}
//                         l -${33 * (1 + 0.05 * round)} -${20 * (1 + 0.2 * round)} z
//                     " fill="#FFFFFF" stroke="#ddeedd" stroke-width="5" stroke-linejoin="round"
//                     transform="rotate(${degree})" />\n`;
//             };
//         };
//         return tmpstr;
//     })()}
//     </g>
//     <use href="#inner_spiral_side" transform="rotate(180)" />
// </g>
// `;




const SIZE_HINT_OPACITY = 0;


let SVG_OUTPUT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-707 -1000 1414 2000">
    <!-- Background -->
    <rect x="-707" y="-1000" width="1414" height="2000" fill="#BBBBBB11" stroke-width="0" stroke="blue" opacity="${SIZE_HINT_OPACITY}" />

    <defs>        
        ${SVG_DEFS}
        <mask id="mask_inner_aera">
            <rect x="-${(CANVAS_EXTENTS.x - 160.00)}" y="-${(CANVAS_EXTENTS.y - 160.00)}" width="${(CANVAS_EXTENTS.x - 160.00) * 2}" height="${(CANVAS_EXTENTS.y - 160.00) * 2}" fill="white" opacity="1" />
        </mask>
    </defs>

    
    
    <g transform="translate(0,0)">
        ${SVG_CONTENT_OUTER}
        <g mask="url(#mask_inner_aera)">
            ${SVG_CONTENT_INNER}
        </g>

        <rect x="-${(CANVAS_EXTENTS.x - 115.00)}" y="-${(CANVAS_EXTENTS.y - 115.00)}" width="${(CANVAS_EXTENTS.x - 115.00) * 2}" height="${(CANVAS_EXTENTS.y - 115.00) * 2}" fill="none" stroke-width="5" stroke="${COLORS.deco1}" opacity="1" />
        <rect x="-${(CANVAS_EXTENTS.x - 130.00)}" y="-${(CANVAS_EXTENTS.y - 130.00)}" width="${(CANVAS_EXTENTS.x - 130.00) * 2}" height="${(CANVAS_EXTENTS.y - 130.00) * 2}" fill="none" stroke-width="5" stroke="${COLORS.deco1}" opacity="1" />

        ${SVG_CONTENT_OVER}
    </g>
    
    
</svg>
`;




fs.writeFileSync(process.argv[1] + `.svg`, SVG_OUTPUT);

/*
    node a7stickers/gift-io/svg/giftiobg-v2.js; rsvg-convert a7stickers/gift-io/svg/giftiobg-v2.js.svg -z2 -o a7stickers/gift-io/svg/giftiobg-v2.js.svg.png
*/

