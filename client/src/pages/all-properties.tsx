import { useNavigation } from "@refinedev/core";
import Add from "@mui/icons-material/Add";
import { Box, Stack, Typography } from "@mui/material";
import { CustomButton, PropertyCard } from "../components";
import { useTable } from "@refinedev/core";

const AllProperties: React.FC = () => {
  const { push } = useNavigation();

  const {tableQueryResult:{data, isLoading ,isError}} = useTable();

  console.log(data);
const allProperties = data?.data ?? [];

if(isLoading) return<Typography>Loading...</Typography>
if(isError)return <Typography>Error...</Typography>
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

     <Box mt="20px" sx={{display:"flex", flexWrap:"wrap" , gap: 3}}>
{allProperties.map((property)=>(
  <PropertyCard
  key= {property._id}
  id={property._id}
  title={property.title}
  price={property.price}
  location={property.location}
  photo ={property.photo}
  /> 
))}
     </Box>
    </Box>
  );
};

export default AllProperties;
