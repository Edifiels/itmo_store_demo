function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Fake Store</h3>
            <p>Демонстрационный проект React</p>
          </div>
          
          <div className="footer-section">
            <h4>Технологии</h4>
            <ul>
              <li>React 18</li>
              <li>React Router</li>
              <li>Context API</li>
              <li>Vite</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} React Demo Project. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
