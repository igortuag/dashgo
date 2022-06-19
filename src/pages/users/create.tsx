import {
  Box,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { Input } from "../../components/Form/Input";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function UserCreate() {
  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Heading size="lg" fontWeight="normal">
            Create User
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Input name="name" label="Name" placeholder="Full name" />
              <Input
                name="email"
                label="Email"
                type="email"
                placeholder="User email"
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Input name="password" label="Password" type="password" />
              <Input
                name="password_confirmation"
                label="Password Confirmation"
                type="password"
              />
            </SimpleGrid>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}