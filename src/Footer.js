import footerImage from "./icons_assets/restaurant chef B.jpg";
import './App.css';
import './Footer.css'

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
            <img src={footerImage} alt="Footer Chef" height="200" />
            <nav>
                <ul>
                <h2>Site Map</h2>
                    <li><a href="/">Home</a></li>
                    <li><a href="/About">About</a></li>
                    <li><a href="/Menu">Menu</a></li>
                    <li><a href="/Reservations">Reservations</a></li>
                    <li><a href="/OrderOnline">Order Online</a></li>
                    <li><a href="/Login">Login</a></li>
                </ul>
            </nav>
            <nav>
                <ul>
                    <h2>Contact Us</h2>
                    <li><a href="/ContactUs">Address</a></li>
                    <li><a href="/ContactUs">Phone Number</a></li>
                    <li><a href="/email">eMail</a></li>
                </ul>
            </nav>            <nav>
                <ul>
                    <h2>Social Media</h2>
                    <li><a href="https://www.facebook.com">FaceBook</a></li>
                    <li><a href="https://www.linkedin.com">LinkedIn</a></li>
                    <li><a href="https://www.instagram.com">Instagram</a></li>
                </ul>
            </nav>
            </div>
        </footer>
    );
};

export default Footer;