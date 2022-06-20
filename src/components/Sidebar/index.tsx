import { Box, Icon, Link, Stack, Text } from "@chakra-ui/react";
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from "react-icons/ri";
import NavSection from "./NavSection";

export default function Sidebar() {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <NavSection title="GENERAL">
          <Link display="flex" alignItems="center">
            <Icon as={RiDashboardLine} fontSize="20" />
            <Text ml="4" fontWeight="medium">
              Dashboard
            </Text>
          </Link>
          <Link display="flex" alignItems="center">
            <Icon as={RiContactsLine} fontSize="20" />
            <Text ml="4" fontWeight="medium">
              Users
            </Text>
          </Link>
        </NavSection>

        <NavSection title="AUTOMATION">
          <Link display="flex" alignItems="center">
            <Icon as={RiInputMethodLine} fontSize="20" />
            <Text ml="4" fontWeight="medium">
              Forms
            </Text>
          </Link>
          <Link display="flex" alignItems="center">
            <Icon as={RiGitMergeLine} fontSize="20" />
            <Text ml="4" fontWeight="medium">
              Automation
            </Text>
          </Link>
        </NavSection>
      </Stack>
    </Box>
  );
}
