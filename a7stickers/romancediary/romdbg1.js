// romdbg1.js
// This script shall render SVG background for the sticker

const fs = require('fs');
const svgplotlib = require('../../svgplotlib.js');


// Orthodox safe colors
// const COLOR_1 = '#000000'; // black
// const COLOR_BG_1 = '#DDDDDD';
// const COLOR_BG_2 = '#F0F0F0';

// Experimenting
// const COLOR_1 = '#FFB400';
// const COLOR_BG_1 = '#FFD46C';
// const COLOR_BG_2 = '#FFEEC5';

// New colorful wall painting
// const COLOR_1 = '#cd922f';
const COLOR_1 = '#EEBB55';
// const COLOR_2 = '#FFEEA6'; // Sun filling
const COLOR_2 = '#FFF1C6'; // Sun filling
const COLOR_SUPER_COLD = '#142c44'; // Blue border
const COLOR_BG_1 = '#708280'; // Cool wall
const COLOR_BG_2 = '#798f89'; // Cold wall











let SVG_CONTENT_DEFS = '';
let SVG_CONTENT_INNER = '';













// Main background texture: under texture
let total_count = 180;
for (let itr = 0; itr < total_count; itr++) {
    let rotation_deg = itr * (360 / total_count);
    SVG_CONTENT_INNER += `<use transform="translate(0,-360) rotate(${rotation_deg})" href="#bgtexture-underoval1" />\n`;
}






let entropy_pool = JSON.parse(fs.readFileSync('a7stickers/romancediary/entropy_pool.json').toString());
let entropy_pool_ptr = 0;

// Main background texture: light beams
(function () {
    let total_count = 72;
    let tmpstr = '';
    for (let itr = 0; itr < total_count; itr++) {
        let rotation_deg = itr * (360 / total_count);
        let rand_arr = [];
        for (let i = 0; i < 16; i++) {
            rand_arr.push(entropy_pool[entropy_pool_ptr % entropy_pool.length]);
            entropy_pool_ptr += 1
        };
        let lm_toggle = true;
        let points = rand_arr.map(function (d) {
            lm_toggle = !lm_toggle;
            return ' 0,' + (60 + d * (lm_toggle ? 300 : 0)).toPrecision(4)
        }).reduce(function (str1, str2) {
            lm_toggle = !lm_toggle;
            return str1 + (lm_toggle ? ' m ' : ' l ') + str2;
        });
        const line_extra_steps = ` m 0,125
            ${itr % 2 === 0 ? '' : 'l0,0.1 m0,25  l0,0.1 m0,25  l0,0.1 m0,25'}
            M 0,294 `;
        const opacity = 1.0 - entropy_pool[itr * 4] * 0.25;
        tmpstr += `<path transform="translate(0,-360) rotate(${rotation_deg})" d="M 0,40 ${line_extra_steps} l ${points}"
            stroke="${COLOR_1}" stroke-width="11" stroke-linecap="round" opacity="${opacity}" />\n`;
    };
    SVG_CONTENT_DEFS += `<mask id="mask_gradient_whitefall">
        <rect x="-1000" y="-1000" width="2000" height="2000" fill="black" />
        <rect x="-1000" y="-1000" width="2000" height="2000" fill="url(#gradient_whitefall)" />
    </mask>\n`;
    SVG_CONTENT_INNER += `<g mask="url(#mask_gradient_whitefall)">${tmpstr}</g>\n`;
})();








