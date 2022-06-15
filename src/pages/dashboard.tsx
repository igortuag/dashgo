import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

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

        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignItems="flex-start"
        >
          <Box p="8" bg="gray.800" borderRadius={8}>
            <Text fontSize="lg" mb="4">
              Week subscribers
            </Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
          <Box p="8" bg="gray.800" borderRadius={8}>
            <Text fontSize="lg" mb="4">
              Open rate
            </Text>
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
