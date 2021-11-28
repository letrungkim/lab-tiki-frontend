import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import './App.css';
 
export default function DataLoader(props) {
 
 const [editing, setEditing] = useState(false)
 const [productName, setName] = useState('')
 const [productPrice, setPrice] = useState(0)
 const [productQuantity, setQuantity] = useState(0)
 const [productType, setType] = useState('')
 const [title, setTitle] = useState('Create Product')
 const [id, setId] = useState(0)
 const save = () => {
 
   if(editing){
      
     fetch(endPoint, {
       method: 'PUT',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({ id: id, productName: productName, productPrice: productPrice, productQuantity: productQuantity, productType: productType})
   }).then(data => {if(data.status==200){
    window.location.reload();
  }})
 
   }
   else{
     fetch(endPoint, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ productName: productName, productPrice: productPrice, productQuantity: productQuantity, productType: productType})
   }).then(data =>{if(data.status==200){
     window.location.reload();
   }})
 
   }
 
   }
 
 const [data, setData] = useState([]);
 const endPoint = "https://lab-tiki-backend.herokuapp.com/products/"
  const doNothing = () => {}
 
 useEffect(() => 
    fetch(endPoint)
    .then(response => response.json())
    .then(data => {
      setData(data);
      $('#example').DataTable();
    }))
 
 const deleteFunc = (id) => {
   fetch(endPoint+id, {
       method: 'DELETE',
       headers: {
         'Content-Type': 'application/json'
       }
   }).then(data => console.log(data) )
}
 
const editFunc = (id, productName, productPrice, productQuantity, productType) => {
 setEditing(true)
 setName(productName)
 setPrice(productPrice)
 setQuantity(productQuantity)
 setType(productType)
 setId(id)
}
 
 return (
   <div>
      <div id="edit">
      <form>
        <h3>{title}</h3>
        <label for="id">ID</label>
        <input type="number" disabled={true} value={id} onChange={(e)=>setId(e.target.value)}/>
        <label for="pname">Name</label>
        <input type="text" value={productName} onChange={(e)=>setName(e.target.value)}/>
        <label for="price">Price</label>
        <input type="number" value={productPrice} onChange={(e)=>setPrice(e.target.value)}/>
        <label for="quantity">Quantity</label>
        <input type="number" value={productQuantity} onChange={(e)=>setQuantity(e.target.value)}/>
        <label for="type">Type</label>
        <input type="text" value={productType} onChange={(e)=>setType(e.target.value)}/>
        <input id="submit" value="Submit" onClick={()=> save()}></input>
      </form>
      </div>
      <div className="MainDiv">
        <div class="jumbotron text-center bg-sky">
            <h3>Tiki Product Table Management</h3>
        </div>
        <div className="container">
            
            <table id="example" class="display">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Type</th>
                      <th>Edit</th>
                      <th>Delete</th>
                  </tr>
              </thead>
              <tbody>
                  {data.map(attribute=>(
                    <tr key={attribute.id}>
                        <td>{attribute.id}</td>
                        <td>{attribute.productName}</td>
                        <td>{attribute.productPrice}</td>
                        <td>{attribute.productQuantity}</td>
                        <td>{attribute.productType}</td>
                        <td><button onClick={()=> {setTitle("Edit Product");editFunc(attribute.id, attribute.productName, attribute.productPrice, attribute.productQuantity, attribute.productType)}}>Edit</button></td>
                        <td><button onClick={()=> deleteFunc(attribute.id)}>Delete</button></td>
                  </tr>
                  ))}
              </tbody>
              <tfoot>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Type</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
              </tfoot>
          </table>
          </div>
        </div>
   </div>
 )
}
