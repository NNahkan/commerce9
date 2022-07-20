import React from 'react';
import './InputBase.css';
import { FaEye , FaEyeSlash } from 'react-icons/fa';


const handleVisib = () => {
	const pass= document.getElementsByName("password")[0];
	if (pass.type === 'password') {
		 pass.type='text';
		} else {
			pass.type='password'
		};
}
/* const eyes = document.querySelectorAll('.eye');
const pass = document.getElementsByName('password')[0];
console.log(eyes);
console.log(pass);

for (const elm of eyes) {
	
	elm.addEventListener('click', function() {
	  
	  if (pass.type === 'password') {
		pass.type='text';
		console.log('ssss');
	  } else {
		  pass.type='password'
	  };
	})
 }; */

const InputBase = ({ errorM ,error, ...props }) => (
	
		<div style={{position:'relative', marginBottom:'20px' }}>
			<input 
			style={{
				border: errorM && '3px solid red'}} 
			className='input-root' {...props} />
			{ errorM && (
			<div className="errorLogin">{errorM}</div>
		)}
			{props.label==='Create Password*' && (
				<p className='pass-info'>
					Password must be 8-20 characters,including: at least one capital letter,at least one small letter, one number and one special character -!@#$%^&*()_+
				</p>
			)}
			{props.name==='password' && (				
				 <>
				 {props.type === 'text' 
				? (<FaEye onClick={handleVisib}  className='eye' />) // I couldn't make it :(
				: <FaEyeSlash onClick={handleVisib}  className='eye' /> 
				}
				</>
				
			)}

		</div>
		
		

	
);



export default InputBase;