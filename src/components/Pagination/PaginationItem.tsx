import { Button } from "@chakra-ui/react";
import React from "react";

interface PaginationItemProps {
  isCurrent?: boolean;
  number: number;
  onPageChange: (page: number) => void;
}

function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationItemProps) {
  if (isCurrent)
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="pink"
        disabled
        _disabled={{
          bgColor: "pink.500",
          cursor: "default",
        }}
      >
        {number}
      </Button>
    );

  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bgColor="gray.700"
      onClick={() => onPageChange(number)}
      _hover={{
        bgColor: "gray.500",
      }}
    >
      {number}
    </Button>
  );
}

export default PaginationItem;
