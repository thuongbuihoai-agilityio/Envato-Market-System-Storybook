import { memo, useCallback } from 'react';
import isEqual from 'react-fast-compare';

// Components
import Chart from 'react-apexcharts';
import {
  Box,
  Flex,
  Heading,
  Skeleton,
  Text,
  theme,
  useColorModeValue,
} from '@chakra-ui/react';
import { Select } from '..';

// Icon
import { Arrow } from '@assets/icons';

// Constants
import {
  EFFICIENCY_OPTIONS,
  REVENUE_FLOW_COLORS,
  REVENUE_FLOW_STATUS,
} from '@constants/index';

// Types
import { IRevenueFlow } from '@interfaces/index';
import { TOption } from '@components/common/Select';

interface OverallBalanceProps {
  total: number;
  growth: number;
  data: IRevenueFlow[];
  isLoading?: boolean;
}

const OverallBalanceComponent = ({
  data,
  total,
  growth,
  isLoading = false,
}: OverallBalanceProps) => {
  const colorFill = useColorModeValue(
    theme.colors.gray[800],
    theme.colors.white,
  );

  const renderTitle = useCallback(
    ({ label }: TOption) => (
      <Flex alignItems="center">
        <Text>{label}</Text>
        <Arrow color={colorFill} />
      </Flex>
    ),
    [colorFill],
  );

  const handleChangeSelect = useCallback(() => {
    // TODO: Update later
  }, []);

  if (isLoading)
    return (
      <Skeleton bg="background.component.primary" rounded="lg" height={360} />
    );

  return (
    <Box py={3} px={6} bg="background.component.primary" rounded="lg">
      <Flex
        py={4}
        px={5}
        borderBottom="1px"
        borderColor="border.primary"
        justifyContent="space-between"
      >
        <Box>
          <Text variant="textSm">Overall Balance</Text>
          <Flex align="center" gap={2}>
            <Heading variant="heading2Xl" as="h3">
              ${total}
            </Heading>
            <Text color="primary.500">{growth}%</Text>
          </Flex>
        </Box>
        <Flex gap={7} display={{ base: 'none', lg: 'flex' }}>
          {REVENUE_FLOW_STATUS.map((item, index) => (
            <Flex key={item} gap={2} alignItems="center">
              <Box
                bgColor={REVENUE_FLOW_COLORS[index]}
                w="12px"
                height="12px"
                rounded="50%"
              />
              <Text variant="textSm">{item}</Text>
            </Flex>
          ))}
        </Flex>
        <Box w={110} h="21px">
          <Select
            options={EFFICIENCY_OPTIONS}
            variant="no-border"
            renderTitle={renderTitle}
            onSelect={handleChangeSelect}
          />
        </Box>
      </Flex>
      <Chart
        options={{
          chart: {
            stacked: true,
            toolbar: {
              show: false,
            },
          },
          xaxis: {
            categories: data.map((item) => item.month),
            axisTicks: {
              show: false,
            },
          },
          legend: {
            show: false,
          },
          colors: REVENUE_FLOW_COLORS,
          dataLabels: {
            enabled: false,
          },
        }}
        series={[
          { data: data.map((item) => item.pending) },
          { data: data.map((item) => item.signed) },
          { data: data.map((item) => item.lost) },
        ]}
        type="area"
        height="260"
      />
    </Box>
  );
};

const OverallBalance = memo(OverallBalanceComponent, isEqual);

export default OverallBalance;
