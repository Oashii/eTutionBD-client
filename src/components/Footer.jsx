import React from 'react';
import xicon from '../assets/xicon.png'
import linkedin from '../assets/linkedin.png'
import fb from '../assets/fb.png'



const Footer = () => {
    return (
        <div className='px-10 py-5 bg-[#001931] text-white text-center mt-20'>
            <div className='flex justify-between items-center'>
            <h2 className='pl-2'>eTuitionBD</h2>
            <div className='content-center'>
                <h2>Social Media</h2>
                <div className='flex justify-between pt-2'>
                    <img src={xicon} alt="social icon" className='max-h-10'/>
                    <img src={linkedin} alt="social icon" className='max-h-20'/>
                    <img src={fb} alt="social icon" className='max-h-5 max-w-5'/>
                </div>
                <div className='pt-5'>
                    <h2>Contact Us</h2>
                    <p>Email: info@etuitionbd.com</p>
                    <p>Phone: +8801724378096</p>
                    <p>Address: Dhaka, Bangladesh</p>
                </div>
            </div>
        </div>
        <h1 className='pb-5'>eTuitionBD is a modern digital platform designed to connect <br />students with verified tutors in a safe, transparent, and efficient way. <br /> Our mission is to simplify the tuition process by offering structured <br />workflows, secure payments, and clear communication channels.</h1>
        <h2>Copyright © 2025 - All right reserved</h2>
        </div>
    );
};

export default Footer;