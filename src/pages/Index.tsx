import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page for hospital staff
    navigate('/login');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">OrganLink Hospital Portal</h1>
        <p className="text-xl">Redirecting to login...</p>
      </div>
    </div>
  );
};

export default Index;