// Mini reusable stars
SVG_CONTENT_DEFS += svgplotlib.drawstar({
    long: 15,
    short: 28,
    vert: 10,
    attrs: {
        'id': 'mini_reusable_star_c1',
        'stroke-linejoin': 'round',
        'fill': COLOR_2,
        // 'stroke': COLOR_1,
        'stroke': COLOR_SUPER_COLD,
        'stroke-width': '3',
    }
});
const mini_stars_count_per_ring = 16;
for (let itr = 0; itr < mini_stars_count_per_ring + 0; itr += 1) {
    let deg = itr / mini_stars_count_per_ring * 360;
    let angle_rad = Math.PI * 2 * (deg / 360);
    const length = 362;
    let xx = Math.cos(angle_rad) * length * 1.3;
    let yy = Math.sin(angle_rad) * length - 360;
    SVG_CONTENT_INNER += `<use href="#mini_reusable_star_c1" transform="translate(${xx},${yy})" />\n`;
}
for (let itr = 0.5; itr < mini_stars_count_per_ring + 0.5; itr += 1) {
    let deg = itr / mini_stars_count_per_ring * 360;
    let angle_rad = Math.PI * 2 * (deg / 360);
    const length = 532;
    let xx = Math.cos(angle_rad) * length * 1.4;
    let yy = Math.sin(angle_rad) * length - 360;
    SVG_CONTENT_INNER += `<use href="#mini_reusable_star_c1" transform="translate(${xx},${yy})" />\n`;
}







const subsize_long = 204;
const subsize_short = 126;


// The sun
SVG_CONTENT_INNER += svgplotlib.drawstar({
    // Blue border under it
    long: subsize_long + 90 + 6,
    short: subsize_short + 76 + 6,
    vert: 16,
    attrs: {
        'opacity': '1',
        'fill': 'none',
        'stroke': COLOR_SUPER_COLD,
        'stroke-width': '21',
        'transform': `translate(0,-360)`
    }
});
SVG_CONTENT_INNER += svgplotlib.drawstar({
    // This is the outer white ring
    long: subsize_long + 90,
    short: subsize_short + 76,
    vert: 16,
    attrs: {
        'opacity': '1',
        'fill': 'none',
        'stroke': COLOR_2,
        'stroke-width': '17',
        'transform': `translate(0,-360)`
    }
});





// Both blurry white zones for writing
SVG_CONTENT_INNER += `<ellipse filter="url(#blurMe)" id="u192361323" cx="600" cy="0" rx="240" ry="290" fill="${COLOR_2}" opacity="0.75" />\n`;
SVG_CONTENT_INNER += `<g transform="scale(-1,1)"><use href="#u192361323" /></g>\n`;






// Libra
SVG_CONTENT_INNER += `
<!-- Libra -->
<g>
    <path d="M 600,278 m -135,0 l 270,0     M 600,-294 l 0,-50.0 m -20,50 l 40,0" stroke="${COLOR_SUPER_COLD}" stroke-width="7" opacity="1" stroke-linejoin="round" stroke-linecap="round" />
    <path d="M -600,278 m -135,0 l 270,0    M -600,-294 l 0,-50.0 m -20,50 l 40,0" stroke="${COLOR_SUPER_COLD}" stroke-width="7" opacity="1" stroke-linejoin="round" stroke-linecap="round" />

    <rect x="-630" y="-390" width="${630 * 2}" height="60" fill="${COLOR_2}" stroke="${COLOR_SUPER_COLD}" stroke-width="7" stroke-linejoin="round" />
</g>\n`;




// Sun over Libra
SVG_CONTENT_INNER += svgplotlib.drawstar({
    // This is the dark outline
    long: subsize_long - 36,
    short: subsize_short - 31,
    vert: 16,
    attrs: {
        // 'stroke-linejoin': 'round',
        'fill': COLOR_SUPER_COLD,
        'stroke': COLOR_SUPER_COLD,
        'stroke-width': '22',
        'transform': `translate(0,-360)`
    }
});
SVG_CONTENT_INNER += svgplotlib.drawstar({
    // This is a 4-corner star
    short: subsize_long - 41,
    long: subsize_short - 55,
    vert: 8,
    attrs: {
        // 'stroke-linejoin': 'round',
        'fill': COLOR_2,
        'stroke': COLOR_1,
        'stroke-width': '10',
        'transform': `translate(0,-360)`
    }
});
SVG_CONTENT_INNER += svgplotlib.drawstar({
    // This is a 4-corner star
    long: subsize_long - 41,
    short: subsize_short - 55,
    vert: 8,
    attrs: {
        // 'stroke-linejoin': 'round',
        'fill': COLOR_2,
        'stroke': COLOR_1,
        'stroke-width': '10',
        'transform': `translate(0,-360)`
    }
});





