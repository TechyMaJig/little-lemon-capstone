import './App.css';
import './Nav.css';

function Nav() {

    return (
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/About">About</a></li>
                <li><a href="/Menu">Menu</a></li>
                <li><a href="/Reservations">Reservations</a></li>
                <li><a href="/OrderOnline">Order Online</a></li>
                <li><a href="/Login">Login</a></li>
            </ul>
        </nav>
    );
}

export default Nav;