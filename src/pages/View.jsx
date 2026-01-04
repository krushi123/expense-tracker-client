import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import ExpenseTable from '../components/Table'
import FloatingAddButtonSize from '../components/FloatingAddButton'
import axios from 'axios'
import { useEffect } from 'react'
export default function View() {
  const[allExpense,setAllExpense]=useState([])
  const fetchAllExpense = async()=>{
    try {
      const res=await axios.get(`http://localhost:7000/api/expense/view-all`);
     // console.log(res.data);
     if(res.data.success){
      setAllExpense(res.data.expense);
     }
    } catch (error) {
      console.log(error)
    }
  };
  //useEffect(arrowFunction,dependency)
  useEffect(()=>{
    fetchAllExpense();
  },[])
 // console.log(allExpense)
  return (
  <Box>
    <Box sx={{textAlign:"center"}}>
        <Typography varient="h4">Expense List</Typography>
    </Box>
    <Box sx={{p:2}}></Box>
        <ExpenseTable allExpense={allExpense}
        fetchAllExpense={fetchAllExpense}/>
        <FloatingAddButtonSize/>
    
  </Box>
  )
}
