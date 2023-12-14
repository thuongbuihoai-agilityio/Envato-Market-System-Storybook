import { Suspense, lazy, memo } from 'react';
import { Box, Flex, Grid, GridItem, Spinner } from '@chakra-ui/react';
import areEqual from 'react-fast-compare';

// Components
import { TransactionTable } from '@app/components';

// HOCs
import {
  TWithTransaction,
  withErrorBoundary,
  withTransactions,
} from '@app/hocs';

// Lazy loading components
const CartPayment = lazy(() => import('@app/components/CartPayment'));
const BoxChat = lazy(() => import('@app/components/BoxChat'));

const History = ({
  searchTransactionValue,
  controlInputTransaction,
  onSearchTransaction,
}: TWithTransaction) => (
  <Grid
    bg="background.body.primary"
    py={12}
    px={{ base: 6, xl: 12 }}
    templateColumns={{ base: 'repeat(1, 1fr)', '2xl': 'repeat(4, 1fr)' }}
    display={{ sm: 'block', md: 'grid' }}
    gap={{ base: 0, '2xl': 12 }}
  >
    <GridItem colSpan={3}>
      <Box
        as="section"
        bgColor="background.component.primary"
        borderRadius={8}
        px={6}
        py={5}
      >
        <TransactionTable
          isTableHistory
          controlInputTransaction={controlInputTransaction}
          searchTransactionValue={searchTransactionValue}
          onSearchTransaction={onSearchTransaction}
        />
      </Box>
    </GridItem>
    <GridItem mt={{ base: 6, '2xl': 0 }}>
      <Flex direction={{ base: 'column', lg: 'row', xl: 'column' }} gap={6}>
        <Suspense fallback={<Spinner />}>
          <CartPayment />
          <BoxChat />
        </Suspense>
      </Flex>
    </GridItem>
  </Grid>
);

const HistoryPage = memo(
  withErrorBoundary(withTransactions(History)),
  areEqual,
);

export default HistoryPage;
