const fs = require('fs');

const CANVAS_EXTENTS = { x: 707, y: 1000 };

const COLORS = {
    // main_stroke: '#777777',
    main_stroke: '#232735',
}


let SVG_DEFS = '';
let SVG_CONTENT = '';

// SVG_CONTENT += `<circle cx="0" cy="0" r="5" />`; // Coordinates anchor

SVG_CONTENT += `<path id="deco_columns_right" d="
    M -1,-${CANVAS_EXTENTS.y - 150.00}
    L ${CANVAS_EXTENTS.x - 150.00},-${CANVAS_EXTENTS.y - 150.00}
    M ${CANVAS_EXTENTS.x - 150.00},-${CANVAS_EXTENTS.y - 150.00}  l 0,${920 + 740 - 150.00}
    M ${CANVAS_EXTENTS.x - 150.00 - 40 * 1},-${CANVAS_EXTENTS.y - 740}  l 0,920
    M ${CANVAS_EXTENTS.x - 150.00 - 40 * 2},-${CANVAS_EXTENTS.y - 740}  l 0,920
    M ${CANVAS_EXTENTS.x - 150.00 - 40 * 3},-${CANVAS_EXTENTS.y - 740}  l 0,920
    M ${CANVAS_EXTENTS.x - 150.00 - 40 * 4},-${CANVAS_EXTENTS.y - 740}  l 0,920
    
    M ${CANVAS_EXTENTS.x - 150.00 - 40 * 4},-${CANVAS_EXTENTS.y - 740}
    
    q 0 -397 -397 -397 l -1,0

    M ${CANVAS_EXTENTS.x - 150.00 + 30},${CANVAS_EXTENTS.y-150.00} l -220,0 0,-190 220,0 z
" stroke-width="6" stroke="${COLORS.main_stroke}" fill="none" />`; // Coordinates anchor
// Shall we use q or c?
// c 0,-198.5 -198.5,-397 -397,-397
// q 0 -397 -397 -397


SVG_CONTENT += `<use href="#deco_columns_right" transform="scale(-1,1)" />`;


// Top cap
SVG_CONTENT += `<rect x="-${CANVAS_EXTENTS.x - 150 + 30}" y="-${CANVAS_EXTENTS.y - 90}"
width="${2*(CANVAS_EXTENTS.x - 150 + 30)}" height="200"
stroke-width="6" stroke="${COLORS.main_stroke}" fill="white" />`


let SVG_OUTPUT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-707 -1000 1414 2000">
    <!-- Background -->
    <rect x="-707" y="-1000" width="1414" height="2000" fill="#BBBBBB11" stroke-width="0" stroke="blue" opacity="0" />

    <defs>        
        ${SVG_DEFS}
    </defs>

    <g transform="translate(0,40)">
    ${SVG_CONTENT}
    </g>
    
    
</svg>
`;




fs.writeFileSync(process.argv[1] + `.svg`, SVG_OUTPUT);

/*
    node a7stickers/gift-io/svg/giftiobg.js; rsvg-convert a7stickers/gift-io/svg/giftiobg.js.svg --format=pdf -w3000 -o a7stickers/gift-io/svg/giftiobg.js.svg.pdf
*/
