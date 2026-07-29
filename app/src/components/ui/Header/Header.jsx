import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [nepaliTime, setNepaliTime] = useState("लोड हुँदैछ...");
  const [isCompactHeader, setIsCompactHeader] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 1024 : false,
  );

  useEffect(() => {
    const nepaliDays = [
      "आइतवार",
      "सोमवार",
      "मंगलवार",
      "बुधवार",
      "बिहिवार",
      "शुक्रवार",
      "शनिवार",
    ];

    const nepaliMonths = [
      "बैशाख",
      "जेठ",
      "असार",
      "श्रावण",
      "भदौ",
      "असोज",
      "कार्तिक",
      "मंसिर",
      "पौष",
      "माघ",
      "फाल्गुण",
      "चैत्र",
    ];

    const nepaliDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

    const toNepaliNumber = (num) =>
      num
        .toString()
        .split("")
        .map((d) => nepaliDigits[d] ?? d)
        .join("");

    const referenceAD = new Date("2025-04-14T00:00:00+05:45");

    const referenceBS = {
      year: 2082,
      month: 1,
      day: 1,
    };

    const bsMonthDays = [31, 32, 31, 32, 31, 30, 30, 29, 29, 29, 30, 30];

    const convertToBS = (date) => {
      const nstOffset = 5.75 * 60 * 60 * 1000;
      const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
      const nstTime = utcTime + nstOffset;

      const referenceNST = referenceAD.getTime();

      let diffDays = Math.floor(
        (nstTime - referenceNST) / (1000 * 60 * 60 * 24),
      );

      let year = referenceBS.year;
      let month = referenceBS.month;
      let day = referenceBS.day;

      while (diffDays !== 0) {
        if (diffDays > 0) {
          day++;

          if (day > bsMonthDays[month - 1]) {
            day = 1;
            month++;

            if (month > 12) {
              month = 1;
              year++;
            }
          }

          diffDays--;
        } else {
          day--;

          if (day < 1) {
            month--;

            if (month < 1) {
              month = 12;
              year--;
            }

            day = bsMonthDays[month - 1];
          }

          diffDays++;
        }
      }

      return { year, month, day };
    };

    const updateNepaliTime = () => {
      const now = new Date();

      const nstOffset = 5.75 * 60 * 60 * 1000;
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
      const nstTime = new Date(utcTime + nstOffset);

      const hour = nstTime.getHours();
      const minutes = nstTime.getMinutes();
      const seconds = nstTime.getSeconds();

      const bs = convertToBS(now);

      const amPm = hour < 12 ? "पूर्वाह्न" : "अपराह्न";

      setNepaliTime(
        `नेपाली समय ${toNepaliNumber(
          String(hour).padStart(2, "0"),
        )}:${toNepaliNumber(String(minutes).padStart(2, "0"))}:${toNepaliNumber(
          String(seconds).padStart(2, "0"),
        )} ${amPm}   ${toNepaliNumber(bs.year)} ${
          nepaliMonths[bs.month - 1]
        } ${toNepaliNumber(bs.day)} ${nepaliDays[nstTime.getDay()]}`,
      );
    };

    updateNepaliTime();
    const interval = setInterval(updateNepaliTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsCompactHeader(window.innerWidth <= 1024);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="header-wrapper">
      {!isCompactHeader ? (
        <div className="header-left">
          <img
            src="/gif/ओमकार.gif"
            alt=""
            style={{
              height: "120px",
              width: "auto",
            }}
          />

          <div className="header-brand">
            <img
              src="/gif/स्वागत छ.gif"
              alt=""
              style={{
                height: "85px",
                marginBottom: "10px",
              }}
            />

            <Link to="/" style={{ textDecoration: "none" }}>
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: "600",
                  color: "#000",
                  lineHeight: "1.2",
                }}
              >
                JOIN WITH US
              </div>

              <div
                style={{
                  fontSize: "22px",
                  color: "#000",
                  lineHeight: "1.2",
                  marginBottom: "8px",
                }}
              >
                (जोइन्ट विथ अस)
              </div>
            </Link>
          </div>
        </div>
      ) : null}

      <div className="header-center">
        {isCompactHeader ? (
          <div className="header-brand-mobile">
            <Link to="/" style={{ textDecoration: "none" }}>
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: "600",
                  color: "#000",
                  lineHeight: "1.2",
                }}
              >
                JOIN WITH US
              </div>

              <div
                style={{
                  fontSize: "22px",
                  color: "#000",
                  lineHeight: "1.2",
                  marginBottom: "8px",
                }}
              >
                (जोइन्ट विथ अस)
              </div>
            </Link>
          </div>
        ) : (
          <>
            <img
              src="/images/khaiKHo.png"
              alt=""
              style={{
                height: "140px",
                width: "auto",
              }}
            />

            <img
              src="/gif/Flag.gif"
              alt=""
              style={{
                height: "90px",
                width: "auto",
              }}
            />

            <img
              src="/images/लोगो.png"
              alt=""
              style={{
                height: "90px",
                width: "auto",
              }}
            />

            <img
              src="/gif/Flag.gif"
              alt=""
              style={{
                height: "90px",
                width: "auto",
                transform: "scaleX(-1)",
              }}
            />

            <img
              src="/images/khaiKHo.png"
              alt=""
              style={{
                height: "140px",
                width: "auto",
              }}
            />
          </>
        )}
      </div>

      {!isCompactHeader ? (
        <div className="header-right">
          <div
            style={{
              backgroundColor: "#2563eb",
              color: "#fff",
              width: "330px", // Fixed width
              minWidth: "330px",
              borderRadius: "10px 0 0 10px",
              padding: "10px 10px",
              margin: "8px 0px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              fontSize: "14px",
              padding: "0 12px",
            }}
          >
            <div
              className="transaction"
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                
              }}
            >
              Transaction Hour:
            </div>
            <div
              className="time-1"
              
            >
              10:00 AM to 3:00 PM (Sun To Thu)
            </div>
            <div
              className="time-2"
           
            >
              10:00 AM to 2:00 PM (Fri)
            </div>
            <div style={{ marginTop: "5px" }}>{nepaliTime}</div>
            <a
              href="https://jointwithus.com.np/register"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h2
                className="membership-title"
                style={{
                  fontWeight: "1000",
                  marginTop: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Membership Form
              </h2>
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
