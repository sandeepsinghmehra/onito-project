import './App.css';

function App() {
  return (
    <div className={"App"}>
      <h1 className={"App-heading"}>Onito Patient Form</h1>
      <form className='form-wrapper'>
        <div className='detail-container'>
          <h2 className={"form-heading"}>Personal Details</h2>
          <div className={""}>
            <div className={"wrapper"}>
              <div className={"col"}>
                <div className={''}>
                  <label>Name<sup>*</sup></label>
                  <input 
                    type="text"
                    placeholder='Enter Name'
                  />
                </div>
                <div className='validation-error'>Error</div>
              </div>
              <div className={"col"}>
                <div className={''}>
                  <label>Date of Birth or Age<sup>*</sup></label>
                  <input 
                    type="text"
                    placeholder='DDMMYYYY or Age in Years'
                  />
                </div>
                <div className='validation-error'>Error</div>
              </div>
              <div className={"col"}>
                <div className={''}>
                  <label>Sex<sup>*</sup></label>
                  <input 
                    type="text"
                    placeholder='Enter Sex'
                  />
                </div>
                <div className='validation-error'>Error</div>
              </div>
              <div className={"col"}>
                <div className={''}>
                  <label>Mobile</label>
                  <input 
                    type="text"
                    placeholder='Enter Mobile'
                  />
                </div>
                <div className='validation-error'>Error</div>
              </div>
              <div className={"col"}>
                <div className={''}>
                  <label>Govt Issued ID</label>
                  <input 
                    type="text"
                    placeholder='ID Type'
                  />
                  <input
                    type="text" 
                    placeholder='Enter Govt ID'
                  />
                </div>
                <div className='validation-error'>Error</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className={"form-heading"}>Contact Details</h2>
          <div className={""}>
            <div className={"wrapper"}>
              <div className={"col"}>
                <div className={''}>
                  <label>Guardian Details</label>
                  <input 
                    type="text"
                    placeholder='Enter Label'
                  />
                  <input 
                    type="text"
                    placeholder='Enter Guardian Name'
                  />
                </div>
                <div className='validation-error'>Error</div>
              </div>
              <div>
                <div className={''}>
                  <label>Email</label>
                  <input
                    type="email" 
                    placeholder='Enter Email'
                  />
                </div>
                <div className='validation-error'>Error</div>
              </div>
              <div>
                <div className={''}>
                  <label>Emergency Contact Number</label>
                  <input 
                    type="text"
                    placeholder='Enter Emergency No'
                  />
                </div>
                <div className='validation-error'>Error</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className={"form-heading"}>Address Details</h2>
          <div >
            <div className={"wrapper"}>
              <div className={"col"}>
                <div className={''}>
                  <label>Address</label>
                  <input 
                    type="text"
                    placeholder='Enter Address'
                  />
                </div>
                <div className='validation-error'>Error</div>
              </div>
              <div>
                <div className={''}>
                  <label>State</label>
                  <input 
                    type="text"
                    placeholder='Enter State'
                  />
                </div>
                <div className='validation-error'>Error</div>
              </div>
              <div>
                <div className={''}>
                  <label>City</label>
                  <input
                    type="text" 
                    placeholder='Enter city/town/village'
                  />
                </div>
                <div className='validation-error'>Error</div>
              </div>
              <div>
                <div className={''}>
                  <label>Country</label>
                  <input
                    type="text"
                    placeholder='India'
                  />
                </div>
                <div className='validation-error'>Error</div>
              </div>
              <div>
                <div className={''}>
                  <label>Pincode</label>
                  <input 
                    type="text"
                    placeholder='Enter pincodoe'
                  />
                </div>
                <div className='validation-error'>Error</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className={"form-heading"}>Other Details</h2>
          <div>
            <div className='wrapper'>
              <div className='col'>
                <div className={''}>
                  <label>Occupation</label>
                  <input
                    type="text" 
                    placeholder='Enter Occupation'
                  />
                </div>
                <div className='validation-error'>Error</div>
              </div>
              <div>
                <div className={''}>
                  <label>Religion</label>
                  <input
                    type="text" 
                    placeholder='Enter Religion'
                  />
                </div>
                <div className='validation-error'>Error</div>
              </div>
              <div>
                <div className={''}>
                  <label>Marital Status</label>
                  <input
                    type="text" 
                    placeholder='Enter city/town/village'
                  />
                </div>
                <div className='validation-error'>Error</div>
              </div>
              <div>
                <div className={''}>
                  <label>Blood Group</label>
                  <input
                    type="text" 
                    placeholder='Group'
                  />
                </div>
                <div className='validation-error'>Error</div>
              </div>
              <div>
                <div className={''}>
                  <label>Nationality</label>
                  <input 
                    type="text"
                    placeholder='India'
                  />
                </div>
                <div className='validation-error'>Error</div>
              </div>
            </div>
          </div>
        </div>
        <div className='buttons'>
          <button className='cancel-btn'>
            <div>CANCEL</div>
            (<span>ESC</span>)
          </button>
          <button className='submit-btn'>
            <div>SUBMIT</div>
            (<span>S</span>)
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
