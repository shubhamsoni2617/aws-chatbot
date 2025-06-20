import Logo from "../../../assets/image.png";
import image from "../../../assets/Signup/Image.png";
import "./AuthLayout.css";

const AuthLayout = (props: any) => {
  return (
    <div className="auth-wrapper">
      <img src={image} className="background-image" alt="Background" />
      <div id="siteWrapper" className="styled-wrapper" {...props}>
        <header role="banner" className="styled-header">
          <div className="logo-container">
            <img src={Logo} alt="Logo" className="companyLogo h-[32px]"/>
          </div>
        </header>
        <main id="mainContent" className="styled-main">
          
            <div className="font-bold text-lg text-gray-800 mb-10 -mt-10 leading-6">
              {props.heading}</div>
            
            <div className="children-content">{props.children}</div>
          
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
