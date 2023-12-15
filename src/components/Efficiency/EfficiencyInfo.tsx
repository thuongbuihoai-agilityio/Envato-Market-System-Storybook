import { memo } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import Chart from 'react-apexcharts';

// Components
import Statistical from './Statistical';

// Constants
import { STROKE_COLORS } from '@app/constants';

// Icons
import { Sort } from '@app/assets/icons';

// Types
import { IEfficiency } from '@app/interfaces';

const EfficiencyComponent = ({
  statistical,
  arrival,
  spending,
}: IEfficiency): JSX.Element => (
  <Box py={4} px={5}>
    <Flex justifyContent="space-between" mb={4}>
      <Chart
        options={{
          plotOptions: {
            pie: {
              donut: {
                size: '45%',
              },
            },
          },
          legend: {
            show: false,
          },

          annotations: {},
          colors: STROKE_COLORS,
          dataLabels: {
            enabled: true,
            formatter: (val) => val + '%',
          },
          tooltip: {
            custom: function ({ series, seriesIndex }) {
              return `<div style="padding: 10px; background-color: #000" >
            <span>
            ${statistical[seriesIndex].title}: ${series[seriesIndex]}
            </span>
            </div>`;
            },
          },
        }}
        series={statistical.map((item) => item.value)}
        type="donut"
        width="200"
      />
      <Box>
        <Box mb={6}>
          <Flex alignItems="center" gap={1}>
            <Text variant="textLg" color="primary.500">
              ${arrival}
            </Text>
            <Sort />
          </Flex>
          <Text variant="textMd" color="secondary.450">
            Arrival
          </Text>
        </Box>
        <Box>
          <Flex alignItems="center" gap={1}>
            <Text variant="textLg">${spending}</Text>
            <Sort color="#1a202c" />
          </Flex>

          <Text variant="textMd" color="text.secondary">
            Spending
          </Text>
        </Box>
      </Box>
    </Flex>
    <Flex flexDirection="column" gap={1.5}>
      {statistical.map((item, index) => (
        <Statistical key={item.title} {...item} color={STROKE_COLORS[index]} />
      ))}
    </Flex>
  </Box>
);

const EfficiencyInfo = memo(EfficiencyComponent);

export default EfficiencyInfo;