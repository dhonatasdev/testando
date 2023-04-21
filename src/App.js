import React, { useState, useEffect } from 'react';
import './App.css';

import MaterialTable from '@material-table/core';

function App() {
  
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetch('https://sisa-api-nalwq.ondigitalocean.app/usuarios/')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setColumns([
          { title: "Name", field: "nome_completo" },
          { title: "Email", field: "email" },
          { title: "Phone Number", field: 'telefone' },
          { title: "Department", field: 'departamento' },
        ]);
      });
  }, []);

  return (
    <div className="App">
      <h1 align="center">React-App</h1>
      <h4 align='center'>CRUD com usuarios</h4>
      <MaterialTable
        title="Usuarios"
        data={data}
        columns={columns}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            const updatedRows = [...data, { id: Math.floor(Math.random() * 100), ...newRow }]
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowDelete: selectedRow => new Promise((resolve, reject) => {
            const id = selectedRow.id;
            const index = data.findIndex(row => row.id === id);
            const updatedRows = [...data];
            updatedRows.splice(index, 1);
            setTimeout(() => {
              setData(updatedRows);
              resolve();
            }, 2000);
          }),          
          onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
            const index=oldRow.tableData.id;
            const updatedRows=[...data]
            updatedRows[index]=updatedRow
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          })

        }}
        options={{
          actionsColumnIndex: -1, addRowPosition: "first"
        }}
      />
    </div>
  );
}

export default App;