// Central big text (paused)
['MOMENT', 'OF', 'ROMANCE'].forEach(function (str, index) {
    let shared_attrs = ` x="0"  stroke-linejoin="round"
        text-anchor="middle" font-family="Inter Tight SemiBold"
        font-size="63" transform="scale(1,1.3)" `;
    // SVG_CONTENT_INNER += `<text y="${index * 59 + 91.5}" fill="${COLOR_SUPER_COLD}" stroke="${COLOR_SUPER_COLD}" stroke-width="4" ${shared_attrs} >${str}</text>\n`;
    // SVG_CONTENT_INNER += `<text y="${index * 59 + 90}" fill="${COLOR_2}" stroke="${COLOR_2}" stroke-width="0" ${shared_attrs} >${str}</text>\n`;
});


// Bottom small text
SVG_CONTENT_INNER += `<text
        x="0" y="568" stroke-linejoin="round"
        text-anchor="middle" font-family="Inter Tight SemiBold" letter-spacing="0" opacity="0.5"
        font-size="32.5" fill="${COLOR_SUPER_COLD}" stroke="${COLOR_SUPER_COLD}" stroke-width="0" transform="scale(1,1)"
>${
    // (new Array(4).fill(`MOMENT OF ROMANCE`)
    (new Array(3).fill(`Verweile doch du bist so schön`.toUpperCase())
).join(' * ')}</text>\n`;



// Libra golden text
for (let polarity = -1; polarity <= 1; polarity += 2) {
    SVG_CONTENT_INNER += `<text
        x="${polarity * 614}" y="-346" stroke-linejoin="round"
        text-anchor="${polarity < 0 ? 'begin' : 'end'}" font-family="Inter Tight Black"
        font-size="36" fill="${COLOR_1}" stroke="${COLOR_1}" stroke-width="0" transform="scale(1,1)"
    >MOMENT OF ROMANCE</text>\n`;
};









const safe_margin_px = 126; // 6.6mm (126px) from 105mm (2000px) width
let OUTPUT_TEMPLATE = `<svg viewBox="-1000 -707 2000 1404" fill="none" xmlns="http://www.w3.org/2000/svg">
<defs>
    <linearGradient id="gradient_whitefall" gradientTransform="rotate(90)">
        <stop offset="51%" stop-color="white" />
        <stop offset="77%" stop-color="white" stop-opacity="0.05" />
    </linearGradient>
    <path id="libra_c_89e968097189" d="M 140 0 c 0 33 -50 66 -140 66 c -90 0 -140 -33 -140 -66"
        stroke="${COLOR_1}" stroke-width="12" opacity="0"
        stroke-linejoin="round" stroke-linecap="round" />
    <filter id="blurMe">
        <feGaussianBlur in="SourceGraphic" stdDeviation="37" />
    </filter>
    <rect id="contentboxsizer" x="-${1000 - safe_margin_px}" y="-${707 - safe_margin_px}"
    width="${(1000 - safe_margin_px) * 2}" height="${(707 - safe_margin_px) * 2}"  />
    <mask id="contentboxmask">
        <use href="#contentboxsizer" fill="white" />
    </mask>
    <ellipse id="bgtexture-underoval1" cx="0" cy="660" rx="950" ry="660" stroke="${COLOR_BG_1}" stroke-width="4"  />
    ${SVG_CONTENT_DEFS}
</defs>


<rect x="-1000" y="-707" width="2000" height="1404" fill="#FAFAFA" opacity="0.01" />
<rect x="-1000" y="-707" width="2000" height="1404" fill="none" mask="url(#contentboxmask)" />





<g mask="url(#contentboxmask)">
    <use href="#contentboxsizer" fill="${COLOR_BG_2}" stroke="none" />
    ${SVG_CONTENT_INNER}
</g>





<use href="#contentboxsizer" fill="none" stroke="${COLOR_SUPER_COLD}" stroke-width="14"  />

</svg>`;





fs.writeFileSync('a7stickers/romancediary/romdbg1.svg', OUTPUT_TEMPLATE);






/*

Build command:
rsvg-convert a7stickers/romancediary/romdbg1.svg -z1 -o a7stickers/romancediary/romdbg1.png

*/
