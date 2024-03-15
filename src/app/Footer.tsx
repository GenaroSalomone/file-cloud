import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative z-10 h-40 bg-gray-100 mt-12 flex items-center">
      <div className="container mx-auto flex justify-between items-center">
        <div>FileCloud</div>
        <Link className="text-blue-400 hover:text-blue-500" href="/privacy">
          Privacy Policy
        </Link>
        <Link
          className="text-blue-400 hover:text-blue-500"
          href="/terms-of-service"
        >
          Terms of Service
        </Link>
        <Link className="text-blue-400 hover:text-blue-500" href="/about">
          About
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
