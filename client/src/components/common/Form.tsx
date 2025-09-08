import React from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import {FormProps } from '../../interfaces/common'
// import { CustomButton } from './CustomButton';
const Form = ({type, register,handleSubmit, handleImageChange, formLoading, onFinishHandler, propertyImage}:FormProps) => {
  return (
<Box>
  <Typography fontSize={25} fontWeight={700} color="#11142d">
{type} a property
  </Typography>

  <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
    <form style={{marginTop:"20px", width:"100%" , display:"flex",
      flexDirection: "column" , gap:"20px"
    }} onSubmit={handleSubmit(onFinishHandler)}>
      <FormControl>
        <FormHelperText sx={{fontWeight:500, margin :'10px 0', fontSize:16,color:"#11142d"}}> Enter a Property

        </FormHelperText>

        <TextField
        fullWidth
        required
        id="outlined-basic"
        color="info"
        variant="outlined"
        {...register('title', {
          required:true
        })}
        
        
        
        />


      </FormControl>

    </form>

  </Box>

</Box>
  )
}

export default Form
