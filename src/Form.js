import React, {useState, useEffect} from "react";
import axios from 'axios';
import * as yup from 'yup';
import { Link } from "react-router-dom";


const formSchema = yup.object().shape({
    name: yup.string().min(2, 'name must be at least 2 characters'),
    sauce: yup.string(),
    size: yup.string(),
    cheese: yup.string(),
    peps: yup.string(),
    peppers: yup.string(),
    pineapple: yup.string(),
    special: yup.string(),
})

function Form(){

    const[myForm, setMyForm] = useState({
        name:'',
        sauce:'',
        size:'small',
        cheese: '',
        peps: '',
        peppers: '',
        pineapple: '',
        special:'',
    })

    //state for errors
    const[myErrors, setMyErrors] = useState({
        name:'',
        sauce:'',
        size:'',
        cheese: '',
        peps: '',
        peppers: '',
        pineapple: '',
        special:'',
    })

    //state for button (only pressable when the form is complete)
    const [buttonDisabled, setButtonDisabled]= useState(true)

    //state for post request
    const [users, setUsers] = useState([])

//VALIDATION STEPS
//use effect
//validateChange
//formSubmit
//inputChange

//use effect
useEffect(() => {
    /* We pass the entire state into the entire schema, no need to use reach here. 
    We want to make sure it is all valid before we allow a user to submit
    isValid comes from Yup directly */
    formSchema.isValid(myForm).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [myForm]);

//validateChange
const validateChange = e => {
    // Reach will allow us to "reach" into the schema and test only one part.
    yup
      .reach(formSchema, e.target.name)
    //   .validate(e.target.value) //<=what cristina had, another student found a bug in this and supplied fix
      .validate(e.target.name === "terms" ? e.target.checked : e.target.value)
      .then(valid => {
          console.log(`this is what valid is in validateChange: ${myErrors} ${e.target.name}`);
        setMyErrors({
          ...myErrors,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        setMyErrors({
          ...myErrors,
          [e.target.name]: err.errors[0]
        });
        console.log(err)
      });
  };

//formSubmit
const formSubmit = e => {
    e.preventDefault();
    console.log(e)
    axios
      .post("https://reqres.in/api/users", myForm)
      .then(res => {
        setUsers(res.data);
        console.log("success", users);

        setMyForm({
            name: "",
            sauce:"",
            size:"",
            cheese: "",
            peps: "",
            peppers: "",
            pineapple: "",
            special:"",
        });
      })
      .catch(err => {
        console.log(err.res);
      });
  };

//inputChange
const inputChange = function(e){
/* e.persist allows us to use the synthetic event in an async manner.
We need to be able to use it after the form validation */
e.persist();

const newFormData = {
    ...myForm, //similar to yesterday, when we change something, we get everything we already have. here
    [e.target.name]://here e is the input event going on, in a specific input. target.name gathers that name data
      e.target.type === "checkbox" ? e.target.checked : e.target.value//if the type is checkbox, 
  };
  console.log(e.target.value)
  validateChange(e);//we pass e along to our validation function for some checking
  setMyForm(newFormData);//we set our for to everything we had previously (...myForm) 
  //and also add on the key value pair of e.target.name : e.target.checked/value
}

    return(
        <div>
            <Link to={'/'} ><div className="home-button">Home</div></Link>
            <form onSubmit={formSubmit}>
                <label htmlFor='name'>
                    Name 
                    <input 
                    type='text' 
                    id='name' 
                    name='name'
                    value={myForm.name}
                    onChange={inputChange}
                    />
                    {/*put error state stuff right after this section of a form */}
                    {myErrors.name.length > 1 ? <p className="error">{myErrors.name}</p> : null}
                </label>
                <label htmlFor="size">
                pick a size
                <select id="size" name="size" onChange={inputChange}>
                    <option value="small">small</option>
                    <option value="medium">medium</option>
                    <option value="large">large</option>
                    <option value="XL">XL</option>
                </select>
                </label>
                <fieldset>
                    <legend>Pick your sauce</legend>
                    <p>Check the one</p>
                    <p>
                        <label><input type="radio" name="sauce" value="marinara" onChange={inputChange}/> marinara</label>
                        <label><input type="radio" name="sauce" value="white" onChange={inputChange}/> white</label>
                        <label><input type="radio" name="sauce" value="bbq" onChange={inputChange}/> bbq</label>
                        <label><input type="radio" name="sauce" value="hot"onChange={inputChange}/> hot</label>
                    </p>
                </fieldset>
                <fieldset>
                    <legend>Pick your toppings</legend>
                    <p>Check the ones you want</p>
                    <p>
                        <label><input type="checkbox" name="cheese" value="cheese" onChange={inputChange}/> cheese</label>
                        <label><input type="checkbox" name="peps" value="peps" onChange={inputChange}/> peps</label>
                        <label><input type="checkbox" name="peppers" value="peppers" onChange={inputChange}/> peppers</label>
                        <label><input type="checkbox" name="pineapple" value="pineapple" onChange={inputChange}/> pineapple</label>
                    </p>
                </fieldset>
                <label htmlFor="special">
                    Anything else we need to do?
                    <textarea
                        id="special"
                        name="special"
                        value={myForm.special}
                        onChange={inputChange}
                    />
                </label>
                <pre>{JSON.stringify(users, null, 2)}</pre>
                <button type='submit' disabled={buttonDisabled}>Order</button>
            </form>
        </div>
    )
}

export default Form;