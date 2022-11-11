import { Link } from "react-router-dom";

function Nav () {
  return (
    <nav>
      <div id="logo">
        Instagram
      </div>
      <div id="search">

      </div>
      <div id="nav-btns">
        <Link to='test'>test</Link>
      </div>
    </nav>
  )
} 

export default Nav;