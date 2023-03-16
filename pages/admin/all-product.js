import React from 'react'
import theme from "../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../src/layouts/FullLayout";
const AllProducts = () => {
  return (
    <ThemeProvider theme={theme}>
        <style jsx global>{`
     footer {
      display:none
     }
      `}</style>
    <FullLayout>
    <div>AllProducts</div>
    </FullLayout>
    </ThemeProvider>
 
  )
}

export default AllProducts