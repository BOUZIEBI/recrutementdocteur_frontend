import LoginForm from '../components/LoginForm';
import ProceduresConditions from '@/features/home/components/ProceduresConditions';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white">
      <ProceduresConditions />
      <LoginForm />
    </div>
  );
}
