import { Button, Flex, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Input } from "../components/Form/Input";

export default function SignIn() {
  const { push } = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    push("/dashboard");
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit}
      >
        <Stack spacing={4}>
          <Input name="email" label="Email" type="email" />
          <Input name="password" label="Password" type="password" />
        </Stack>

        <Button type="submit" mt="6" colorScheme="pink" size="lg">
          Login
        </Button>
      </Flex>
    </Flex>
  );
}
