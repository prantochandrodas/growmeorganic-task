import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import SelectCheckbox2 from '../SelectCheckbox2/SelectCheckbox2';
const TableInfo = () => {

    const columns = [
        { id: 'id', name: 'Id' },
        { id: 'name', name: 'Title' },
        { id: 'email', name: 'body' },
    ]

    const handlechangepage = (event: React.MouseEvent<HTMLButtonElement> | null, newpage: number) => {
        pagechange(newpage)
    }
    const handleRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        rowperpagechange(+event.target.value)
        pagechange(0);
    }

    const [rows, rowchange] = useState<any[]>([]);
    const [page, pagechange] = useState<number>(0);
    const [rowperpage, rowperpagechange] = useState<number>(5);
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts").then(resp => {
            return resp.json();
        }).then(resp => {
            rowchange(resp);
            console.log(resp);
        }).catch(e => {
            console.log(e.message)
        })

    }, [])

  rows.map(row=>console.log(row));
    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <h1>Data Table</h1>

                <Paper sx={{ width: '90%', marginLeft: '5%' }}>
                    <TableContainer sx={{ maxHeight: 450 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell style={{ backgroundColor: 'black', color: 'white' }} key={column.id}>{column.name}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows && rows
                                    .slice(page * rowperpage, page * rowperpage + rowperpage)
                                    .map((row) => <TableRow key={row.id}>
                                        <TableCell key={row.id}>
                                            {row.id}
                                        </TableCell>
                                        <TableCell key={row.id}>
                                            {row.body}
                                        </TableCell>
                                        <TableCell key={row.id}>
                                            {row.title}
                                        </TableCell>
                                    </TableRow>)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        rowsPerPage={rowperpage}
                        page={page}
                        count={rows.length}
                        component="div"
                        onPageChange={handlechangepage}
                        onRowsPerPageChange={handleRowsPerPage}

                    >

                    </TablePagination>
                </Paper>
                
            </div>
            <SelectCheckbox2></SelectCheckbox2>
        </div>
    );
};

export default TableInfo;