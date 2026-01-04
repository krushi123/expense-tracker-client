import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from"axios"
import { toast } from 'react-toastify'
export default function Add() {
  const navigate=useNavigate()
  const[formData,setFormData]=useState({
    title:"",
    amount:0,
    category:"",
  });
  const[isLoading,setIsLoading]=useState(false);
  //console.log();
  const handleSubmit=async()=>{
    //console.log(formData);
    //console.log(formData);
    setIsLoading(true);
    const res=await axios.post(`http://localhost:7000/api/expense/insert`,formData);
    try {
      //console.log(res)
      if (res.data.success) {
        toast(res.data.message);
        setTimeout(()=>{
          navigate("/");

        },2000);
      } else {
        toast(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setTimeout(()=>{
      setIsLoading(false)},2000);
    }
  };
  return (
    <Box>
        <Box sx={{textAlign:"center"}}>
            <Typography variant='h4'>add Expense Details</Typography>
        </Box>
        <Box sx={{backgroundColor:"pink",p:4,display:'flex',justifyContent:"center",alignItems:"center"}}>
            <Paper sx={{width:"70%",p:3}}>
                <TextField value={formData.title}fullWidth onChange={(e)=>setFormData({...formData,title:e.target.value})}
                label="enter expense title" 
                placeholder='enter title here'
                 sx={{mb:2}}/>
                <TextField value={formData.amount} fullWidth onChange={(e)=>setFormData({...formData,amount:e.target.value})}
                label="enter expense amount" 
                placeholder='enter amount here'type="number"
                 sx={{mb:2}}/>
                 <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">select expense category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          //value={age}
          value={formData.category}onChange={(e)=>setFormData({...formData,category:e.target.value})}
          label="select expense category"
          //onChange={handleChange}
          sx={{mb:2}}
        >
          <MenuItem value={"transport"}>transport</MenuItem>
          <MenuItem value={"food"}>food</MenuItem>
          <MenuItem value={"travel"}>travel</MenuItem>
          <MenuItem value={"vlog"}>vlog</MenuItem>
          <MenuItem value={"fashion"}>fashion</MenuItem>
        </Select>
      </FormControl>
                 <Button onClick={handleSubmit}sx={{mb:1}}variant="contained" fullWidth loading={isLoading}>Submit</Button>
                 <Button component={Link} to="/" sx={{mb:1}}variant="outlined"color="secondary" fullWidth>View Details</Button>

            </Paper>
        </Box>
    </Box>
  )
}
