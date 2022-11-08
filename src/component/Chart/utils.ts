import { curveBumpX, line, scaleLinear, scaleTime } from 'd3';

import { GRAPH_HEIGHT, GRAPH_PADDING, TICK_LENGHT } from '../../config';
import {
  AxisParam,
  AxisParams,
  WeightChartData,
  WeightChartDimensions,
  WeightChartParams,
  WeightChartPoint,
  WeightChartScales,
} from '../../lib/chart';

export const getAxisParams = (data: WeightChartData): AxisParams => {
  const minDate = data[0].date;
  const maxDate = data[data.length - 1].date;

  const yMin = Math.min(...data.map(val => val.value));
  const yMax = Math.max(...data.map(val => val.value));

  const yAxis = getYAxis(yMin, yMax);

  return {
    x: {
      min: minDate,
      max: maxDate,
      ticks: data.map(d => new Date(d.date)),
    },
    y: {
      min: yAxis.min,
      max: yAxis.max,
      ticks: yAxis.ticks,
    },
  };
};

export const getScales = (
  dimensions: WeightChartDimensions,
  axisLimits: AxisParams,
): WeightChartScales => ({
  x: scaleTime()
    .domain([new Date(axisLimits.x.min), new Date(axisLimits.x.max)])
    .range([
      0,
      dimensions.graph.width -
        dimensions.curve.padding.left -
        dimensions.curve.padding.right,
    ]),
  y: scaleLinear()
    .domain([axisLimits.y.min, axisLimits.y.max])
    .range([
      dimensions.graph.height -
        dimensions.curve.padding.top -
        dimensions.curve.padding.bottom,
      0,
    ]),
});

export const makeGraph = (
  data: WeightChartData,
  scales: WeightChartScales,
): string | undefined => {
  const curvedLine = line<WeightChartPoint>()
    .x(d => scales.x(new Date(d.date)))
    .y(d => scales.y(d.value))
    .curve(curveBumpX)(data);

  return curvedLine!;
};

export const calculateDimensions = (
  width: number,
  height: number,
): WeightChartDimensions => ({
  tick: {
    length: TICK_LENGHT,
  },
  card: {
    height,
    width,
    padding: GRAPH_PADDING,
  },
  graph: {
    height: height - 2 * GRAPH_PADDING,
    width: width - 2 * GRAPH_PADDING,
  },
  curve: {
    padding: {
      top: 0,
      right: 30,
      bottom: 25,
      left: 50,
    },
  },
});

export const getLastWeight = (data: WeightChartData): undefined | number =>
  data.length === 0 ? undefined : data[data.length - 1].value;

export const getTicks = (min: number, max: number): number[] => {
  const { niceMax, niceMin, tickSpacing } = niceScale(min, max, 5);
  let ticks = [];
  let current = niceMin + tickSpacing;
  while (current < niceMax) {
    ticks.push(current);
    current = current + tickSpacing;
  }
  return ticks;
};

export const getYAxis = (min: number, max: number): AxisParam<number> => {
  const { niceMin, niceMax, tickSpacing } = niceScale(min, max, 5);
  let ticks = [];
  let current = niceMin + tickSpacing;
  while (current < niceMax) {
    ticks.push(current);
    current = current + tickSpacing;
  }
  return {
    min: niceMin,
    max: niceMax,
    ticks,
  };
};

// https://stackoverflow.com/a/16363437
export const niceScale = (
  minPoint: number,
  maxPoint: number,
  maxTicks = 10,
): {
  range: number;
  tickSpacing: number;
  niceMin: number;
  niceMax: number;
} => {
  const range = niceNum(maxPoint - minPoint, false);
  const tickSpacing = niceNum(range / (maxTicks - 1), true);
  const niceMin = Math.floor(minPoint / tickSpacing) * tickSpacing;
  const niceMax = Math.ceil(maxPoint / tickSpacing) * tickSpacing;
  return { range, tickSpacing, niceMin, niceMax };
};

const niceNum = (localRange: number, round: boolean): number => {
  let niceFraction: number;
  const exponent = Math.floor(Math.log10(localRange));
  const fraction = localRange / Math.pow(10, exponent);

  if (round) {
    if (fraction < 1.5) {
      niceFraction = 1;
    } else if (fraction < 3) {
      niceFraction = 2;
    } else if (fraction < 7) {
      niceFraction = 5;
    } else {
      niceFraction = 10;
    }
  } else {
    if (fraction <= 1) {
      niceFraction = 1;
    } else if (fraction <= 2) {
      niceFraction = 2;
    } else if (fraction <= 5) {
      niceFraction = 5;
    } else {
      niceFraction = 10;
    }
  }

  return niceFraction * Math.pow(10, exponent);
};

export const getWeightChartParams = (
  width: number,
  data: WeightChartData,
): WeightChartParams => {
  const dimensions = calculateDimensions(width, GRAPH_HEIGHT);
  const axisParams = getAxisParams(data);
  const scales = getScales(dimensions, axisParams);
  const curve = makeGraph(data, scales);

  return {
    dimensions,
    axisParams,
    scales,
    curve,
    data,
  };
};
