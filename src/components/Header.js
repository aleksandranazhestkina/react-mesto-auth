import HeaderLogo from '../images/HeaderLogo.svg';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={HeaderLogo} alt="Место" />
    </header>
  );
}
export default Header;