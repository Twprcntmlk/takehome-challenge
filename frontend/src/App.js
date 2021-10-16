import React, { useState, useEffect } from "react";
import './App.css';


//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

//DataBase Mocks
class DBMock {

  async putItem(key, data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        localStorage.setItem(key, data);
        resolve('success')
      }, 100)
    })
  }

  async getItem(key) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const item = localStorage.getItem(key);
        resolve(item);
      })
    })
  }
}

const isValid = (value) => {
  const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  const isValid = expression.test(value);
  return isValid;
}

//Save the data in a database (you can use our DBMock class and local storage for now to mimic a database)

function App() {
  //Capture first name, last name, email, and date of birth
  const [firstName, setFirstName] = useState("");
  const [Email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const ThirtyDays = Array.from({length: 30}, (_, i) => i + 1)
  const [listDays, setListDays] = useState(ThirtyDays);
  const [year, setYear] = useState(new Date().getFullYear());
  const [errors, setErrors]=useState([])
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const [show, setShow] = useState(false);

  const days = (month) =>{
    const ThirtyDays = Array.from({length: 30}, (_, i) => i + 1)
    const ThirtyOneDays = Array.from({length: 31}, (_, i) => i + 1)
    const TwentyEightDays = Array.from({length: 28}, (_, i) => i + 1)
    //Need to handle Leap Years Later
    if ( ["Jan", "Mar", "May", "Jul", "Aug", "Oct", "Dec"].includes(month)){
      setListDays(ThirtyDays)
    }
    else if (["Apr", "Jun", "Sep", "Nov" ].includes(month)){
      setListDays(ThirtyOneDays)
    }
    else if (["Feb"].includes(month)){
      setListDays(TwentyEightDays )
    }
  }

  const currentYear = new Date().getFullYear();
  //Date of birth must allow a user to scroll through a list of months, days, and years (allow for users up to 99 years old)
  const years = Array(currentYear - (currentYear - 99)).fill('').map((v, idx) => currentYear - idx);


  useEffect(()=>{
    days(month)
  },[month])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dbInstance = new DBMock()
    setErrors([]);

    // Validate the Email does not already Exist
      if(Email){
        let ExistingEmail= await dbInstance.getItem(Email)
        ExistingEmail = JSON.parse(ExistingEmail)
        if (ExistingEmail){
          return setErrors([`${ExistingEmail.email}: Email Already Exists`]);
        }
      }
      // Validate the form is complete before submitting the information
      if (firstName==="" || lastName==="" || Email==="") {
        return setErrors(["Please Fill In All Required Fields"]);
      }
      // Validate the user information to ensure that it is a valid email (see email validation function below)
      else if (Email && !isValid(Email)) {
        return setErrors(["Please Fill Valid Email Address"]);
      }
      // Validate the date of birth is a valid date.
      else if (years<currentYear+18){
        return setErrors(["You Must Be 18 Years Or Older To Apply"]);
      }


      const data = {
        "firstname": `${firstName}`,
        "lastname":`${lastName}`,
        "email":`${Email}`,
        "month":`${month}`,
        "day":`${day}`,
        "year":`${year}`,
      }
      dbInstance.putItem(Email, JSON.stringify(data))
      setShow(true)
      setTimeout(() => {
        setShow(false)
      },8000)

  };
  //Provide feedback to the user indicating that their information has been submitted


  return (
    <div className="Login">

      <div className="Splash">
       <img src="https://d3e1i93f88eoxl.cloudfront.net/undraw_welcoming_xvuq.svg" alt="image1"></img>
      </div>

      <div className="Content">

        <h1 className="Title_Welcome">Welcome!</h1>
        <span className="Title_Span">Let's start with come basic info</span>

        {/* Provide a helpful tip if the user tries to submit the form and it is not valid */}
        <div className="Errors">{errors && errors.map((el,idx)=>el)}</div>
        <h3>Full Legal Name</h3>

        <div className="Form_Holder">
          <Form onSubmit={handleSubmit}>

            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label >First Name*</Form.Label>
              <Form.Control onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="Enter First Name" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label >Last Name*</Form.Label>
              <Form.Control onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Enter Last Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Email*</Form.Label>
              <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Email" />
            </Form.Group>


            <Row className="mb-1">
            <h3>Birth Date</h3>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Month</Form.Label>
                <Form.Select onChange={(e) => setMonth(e.target.value)} defaultValue="Choose...">
                {months.map((month, idx)=>(
                <option value={month} key={idx}>{month}</option>
                ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Day</Form.Label>
                <Form.Select onChange={(e) => setDay(e.target.value)} defaultValue="Choose...">
                  {listDays.map((day, idx)=>(
                  <option value={day} key={idx}>{day}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Year</Form.Label>
                <Form.Select onChange={(e) => setYear(e.target.value)} defaultValue="Choose...">
                  {years.map((year, idx)=>(
                  <option value={year} key={idx}>{year}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>


            <Button className="button" variant="primary" type="submit"> I Accept &#8594;</Button>
            <Alert className="Alert" show={show} variant="success">
              <Alert.Heading>Your information has been submitted!</Alert.Heading>
              <p>
                Thank you for your commitment to Brave Credit! We are working hard to protect and provide you up to date information!
              </p>
            </Alert>
            <div className='form-disclaimer'>
              By submiting this registration form, I understand that I am providing written instruction in accordance with the Fair Credit Reporting Act and other applicable law for CABOODLE CORP dba Brave Credit to request and recieve information about me from third parties, including but not limited to a copy of my consumer credit report and score from consumer reporting agnecies, at anytime for as long as I have an COBOODLE CORP dba Brave Credit Account. I further authorize CABOODLE CORP dba Brave Credit to retain a copy of my information for use in accordance with COBOODLE CORP dba Brave Credit's Terms of Use and Privacy Policy.
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default App;
