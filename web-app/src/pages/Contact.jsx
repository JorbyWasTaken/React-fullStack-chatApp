import React from 'react';
import emailjs from 'emailjs-com';

export const ContactUs = () => {
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_otzx06l', 'template_16rbr7k', e.target, 'eq8UPSDEfjysxnJ3a')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          e.target.reset();
    };
return(
        <div>
            <div className=''>
        <form onSubmit={sendEmail}>
        <input type='text' placeholder='name' name='name'></input>
        <input type='text' placeholder='enter phone number' name='phonenumber'></input>
        <input type='email' placeholder='enter email' name='email'></input>
        <input type='text' placeholder='message' name='message'></input>
        <input type='submit' value='Send Message'></input>
        </form>
            </div>
        </div>
    )
};