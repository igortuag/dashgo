import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

function Profile() {
  return (
    <Flex>
      <Box mr="4" textAlign="right">
        <Text>Igor Tuag</Text>
        <Text color="gray.300" fontSize="small">
          igortuag@gmail.com
        </Text>
      </Box>

      <Avatar
        size="md"
        name="Igor Tuag"
        src="https://github.com/igortuag.png"
      />
    </Flex>
  );
}

export default Profile;
