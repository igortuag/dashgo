import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Can from "../components/Can";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { setupApiClient } from "../services/apiAuth";
import { withSSRAuth } from "../utils/wishSSRAuth";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      "2021-06-09T00:00:00.000Z",
      "2021-06-10T00:00:00.000Z",
      "2021-06-11T00:00:00.000Z",
      "2021-06-12T00:00:00.000Z",
      "2021-06-13T00:00:00.000Z",
      "2021-06-14T00:00:00.000Z",
      "2021-06-15T00:00:00.000Z",
    ],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series = [
  {
    name: "Series 1",
    data: [31, 120, 10, 20, 51, 18, 109],
  },
];

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Can permissions={["metrics.list"]}>
          <SimpleGrid
            flex="1"
            gap="4"
            minChildWidth="320px"
            alignItems="flex-start"
          >
            <Box p={["6", "8"]} bg="gray.800" borderRadius={8}>
              <Text fontSize="lg" mb="4" pb="4">
                Week subscribers
              </Text>
              <Chart
                options={options}
                series={series}
                type="area"
                height={160}
              />
            </Box>
            <Box p={["6", "8"]} bg="gray.800" borderRadius={8}>
              <Text fontSize="lg" mb="4" pb="4">
                Open rate
              </Text>
              <Chart
                options={options}
                series={series}
                type="area"
                height={160}
              />
            </Box>
          </SimpleGrid>
        </Can>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx);

  const response = await apiClient.get("me");

  console.log("response", response);

  return {
    props: {},
  };
});
