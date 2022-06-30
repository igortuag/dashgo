import { Button, Flex, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Input } from "../components/Form/Input";

type SignInFormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { push } = useRouter();
  const { register, handleSubmit } = useForm();

  const handleSignIn: SubmitHandler<SignInFormData> = (values) => {
    console.log("values", values);
  };

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
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={4}>
          <Input
            name="email"
            label="Email"
            type="email"
            {...register("email")}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            {...register("password")}
          />
        </Stack>

        <Button type="submit" mt="6" colorScheme="pink" size="lg">
          Login
        </Button>
      </Flex>
    </Flex>
  );
}
