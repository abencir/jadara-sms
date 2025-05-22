const Footer: React.FC = () => {
    return (
      <footer style={{ backgroundColor: '#0080FF' }} className="bg-gray-100 text-center py-4 mt-auto">
        <div className="text-lg font-semibold text-blue-600">
        </div>
        <p className="text-sm text-white">Copyright &copy; {new Date().getFullYear()} JADARA ACADEMY. All rights reserved.</p>
      </footer>
    );
  };
  
  export default Footer;
  