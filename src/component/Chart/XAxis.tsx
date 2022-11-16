import dayjs from 'dayjs';
import React, { FC } from 'react';
import Svg, { G, Line, Text as SVGText } from 'react-native-svg';

import {
  AxisParam,
  WeightChartDimensions,
  WeightChartScaleX,
} from '../../lib/chart';

type XAxisProps = {
  axisParam: AxisParam<Date>;
  scale: WeightChartScaleX;
  dimensions: WeightChartDimensions;
};

export const XAxis: FC<XAxisProps> = ({ axisParam, scale, dimensions }) => {
  const { ticks } = axisParam;

  return (
    <Svg>
      <Line
        x1={dimensions.curve.padding.left}
        y1={dimensions.graph.height - dimensions.curve.padding.bottom}
        x2={dimensions.graph.width - dimensions.curve.padding.right}
        y2={dimensions.graph.height - dimensions.curve.padding.bottom}
        key={'axisLine'}
        stroke="#000000"
        strokeWidth="1"
      />
      {ticks.map((tick: Date, i: number) => (
        <G key={'tickAndKeyY' + i}>
          <SVGText
            stroke={'#000000'}
            strokeWidth="1"
            textAnchor={'middle'}
            alignmentBaseline={'hanging'}
            x={scale(tick) + dimensions.curve.padding.left}
            y={dimensions.graph.height - dimensions.curve.padding.bottom + 10}>
            {dayjs(tick).format('dd')}
          </SVGText>
          <Line
            x1={scale(tick) + dimensions.curve.padding.left}
            y1={
              dimensions.graph.height -
              dimensions.curve.padding.bottom -
              dimensions.tick.length / 2
            }
            x2={scale(tick) + dimensions.curve.padding.left}
            y2={
              dimensions.graph.height -
              dimensions.curve.padding.bottom +
              dimensions.tick.length / 2
            }
            stroke={'#000000'}
            strokeWidth="1"
          />
        </G>
      ))}
    </Svg>
  );
};
