import React from "react";
import "./Footer.css";
import { Mail, Phone, MessageCircle, Globe } from "lucide-react";
import Whatsapp from "../../../../public/images/whatsapp.svg";

const Footer = () => {
  const now = new Date();

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Logo */}
            <div className="footer-column">
              <div className="logo-wrapper">
                <img
                  src="/images/लोगो.png"
                  alt="Logo"
                  className="footer-logo"
                />
              </div>

              <p className="footer-description">
                We will be available 24 hours for yours believable service.
              </p>

              <div className="social-icons">
                <a href="mailto:timsinamr91@gmail.com" className="social-btn">
                  <Mail size={20} />
                </a>

                <a
                  href="https://www.facebook.com/nirmala.dhamala.37/"
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12.07C22 6.507 17.523 2 12 2S2 6.507 2 12.07c0 5.017 3.657 9.176 8.438 9.93v-7.03H7.898v-2.9h2.54V9.845c0-2.52 1.492-3.913 3.777-3.913 1.094 0 2.238.197 2.238.197v2.476h-1.26c-1.242 0-1.63.775-1.63 1.57v1.885h2.773l-.443 2.9h-2.33V22c4.78-.754 8.437-4.913 8.437-9.93z" />
                  </svg>
                </a>

                <a href="tel:+9779862149172" className="social-btn">
                  <Phone size={20} />
                </a>

                <a
                  href="https://wa.me/9862028541"
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>WhatsApp</title>
                    <path
                      fill="red"
                      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                    />
                  </svg>
                </a>

                <a
                  href="https://www.youtube.com/@jointwithus"
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.5 6.2c-.3-1.2-1.2-2.1-2.4-2.4C19 3.2 12 3.2 12 3.2s-7 0-9.1.6C1.7 4.1.8 5 .5 6.2 0 8.3 0 12 0 12s0 3.7.5 5.8c.3 1.2 1.2 2.1 2.4 2.4 2.1.6 9.1.6 9.1.6s7 0 9.1-.6c1.2-.3 2.1-1.2 2.4-2.4.5-2.1.5-5.8.5-5.8s0-3.7-.5-5.8zM9.6 15.3V8.7l6.2 3.3-6.2 3.3z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-column">
              <h3 className="footer-title">Quick Links</h3>

              <ul className="footer-list">
                <li>
                  <a
                    href="https://www.youtube.com/@jointwithus"
                    target="_blank"
                    rel="noreferrer"
                  >
                    YouTube
                  </a>
                </li>

                <li>
                  <a href="#">Downloads</a>
                </li>
                <li>
                  <a
                    href="https://maps.app.goo.gl/sZLM4wGoNRzokkd38"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Location In Map
                  </a>
                </li>

                <li>
                  <a
                    href="https://maps.app.goo.gl/sZLM4wGoNRzokkd38"
                    target="_blank"
                    rel="noreferrer"
                  >
                    कोशी सेण्ट जेम्स आवासीमा माध्यमिक
                    <br />
                    विद्यालय, इटहरी - ९, सुनसरी (Koshi Saint <br /> James Sec.
                    School, Itahari - 9, Sunsari )
                  </a>
                </li>
              </ul>

              <div className="video-wrapper">
                <iframe
                  src="https://www.youtube.com/embed/XM7DA9goOoc?si=3LN0u2LHbXVs1fvv"
                  title="YouTube Video"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Useful Links */}
            <div className="footer-column">
              <h3 className="footer-title">Useful Links</h3>

              <ul className="footer-list">
                <li>
                  <a
                    href="https://mahilasaccos.coop.np/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Mahila Saccoss
                  </a>
                </li>

                <li>
                  <a href="/register">Payment Gateway</a>
                </li>
              </ul>

              <div className="extra-links">
                <p>
                  <a
                    href="https://itaharimun.gov.np/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    इटहरी उप-महानगरपालिका कार्यालय, इटहरी, सुनसरी
                  </a>
                </p>

                <p>
                  <a
                    href="https://see.gov.np/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    OFFICE OF THE CONTROLLER OF EXAMINATIONS (SEE), Grade 10
                  </a>
                </p>
              </div>

              <div className="video-wrapper">
                <iframe
                  src="https://www.youtube.com/embed/zIiOUGZqqk0"
                  title="YouTube Video"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Address */}
            <div className="footer-column">
              <h3 className="footer-title">Address</h3>

              <div className="info-row">
                <i className="fa-solid fa-location-dot"></i>
                <p>
                  इटहरी उप-महानगरपालिका, वडा नं. ४ आइतबारे (सदबहार मार्ग),
                  सुनसरी (कोशी प्रदेश)
                </p>
              </div>

              <h3 className="footer-title contact-title">
                Contact Information
              </h3>

              <div className="info-row">
                <i className="fa-solid fa-phone-volume"></i>
                <p>9862028541, 9842290880, 9862149172</p>
              </div>

              <div className="info-row">
                <i className="fa-solid fa-envelope"></i>
                <p>timsinamr91@gmail.com</p>
              </div>

              <div className="download-app">
                <h2>Download App</h2>

                <div className="store-buttons">
                  <a
                    href="https://www.jointwithus.com.np"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Google Play"
                      //   style={{ width: "100px", height: "50px" }}
                    />
                  </a>

                  <a
                    href="https://www.jointwithus.com.np"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                      alt="App Store"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <div>{now.getFullYear()}, All Rights Reserved.</div>

          <div className="developer-info">
            Design & Developed by
            <img src="/gif/Glove.gif" alt="" className="glove-icon" />
            <span>JOINT WITH US (जोइन्ट विथ अस) Pvt. Ltd</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
