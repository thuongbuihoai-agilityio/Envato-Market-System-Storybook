import { memo, useCallback, useEffect, useState } from 'react';

// Components
import { Box, Flex, Text, theme } from '@chakra-ui/react';
import { Button, Select } from '@app/components';

// Assets
import { Arrow } from '@app/components/Icons';

// Constants
import { PAGE_SIZE, PAGINATION } from '@app/constants/pagination';

// Interfaces
import { TOption } from '@app/components/common/Select';
import { PaginationType } from '@app/interfaces/pagination';

// Utils
import { formatNumberButton, formatPagination } from '@app/utils/helpers';

interface PaginationProps {
  totalCount?: number;
  pageSize?: number;
  currentPage?: number;
  onPageChange?: (offset: number) => void;
  onLimitChange?: (limit: number) => void;
}

const PaginationComponent = ({
  totalCount = 0,
  currentPage = 1,
  pageSize = PAGE_SIZE,
  onPageChange = () => {},
  onLimitChange = () => {},
}: PaginationProps) => {
  const colorFill = theme.colors.gray[400];

  const [data, setData] = useState<PaginationType>({
    arrOfCurrButtons: [],
  });

  const { arrOfCurrButtons } = data;
  const numberOfPage = Math.ceil(totalCount / pageSize);

  const isDisabledPrev = currentPage <= 1;
  const lastPage = Math.floor((totalCount + pageSize - 1) / pageSize);
  const isDisableNext = currentPage === lastPage || currentPage < 1;

  useEffect(() => {
    const tempNumberOfButtons = formatPagination({
      totalCount,
      pageSize,
      currentPage,
      arrOfCurrButtons,
    });

    setData({
      ...data,
      arrOfCurrButtons: tempNumberOfButtons,
    });
  }, [currentPage, pageSize, totalCount]);

  const handlePrevPage = useCallback(() => {
    if (currentPage === 1) {
      onPageChange(currentPage);
      return;
    }

    onPageChange(currentPage - 1);
  }, [currentPage, onPageChange]);

  const handleNextPage = useCallback(() => {
    if (currentPage === formatNumberButton(numberOfPage).length) {
      onPageChange(currentPage);
      return;
    }

    onPageChange(currentPage + 1);
  }, [currentPage, numberOfPage, onPageChange]);

  const handlePageClick = useCallback(
    (value: number) => {
      onPageChange(value);
    },
    [onPageChange],
  );

  const handleLimitChange = useCallback(
    (limit: TOption) => {
      onLimitChange(+limit.value);
    },
    [onLimitChange],
  );

  const renderTitle = useCallback(
    () => (
      <Flex w={20}>
        <Text fontSize={{ lg: 'sm' }}>{pageSize}</Text>
        <Box mt={-1} ml={2}>
          <Arrow color={colorFill} width={18} height={15} />
        </Box>
      </Flex>
    ),
    [colorFill, pageSize],
  );

  return (
    <Flex
      data-testid="pagination"
      w="100%"
      justifyContent={{ base: 'center', lg: 'space-between' }}
    >
      <Flex
        display={{ base: 'none', lg: 'inline-flex' }}
        alignItems="center"
        position="relative"
      >
        <Text w={100} fontSize="sm" fontWeight="semibold" color="text.primary">
          Show result:
        </Text>
        <Box w={70}>
          <Select
            variant="secondary"
            options={PAGINATION}
            renderTitle={renderTitle}
            onSelect={handleLimitChange}
          />
        </Box>
      </Flex>
      <Flex justifyContent="space-between">
        <Button
          data-testid="prev-button"
          aria-label="btn-prev"
          variant="iconSecondary"
          cursor={isDisabledPrev ? 'not-allowed' : ''}
          isDisabled={isDisabledPrev}
          onClick={handlePrevPage}
        >
          <Arrow color={colorFill} rotate="90deg" />
        </Button>
        <Flex alignItems="center">
          {arrOfCurrButtons.map((item: string | number) => {
            const isDots = item.toString() === '...';
            const isDisable = currentPage === item || isDots;
            const hoverStyle = isDots
              ? {}
              : {
                  color: 'primary.500',
                  bg: 'background.body.quinary',
                };
            const disableStyle = isDots
              ? {}
              : {
                  color: 'text.quaternary',
                  bg: 'background.body.quinary',
                };
            return (
              <Button
                key={item}
                aria-label="btn-pages"
                isDisabled={isDisable}
                mx={0.5}
                h={{ base: 30, '2xl': 53 }}
                fontSize={{ base: 'xs', lg: 'sm' }}
                px={{ base: 4, '2xl': 6 }}
                bg={
                  currentPage === item
                    ? 'background.body.quinary'
                    : 'transparent'
                }
                color={currentPage === item ? 'text.quaternary' : 'gray.400'}
                cursor={isDots ? 'not-allowed' : ''}
                _hover={hoverStyle}
                _disabled={disableStyle}
                onClick={() => handlePageClick(item as number)}
              >
                {item}
              </Button>
            );
          })}
        </Flex>
        <Button
          data-testid="next-button"
          aria-label="btn-next"
          variant="iconSecondary"
          cursor={isDisableNext ? 'not-allowed' : ''}
          isDisabled={isDisableNext}
          onClick={handleNextPage}
        >
          <Arrow color={colorFill} rotate="-90deg" />
        </Button>
      </Flex>
    </Flex>
  );
};

const Pagination = memo(PaginationComponent);
export default Pagination;
