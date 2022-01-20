import React from 'react';

const Login = (props) => {
    const {submitForm, update, errorText} = props
    
    const onSubmit = evt => {
        evt.preventDefault();
        
        submitForm()
      }

      const onChange = evt => {
        const name = evt.target.name;
      
        const value = evt.target.value;
    
        update(name, value);
      }


  return <div className='container'>
      <div className="mb-3 w-50 mx-auto">
        <h2>Login</h2>
      </div>
  <form onSubmit={onSubmit}>
        <div className="mb-3 w-50 mx-auto">
            <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
            <input type="text" name='username' className="form-control" 
            id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange}/>
        </div>
        <div className="mb-3 w-50 mx-auto">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" name='password' className="form-control" 
            id="exampleInputPassword1" onChange={onChange}/>
        </div>
        <div className='text-center'>
            <button type="submit" className="btn btn-primary">Submit</button>
        </div>
        <div className='text-center'>
            <p type="text" className='error'>{errorText}</p>
        </div>
    </form> 
</div>;
};

export default Login;
