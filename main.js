const tileLayer = new deck.TileLayer({
  data: "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
  minZoom: 0,
  maxZoom: 19,
  tileSize: 256,
  renderSubLayers: props => new deck.BitmapLayer(props, {
    data: null,
    image: props.data,
    bounds: (({ west, south, east, north }) => [west, south, east, north])(props.tile.bbox),
  }),
});

const data = [
  {p: [141.3521727, 43.0620842], v: 1952356}, // sapporo
  {p: [140.8677736, 38.2686018], v: 1082159}, // sendai
  {p: [139.5196066, 35.4937089], v: 3724844}, // yokohama
  {p: [136.9043778, 35.1814347], v: 2295638}, // nagoya
  {p: [135.7696242, 35.0118413], v: 1475183}, // kyouto
  {p: [135.5023064, 34.6936616], v: 2691185}, // oosaka
  {p: [135.1959010, 34.6894819], v: 1537272}, // koube
  {p: [132.4556497, 34.3849809], v: 1194034}, // hiroshima
  {p: [130.4017854, 33.5902214], v: 1538681}, // fukuoka
];

const scatterplotLayer = new deck.ScatterplotLayer({
  data,
  opacity: 0.5,
  getPosition : ({p}) => p,
  getRadius   : ({v}) => Math.sqrt(v) * 12,
  getFillColor: ({v}) => [Math.sqrt(v) / 10, 20, 60],
});

const deckgl = new deck.Deck({
  initialViewState: {
    longitude: 137,
    latitude: 37,
    zoom: 5,
    minZoom: 2,
    maxZoom: 8,
    pitch: 30,
    bearing: 10,
  },
  controller: true,
  layers: [
    tileLayer,
    scatterplotLayer,
  ]
});
