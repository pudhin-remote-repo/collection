import React, { useState } from 'react';
//import axios from 'axios';

function Popup() {
  const [showPopup, setShowPopup] = useState(false);
  const [name,setName] = useState("");

  function togglePopup() {
    setShowPopup(!showPopup);
  }

 const CollectionInsertion =(e) =>{
  e.preventDefault();

  //const userdata = {number,name,liter,rate,amount};
  const userdata = {name};
  fetch("http://localhost:3003/collection", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userdata),
  })
  .then(response => response.text())
  .then(result => {
    console.log(result);
    setName("");
  })
  .catch(error => console.error(error));


 } 
  const handleNameChange = (event) => {
    setName(event.target.value);
  };


  return (
    <div>
      <button onClick={togglePopup} className='btn btn-primary'>Entry</button>

      {showPopup && (
        <div className="popup-content">
            <div className='container'>
            <div className="row">
                            
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>User Name <span className="errmsg">*</span></label>
                                        <input value={name} disabled={false}  onChange={handleNameChange} className="form-control"></input>
                                    </div>
                                </div>
                                
                                </div>


            </div>

            <button onClick={CollectionInsertion} className="btn btn-primary padding">Ok</button>
            <button onClick={togglePopup} className="btn btn-danger padding">Cancel</button>
          
        </div>
      )}
    </div>
  );
}

export default Popup;