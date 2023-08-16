import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useState } from 'react';
import { Chip, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ErrorOutlineIcon from '@mui/icons-material/Favorite';
import { MdDashboard } from "react-icons/md";
import { FcAutomotive, FcInTransit, FcShipped } from "react-icons/fc";
import { GiHeartBeats } from "react-icons/gi";
import { FaSatelliteDish } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import { TbSettingsStar } from "react-icons/tb";
import { MdDelete } from "react-icons/md";

import MapIcon from '@mui/icons-material/Map';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'rgb(189, 195, 199)',
        color: theme.palette.common.black,
        fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



const CreativeTables = (props) => {
    const [rowData, setrowData] = useState([])
    const [AllRowData, setAllRowData] = useState([])
    const [columnData, setColumnData] = useState([])
    const [pageLimit, setPageLimit] = useState(10)
    const [pageStartIndex, setStartIndex] = useState(0)
    const [pageNumber, setPageNumber] = useState(1)
    const [paginationDetails, setPaginationDetails] = useState({
        start: 1,
        end: 1,
        all: 1
    })


    const [temptableData, setTempTableData] = useState([])
    const [searchText, setsearchText] = useState('')



    useEffect(() => {
        if (!props) return
        setrowData(props.data.slice(0, pageLimit))
        setAllRowData(props.data)
        setTempTableData(props.data)
        setColumnData(props.column)
        setPaginationDetails({
            start: 1,
            end: pageLimit,
            all: props?.data?.length
        })
    }, [props])

    useEffect(() => {
        if (!AllRowData) return
        const temp = AllRowData.slice(0, pageLimit);
        let tempPagination = paginationDetails;
        tempPagination.end = pageLimit;
        tempPagination.all = AllRowData.length;
        setPaginationDetails(tempPagination);
        setrowData(temp);
    }, [pageLimit, AllRowData])

    const onSearchHandler = () => {
        if (temptableData.length == 0) return

        if (searchText == '' || searchText == ' ') {
            setrowData(temptableData.slice(0, pageLimit))
        } else {
            const temp = temptableData?.filter((item) => (
                item?.vno.toLowerCase().includes(searchText.toLowerCase()) ||
                item?.vtype.toString().toLowerCase().includes(searchText.toLowerCase())
            ));
            setrowData(temp.slice(0, pageLimit))

        }
    }
    useEffect(() => {
        onSearchHandler()
    }, [searchText])
    const onPageNumberChangeHandler = (step) => {
        if (!AllRowData) return
        console.log((pageNumber * pageLimit) + " - " + (pageNumber * pageLimit + pageLimit * step))
        // if( pageNumber*pageLimit < 0 ||  pageNumber*pageLimit > AllRowData.length  ) return

        let tempPagination = paginationDetails;

        let temp = []
        let nextPageNumber = pageNumber + 1 * (step)

        if (step < 1) {
            if (nextPageNumber == 0) return
            temp = AllRowData.slice(nextPageNumber * pageLimit + pageLimit * step, nextPageNumber * pageLimit);
            tempPagination.start = nextPageNumber * pageLimit + pageLimit * step;
            tempPagination.end = nextPageNumber * pageLimit;

        } else {
            if (AllRowData.length / pageLimit == pageNumber) return
            temp = AllRowData.slice(pageNumber * pageLimit, pageNumber * pageLimit + pageLimit * step);
            tempPagination.end = pageNumber * pageLimit + pageLimit * step;
            tempPagination.start = pageNumber * pageLimit;
        }
        tempPagination.all = AllRowData.length;
        setPaginationDetails(tempPagination);
        setPageNumber(nextPageNumber)
        setrowData(temp)
    }

    const onStatusHandler = (status) => {
        switch (status) {
            case 'acitve':

                return <Chip icon={<FavoriteIcon color={'error'} />} color="primary" variant="outlined" label="With Icon" />
            case 'deactive':
                return <Chip icon={<ErrorOutlineIcon />} color="error" variant="outlined" label="With Icon" />
            default:
                return <Chip label="Chip Outlined" variant="outlined" />
        }
    }
    const getFormattedDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
    const getFormattedDateTime = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
    const deviceIcon = (x) => {
        if (x == 1) {
            return <FcAutomotive size={25} className="colored-icon" />
        }
        else if (x == 2) {
            return <FcInTransit size={25} className="colored-icon" />
        }
        else {
            return <FcShipped size={25} className="colored-icon" />
        }
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '30px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>Show &nbsp;&nbsp; </div>
                    <div> <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={pageLimit}
                        label="Age"
                        onChange={(value) => {
                            setPageLimit(value.target.value)
                        }}
                        style={{ padding: '0px', height: '30px' }}
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                    </Select></div>
                    <div> &nbsp;&nbsp; entries</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div> Search &nbsp;&nbsp; </div>
                    <div>
                        <TextField
                            onChange={(event) => {
                                setsearchText(event.target.value);
                            }}
                            size="small"
                            id="outlined-basic"
                            label="" variant="outlined" />

                    </div>

                </div>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead >
                        <TableRow>
                            {
                                columnData?.map((item, index) => <StyledTableCell key={item.index} align="right">{item}</StyledTableCell>)
                            }

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowData.map((row, index) => (

                            <StyledTableRow key={row.index}>
                                <TableCell align="right">{deviceIcon(row.vtype)}</TableCell>
                                <TableCell align="right">{row.vno}</TableCell>
                                <TableCell align="right">{row.dimei}</TableCell>
                                <TableCell align="right">{row.connection}</TableCell>
                                <TableCell align="right">{row.status == 'active' ? <GiHeartBeats style={{ color: '#2ecc71', marginRight: '10px' }} /> : <GiHeartBeats style={{ color: '#e74c3c', marginRight: '10px' }} />} {row.status}</TableCell>
                                <TableCell align="right">{<FaSatelliteDish style={{ color: '#2ecc71', marginRight: '10px' }} />}{getFormattedDateTime(row.lupdate)}</TableCell>
                                <TableCell align="right">{row.level}</TableCell>
                                <TableCell align="right">{getFormattedDate(row.r_data)}</TableCell>
                                <TableCell align="right">{getFormattedDate(row.tu_date)}</TableCell>
                                <TableCell align="right">
                                    {<IconButton aria-label="map" size="small"><MapIcon  /></IconButton>}
                                    {<IconButton aria-label="setting" size="small"><SettingsIcon  /></IconButton>}
                                    {<IconButton aria-label="delete" size="small"><DeleteIcon  /></IconButton>}
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
            <hr />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                <span>Showing {paginationDetails.start} to {paginationDetails.end} of {paginationDetails.all} entities</span>
                <span>
                    <span style={{ cursor: "pointer" }} onClick={() => onPageNumberChangeHandler(-1)} >Previous</span>  &nbsp;&nbsp;
                    <span style={{ backgroundColor: "gray", padding: '2px', color: 'white' }}>{pageNumber}</span> &nbsp;&nbsp;
                    <span style={{ cursor: "pointer" }} onClick={() => onPageNumberChangeHandler(1)}>Next</span>
                </span>
            </div>
        </div>
    );
}


export default CreativeTables