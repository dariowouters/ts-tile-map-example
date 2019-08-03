import { Map, View } from 'ol';
import { Tile } from 'ol/layer';
import { XYZ } from 'ol/source';
import { MousePosition } from 'ol/control';
import { createStringXY } from 'ol/coordinate';
import { Projection } from 'ol/proj';

import * as TileMapInfo from './tiles/TileMapInfo.json'; // This shouldn't be bundled as it won't update without building, but it's just an example project

const tsProjection = new Projection({ // https://stackoverflow.com/questions/47612523/how-to-configure-openlayers-for-a-flat-11-pixel-coordinate-system
    code: 'ZOOMIFY',
    units: 'pixels',
    extent: [
        TileMapInfo.x1, -TileMapInfo.y2, TileMapInfo.x2, -TileMapInfo.y1 // x1, -y2, x2, -y1 (reverse y direction)
    ]
})

const mousePosition = new MousePosition({
    coordinateFormat: createStringXY(0),
});

new Map({
    target: 'map',
    controls: [mousePosition],
    layers: [
        new Tile({
            source: new XYZ({
                url: './tiles/{z}/{x}/{y}.png',
                projection: tsProjection
            }),
        }),
    ],
    view: new View({
        center: [0, 0],
        zoom: 0,
        minZoom: 0,
        maxZoom: TileMapInfo.maxZoom,
        projection: tsProjection,
        extent: tsProjection.getExtent(),
    }),
});
