import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

interface ProfileProps {
  showProfileData?: boolean;
}

function Profile({ showProfileData }: ProfileProps) {
  const { user } = useContext(AuthContext);

  return (
    <Flex>
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{user.name}</Text>
          <Text color="gray.300" fontSize="small">
            {user.email}
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Igor Tuag"
        src="https://github.com/igortuag.png"
      />
    </Flex>
  );
}

export default Profile;
