import React from 'react';
import './Confirmation.css'
import { BiCheckCircle } from 'react-icons/bi'
import { FaLocationArrow } from 'react-icons/fa'
import { AiOutlineHome } from 'react-icons/ai'

const Confirmation = ({previousFunc, ...props }) => (
  <div className="confirmation">
	        <h2>Confirmation</h2>

    <div className="confirmationInfo">
      <span><BiCheckCircle/></span>
      <div className='confirmationSucceed'>
		<div>
        Congratulations <br />
        Your order is accepted.
      </div>
      <p>
        Lorem ipsum dolor sit, amet lor sit, amet consec consectetur adipisicifacere nulla neque! Voluptatem sunt provident cum tempore, enim{" "}
      </p>
		</div>
		<div className='confirmationButtons'>
		<button><a href="#">Track Order    <FaLocationArrow/></a></button>
		<button onClick={() => previousFunc('up')}>
			<AiOutlineHome/> Back To Home Page 
			</button>
		</div>
    </div>
  </div>
);

export default Confirmation;