const Footer = () => {
    return (
      <footer className="bg-black text-white py-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Jeremy Eramian. All rights reserved.
        </p>
      </footer>
    );
};

export default Footer;