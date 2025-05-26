const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: '#0080FF' }} className="text-center py-4 mt-auto w-full">
      <div className="text-lg font-semibold text-blue-600">
      </div>
      <p className="text-xs text-white">Copyright &copy; {new Date().getFullYear()} JADARA ACADEMY. All rights reserved.</p>
    </footer>
  );
};

export default Footer;