import insta from '../../assets/instagram-logo-instagram-icon-transparent-free-png.webp';
import youtube from '../../assets/youtube-logo-youtube-icon-transparent-free-png.webp';
import facebook from '../../assets/fb.png';
import gmail from '../../assets/gmail-icon-logo-black-and-white.png';
import whatsapp from '../../assets/whatsapp-logo-whatsapp-logo-transparent-whatsapp-icon-transparent-free-free-png.webp';

const Footer = () => {
    return (
      <footer className="bg-green-100 text-black-700 py-10">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-semibold">About Us</h2>
            <p className="mt-2 text-sm">
              Dharay Ayurveda provides high-quality herbal products with a commitment to purity and authenticity.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Quick Links</h2>
            <ul className="mt-2 space-y-2 text-sm flex gap-1">
              <li><a href="https://www.instagram.com/dharayayurveda" target="_blank" rel="noopener noreferrer">
                <img src={insta} alt='' className='w-12 h-12 mt-4'/>
              </a></li>
              <li><a href="https://www.facebook.com/people/Dharay-Ayurveda/61571668746109/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                <img src={facebook} alt='' className='h-10 w-10 mt-4'/>
              </a></li>
              <li><a href="https://youtube.com/@dharayayurveda?si=tIaEoPK4p4gmt8w6" target="_blank" rel="noopener noreferrer">
                <img src={youtube} alt='' className='h-13 w-13 mt-4'/>
              </a></li>
              <li><a href="mailto:dharayayurveda@gmail.com">
                <img src={gmail} alt='' className='h-8 w-10 mt-4'/>
              </a></li>
              <li><a href="https://wa.me/919001908599" target="_blank" rel="noopener noreferrer">
                <img src={whatsapp} alt='' className='h-12 w-12 mt-4'/>
              </a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Contact Us</h2>
            <p className="mt-2 text-sm">Email: dharayayurveda@gmail.com</p>
            <p className="text-sm">Rajvender Singh's Phone: +91 9001908599 </p>
            <p className="text-sm">Address: 141 shri karni uma vihar <br /> Gokulpura <br /> JAIPUR, RAJASTHAN 302012 </p>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 mt-8 border-t pt-4">
          &copy; {new Date().getFullYear()} Dharay Ayurveda. All rights reserved.
        </div>
      </footer>
    );
};

export default Footer;
