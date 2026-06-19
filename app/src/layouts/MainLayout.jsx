import { Link } from "react-router-dom";

/**
 * MainLayout Component
 * Default site layout with header, navigation, and footer
 */
export function MainLayout({
  title,
  description,
  children,
  breadcrumbRight,
  headerRight,
}) {
  return (
    <>
      <header>
        <div className="header-section">
          <div className="elc-container">
            <div className="header-holder flex flex-middle flex-wrap flex-between">
              <div className="header-logo">
                <Link to="/" className="logo">
                  <img
                    src="/assets/images/ratopati-logo_zD9OASMMFx.png"
                    alt="Logo"
                  />
                </Link>
              </div>
              <div className="header-right">
                <img
                  src="/assets/images/election-2082_UbmQ0ktDVN.png"
                  alt="प्रतिनिधि सभा निर्वाचन २०८२"
                />
              </div>
              <span className="btn-search fa fa-search btn-trigger"></span>
              <button type="button" className="hamburger">
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="navigation">
        <div className="elc-container">
          <div className="menu-container">
            <ul>
              <li>
                <Link to="/">होम पेज</Link>
              </li>
              <li>
                <Link to="/candidates">उम्मेदवारहरु</Link>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  निर्वाचन
                </a>
                <ul>
                  <li>
                    <Link to="/province/koshi">कोशी प्रदेश</Link>
                  </li>
                  <li>
                    <Link to="/province/madhesh">मधेस प्रदेश</Link>
                  </li>
                  <li>
                    <Link to="/province/bagmati">बागमती प्रदेश</Link>
                  </li>
                  <li>
                    <Link to="/province/gandaki">गण्डकी प्रदेश</Link>
                  </li>
                  <li>
                    <Link to="/province/lumbini">लुम्बिनी प्रदेश</Link>
                  </li>
                  <li>
                    <Link to="/province/karnali">कर्णाली प्रदेश</Link>
                  </li>
                  <li>
                    <Link to="/province/sudurpaschim">सुदूरपश्चिम प्रदेश</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/parties">राजनीतिक दल</Link>
              </li>
              <li>
                <Link to="/hot-seats">हट सिटहरु</Link>
              </li>
              <li>
                <Link to="/vote-difference">मतान्तर</Link>
              </li>
              <li>
                <Link to="/popular-candidates">चर्चित उम्मेदवारहरु</Link>
              </li>
              <li>
                <Link to="/manifesto">घोषणा पत्र</Link>
              </li>
              <li>
                <Link to="/videos">निर्वाचन भिडियो</Link>
              </li>
              <li>
                <a
                  href="https://www.ratopati.com/segment/parliament-election-2082"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  समाचार
                </a>
              </li>
            </ul>
            <div className="nav-right">
              <span className="btn-search fa fa-search btn-trigger"></span>
              <a
                className="button"
                href="https://www.ratopati.com/"
                target="_blank"
                rel="noreferrer noopener"
              >
                रातोपाटी होमपेज
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="black-overlay"></div>
      <div className="full-banner-adv">
        <div
          className="elc-container el-placeholder"
          data-position="election-below-navbar"
        ></div>
      </div>

      <div className="elec-content-wrap">
        <section className="section section-candidates section-bottom">
          <div className="elc-container">
            <div className="backward flex flex-wrap flex-between flex-middle">
              <div className="breadcrumb">
                <Link to="/">प्रतिनिधि सभा निर्वाचन २०८२</Link>
                <span className="sep">/</span>
                <span>{title}</span>
              </div>
              {breadcrumbRight}
            </div>
            <div className="page-header flex flex-between flex-middle flex-wrap">
              <div>
                <h3 className="page-title">{title}</h3>
                {description ? <p>{description}</p> : null}
              </div>
              {headerRight}
            </div>
            {children}
          </div>
        </section>
      </div>
    </>
  );
}

export default MainLayout;
