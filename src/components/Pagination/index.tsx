import { Box, Button, Stack, Text } from "@chakra-ui/react";
import PaginationItem from "./PaginationItem";

interface PaginationProps {
  totalCountRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onChangePage: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => from + index)
    .filter((page) => page > 0);
}

export function Pagination({
  totalCountRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onChangePage,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountRegisters / registersPerPage);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage > 1
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];

  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> of <strong>100</strong>
      </Box>

      <Stack direction="row" spacing="2">
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem number={1} />
            {currentPage > 2 + siblingsCount && <Text>...</Text>}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => (
            <PaginationItem key={page} number={page} />
          ))}

        <PaginationItem isCurrent={true} number={currentPage} />

        {nextPages.length > 0 &&
          nextPages.map((page) => <PaginationItem key={page} number={page} />)}

        {currentPage + siblingsCount < lastPage && (
          <>
            <PaginationItem number={lastPage} />
            {currentPage + 1 + siblingsCount < lastPage && <Text>...</Text>}
          </>
        )}
      </Stack>
    </Stack>
  );
}
