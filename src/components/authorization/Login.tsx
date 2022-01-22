import React from 'react';
interface LoginProps {
    submitForm:Function,
    update:Function,
    errorText:string
}

const Login = ({submitForm, update, errorText}:LoginProps) => {
    
    const onSubmit = (evt:any) => {
        evt.preventDefault();
        
        submitForm()
      }

      const onChange = (evt:any) => {
        const name = evt.target.name;
      
        const value = evt.target.value;
    
        update(name, value);
      }


  return <div className='container'>
    <form onSubmit={onSubmit}>
        <div >
            <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
            <input type="text" name='username' className="form-control" 
            id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange}/>
        </div>
        <div>
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" name='password' className="form-control" 
            id="exampleInputPassword1" onChange={onChange}/>
        </div>
        <div className='text-center'>
            <button type="submit" className="btn btn-primary">Login</button>
        </div>
        <div className='text-center'>
            <p className='error'>{errorText}</p>
        </div>
    </form> 
</div>;
};

export default Login;
