import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { useContext } from "react";
import { RiMenuLine } from "react-icons/ri";
import { AuthContext } from "../../contexts/AuthContext";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import Logo from "./Logo";
import NotificationNav from "./NotificationNav";
import Profile from "./Profile";
import SearchBar from "./SearchBar";

export default function Header() {
  const { onOpen } = useSidebarDrawer();
  const { signOut } = useContext(AuthContext);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

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
      {!isWideVersion && (
        <IconButton
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          aria-label="Open navigation"
        />
      )}

      <Logo />

      {isWideVersion && <SearchBar />}

      <Flex align="center" ml="auto">
        <NotificationNav />

        <Profile showProfileData={isWideVersion} />

        <button onClick={signOut}>Sign out</button>
      </Flex>
    </Flex>
  );
}
