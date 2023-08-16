import * as React from 'react';
import { useState } from "react";
import CreativeTables from "../components/Sidebar/Table";
import { Button, Card, IconButton } from "@mui/material";
import { useEffect } from "react";
import UploadIcon from '@mui/icons-material/Upload';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FormText from '../components/form';
import { Form, Modal } from 'antd';
import { getData, insertData } from '../API/devices';

const Devices = () => {
  const [tableData, setTableData] = useState([])

  const [modal2Open, setModal2Open] = useState(false);






  const [reload,setReload]=useState(true)
  const reloadPage=()=>{
    setReload(!reload)
  }
  
  useEffect(() => {
    const sampleData = []
    // for (let i = 0; i < 100; i++) {
    //   sampleData.push(
    //     {
    //       vtype: i,
    //       vno: 'LM-' + (800 + i) + '-old',
    //       dimei: '32546363464',
    //       connection: 'no sim',
    //       status: 'active',
    //       lupdate: '2023-03-34',
    //       level: 'Admin level 01',
    //       r_data: '2023-06-13',
    //       tu_date: '2023-06-13'
    //     }
    //   )
    // }
    getData().then((data)=>{
      console.log("data",data)
      setTableData(data)
    })
    
    // setTableData(sampleData)
  }, [reload])

  

  const [form] = Form.useForm();
  const handleOk = () => {
    // setModal2Open(false)
    // console.log(form.validateFields())

    (form.validateFields()).then(() => {
      // console.log(form.getFieldsValue())
      insertData(form.getFieldsValue())
      reloadPage()
      setModal2Open(false)
    }).catch((e)=>{

    })





  }

  return (
    <div>
      <Modal
        title="Add new Device"
        centered
        open={modal2Open}
        onOk={handleOk}
        onCancel={() => setModal2Open(false)}
        width={550}
      >
        <div>
          <FormText form={form} />
        </div>
      </Modal>

      <Card className="shadowCard">
        <div className="" style={{ padding: '10px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <div><h2>Devices</h2></div>
            <div style={{ width: '28vw', display: 'flex', justifyContent: 'space-between' }}>
              <Button className="buttonPadding" variant="outlined" startIcon={<UploadIcon />} sx={{
                borderColor: '#7f8c8d',
                color: '#7f8c8d',
                boxShadow: '5px 6px 7px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                },
              }}>
                Bulk Configuration
              </Button>
              <Button variant="outlined" startIcon={<AddIcon />} sx={{
                borderColor: '#7f8c8d',
                color: '#7f8c8d',
                boxShadow: '5px 6px 7px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                },

              }} onClick={() => setModal2Open(true)}>
                Configure New Device
              </Button>
              <IconButton variant="contained" aria-label="delete" style={{
                backgroundColor: '#2ecc71', borderRadius: '4px', // Adjust the border radius for the rectangular shape
                width: '36px', // Adjust the width as needed
                height: '36px',
              }}>
                <FileDownloadIcon style={{ color: '#fff' }} />
              </IconButton>
            </div>
          </div>
          <div>
            <CreativeTables data={tableData}
              column={
                [
                  ' ',
                  'Vehicle Number',
                  'Device IMEI',
                  'Connection No',
                  'Status',
                  'Last Updated',
                  'Level',
                  'Renewal Data',
                  'Top-Up Date',
                  'Action'
                ]
              } />
          </div>
        </div>
      </Card>
    </div>
  );

};

export default Devices;
