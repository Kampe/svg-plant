import { html } from "../util/util";
import { attributeSet, pathDescriptionSegment } from '../types';

interface PlantPotCfg {
    rimHeight: number,
    rimLipOuter: number,
    rimLipInner: number,
    bottom: number,
};

function plantPotSvg( pathAttr: attributeSet ): SVGElement {
    const baseCfg: PlantPotCfg = {
        rimHeight: 90,
        rimLipOuter: 2,
        rimLipInner: 7,
        bottom: 10
    };

    const sw = pathAttr ? ('stroke-width' in pathAttr ? pathAttr[ 'stroke-width' ] : 2) : false;
    if (sw) pathAttr[ 'stroke-width' ] = sw;

    const pad = sw && typeof sw == 'number' ? sw / 2 : 0;

    const getPoints = (cfg: PlantPotCfg): pathDescriptionSegment[] => {
        return [
            [ 'M', pad, pad ],
            [ 'L', 100-pad, pad ], // top line
            [ 'L', 100-pad - cfg.rimLipOuter, cfg.rimHeight ], // right side
            // [ 'L', 100-pad - cfg.rimLipInner, cfg.rimHeight ], // right inseam for lip
            [ 'L', 100-pad - cfg.bottom, 100-pad ], // bottom right corner
            [ 'L', pad+cfg.bottom, 100-pad ], // left side
            [ 'L', pad+cfg.rimLipOuter, cfg.rimHeight ], // left bottom verticle line
            //['L', pad + cfg.rimLipOuter, cfg.rimHeight], // left inseam for lip
            'Z',
        ];
    };

    if (!pathAttr) pathAttr = {};
    pathAttr.d = html.svg.compilePathDescription( getPoints( baseCfg ) );
    const path = html.svg.node( 'path', pathAttr );

    const svg = html.svg.root({
        class: 'svg-plant-pot',
        viewBox: '0 0 100 100',
        preserveAspectRatio: 'xMidYMax meet',
    });

    svg.appendChild( path );

    return svg;
};

export { plantPotSvg };