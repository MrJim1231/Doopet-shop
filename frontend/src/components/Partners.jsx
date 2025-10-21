import React from "react";
import logo1 from "../assets/images/Brand-Logo.png";
import logo2 from "../assets/images/Brand-Logo-2.png";
import logo3 from "../assets/images/Brand-Logo-3.png";
import logo4 from "../assets/images/Brand-Logo-4.png";
import logo5 from "../assets/images/Brand-Logo-5.png";

function Partners() {
  const logos = [logo1, logo2, logo3, logo4, logo5];

  return (
    <section className="partners">
      <div className="partners__container">
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Партнёр ${index + 1}`}
            className="partners__logo"
          />
        ))}
      </div>
    </section>
  );
}

export default Partners;
