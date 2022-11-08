import React, { FC } from 'react';
import { G, Line, Text as SVGText } from 'react-native-svg';

import {
  AxisParam,
  WeightChartDimensions,
  WeightChartScaleY,
} from '../../lib/chart';

type YAxisProps = {
  axisParam: AxisParam<number>;
  scale: WeightChartScaleY;
  dimensions: WeightChartDimensions;
  line: boolean;
};

export const YAxis: FC<YAxisProps> = ({
  axisParam,
  scale,
  dimensions,
  line,
}) => {
  const { min, max, ticks } = axisParam;

  return (
    <>
      {line && (
        <Line
          x1={dimensions.curve.padding.left}
          y1={scale(min)}
          x2={dimensions.curve.padding.left}
          y2={scale(max)}
          stroke="#000000"
          strokeWidth="1"
        />
      )}
      {ticks.map((t, i) => (
        <G key={'tickAndTextY' + i}>
          <SVGText
            stroke={'#000000'}
            strokeWidth="1"
            textAnchor={'end'}
            alignmentBaseline={'middle'}
            x={dimensions.curve.padding.left - 6}
            y={scale(t)}>
            {t.toFixed(2)}
          </SVGText>
          <Line
            x1={dimensions.curve.padding.left}
            y1={scale(t)}
            x2={dimensions.graph.width - dimensions.curve.padding.right}
            y2={scale(t)}
            stroke={'#d7d7d7'}
            strokeWidth="1"
          />
        </G>
      ))}
    </>
  );
};
