import React from 'react'
import theme from "../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../src/layouts/FullLayout";

const Orders = () => {
    return (
        <ThemeProvider theme={theme}>
            <style jsx global>{`
     footer {
      display:none
     }
      `}</style>
            <FullLayout>
                <div>Orders</div>
            </FullLayout>
        </ThemeProvider>

    )
}

export default Orders