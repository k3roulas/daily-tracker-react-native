import { ScaleLinear, ScaleTime } from 'd3';

export type WeightChartPoint = {
  date: Date;
  value: number;
};

export type WeightChartData = WeightChartPoint[];

export type WeightChartDimensions = {
  tick: {
    length: number;
  };
  card: {
    height: number;
    width: number;
    padding: number;
  };
  graph: {
    height: number;
    width: number;
  };
  curve: {
    padding: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
  };
};

export type AxisParam<T> = {
  min: T;
  max: T;
  ticks: T[];
};

export type AxisParams = {
  x: AxisParam<Date>;
  y: AxisParam<number>;
};

export type WeightChartScaleX = ScaleTime<number, number>;
export type WeightChartScaleY = ScaleLinear<number, number>;

export type WeightChartScales = {
  x: WeightChartScaleX;
  y: WeightChartScaleY;
};

export type WeightChartParams = {
  dimensions: WeightChartDimensions;
  axisParams: AxisParams;
  scales: WeightChartScales;
  curve: string | undefined;
  data: WeightChartData;
};
