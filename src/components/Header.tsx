import { Flex } from "@chakra-ui/react";

export default function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <h1>Dashboard</h1>
    </Flex>
  );
}
