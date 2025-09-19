import Place from "@mui/icons-material/Place";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import { PropertyCardProps } from "../../interfaces/property";
const PropertyCard = ({id,title,location,price,photo}:PropertyCardProps) => {
  return (
<Card component={Link}
to={`/properties/${id}`}
sx={{maxWidth:'330px',
  padding:'10px', 
  '&:hover':{
    boxShadow:'0 22px 45px 2px rgba(176,176,176,0.1)'
  },
  cursor:'pointer'
}}
elevation={0}
>
<CardMedia
component="img"
width="100%"
height={210}
image={photo}
alt="card image"
sx={{borderRadius:'10px'}}
/>
</Card>
  )
}

export default PropertyCard
