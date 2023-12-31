import { lazy, memo } from 'react';
import isEqual from 'react-fast-compare';
import { Box, Grid, GridItem, Stack } from '@chakra-ui/react';

// Components
import { Fetching, Lazy } from '@app/components';

// Hooks
import { useGetMultipleStatistics } from '@app/hooks';

// HOCs
import { withErrorBoundary } from '@app/hocs/withErrorBoundary';

// Constants
import { END_POINTS } from '@app/constants';

// Types
import { ISpendingStatistics, IRevenueFlow } from '@app/interfaces';
import { UseQueryResult } from '@tanstack/react-query';

// Lazy load components
const CardPayment = lazy(() => import('@app/components/CardPayment'));
const BoxChat = lazy(() => import('@app/components/BoxChat'));
const TotalList = lazy(() => import('@app/components/TotalList'));
const RevenueFlow = lazy(() => import('@app/components/RevenueFlow'));
const Efficiency = lazy(() => import('@app/components/Efficiency'));
const TransactionTable = lazy(() => import('@app/components/TransactionTable'));

const Dashboard = () => {
  const [totalStatistic, revenueFlow] = useGetMultipleStatistics<
    ISpendingStatistics[] | IRevenueFlow[]
  >([END_POINTS.STATISTICS, END_POINTS.REVENUE]);

  const {
    data: totalStatisticData,
    isLoading: isLoadingTotalList,
    isError: isErrorTotalList,
  } = totalStatistic as UseQueryResult<ISpendingStatistics[]>;

  const {
    data: revenueFlowData,
    isLoading: isLoadingRevenueFlow,
    isError: isErrorRevenueFlow,
  } = revenueFlow as UseQueryResult<IRevenueFlow[]>;

  return (
    <>
      <Grid
        display={{ sm: 'block', md: 'grid' }}
        bg="background.body.primary"
        p={{ base: 6, xl: 12 }}
        templateColumns={{ base: 'repeat(1, 1fr)', '5xl': 'repeat(4, 1fr)' }}
        gap={0}
      >
        <GridItem colSpan={3}>
          <Fetching
            isError={isErrorTotalList}
            errorMessage="Total statistic data error"
          >
            <Lazy>
              <TotalList
                spendingStatistics={totalStatisticData}
                isLoading={isLoadingTotalList}
              />
            </Lazy>
          </Fetching>

          <Grid
            templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }}
            mt={6}
            gap={6}
          >
            <GridItem colSpan={{ base: 3, xl: 2 }}>
              <Fetching
                isLoading={isLoadingRevenueFlow}
                isError={isErrorRevenueFlow}
                errorMessage="Revenue flow data error"
                variant="secondary"
                size="md"
              >
                <Lazy>
                  <RevenueFlow data={revenueFlowData} />
                </Lazy>
              </Fetching>
            </GridItem>
            <GridItem display={{ base: 'none', xl: 'block' }}>
              <Lazy>
                <Efficiency />
              </Lazy>
            </GridItem>
          </Grid>

          {/* Transactions table */}
          <Box
            mt={6}
            as="section"
            bgColor="background.component.primary"
            borderRadius={8}
            px={6}
            py={5}
          >
            <TransactionTable isOpenModal />
          </Box>
        </GridItem>
        <GridItem mt={{ base: 6, '5xl': 0 }} ml={{ '5xl': 12 }}>
          <Stack
            direction={{ base: 'column', lg: 'row', '2xl': 'column' }}
            spacing={{ base: 6, lg: 0 }}
          >
            <Box w="full">
              <Lazy>
                <CardPayment />
              </Lazy>
            </Box>

            <Box
              w="full"
              mt={{ base: 6, md: 0, '2xl': 6 }}
              ml={{ lg: 6, '2xl': 0 }}
            >
              <Lazy>
                <BoxChat />
              </Lazy>
            </Box>
          </Stack>
        </GridItem>
      </Grid>
    </>
  );
};

const DashboardPage = memo(withErrorBoundary(Dashboard), isEqual);

export default DashboardPage;
