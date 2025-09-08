import { useNavigation } from "@refinedev/core";
import Add from "@mui/icons-material/Add";
import { Box, Stack, Typography } from "@mui/material";
import { CustomButton } from "../components";

const AllProperties: React.FC = () => {
  const { push } = useNavigation();

  return (
    <Box p={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography fontSize={25} fontWeight={700} color="#11142d">
          All Properties
        </Typography>

        <CustomButton
          title="Add Property"
          handleClick={() => push("/properties/create")}
          backgroundColor="#475be8"
          color="#fcfcfc"
          icon={<Add />}
        />
      </Stack>

      <Typography color="#555">Property details content goes here...</Typography>
    </Box>
  );
};

export default AllProperties;
