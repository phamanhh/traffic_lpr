import React from 'react'

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationComp = ({ setPage, total, page }) => {
  const getNumberPage = () => {
    return Math.ceil(total / 10);
  }

  return (
    <Stack spacing={2}>
      <Pagination page={page} count={getNumberPage()} color="primary" onChange={(e, value) => { setPage(value) }} />
    </Stack>
  )
}

export default PaginationComp