import LoginForm from '../components/LoginForm';
import ProceduresConditions from '@/features/home/components/ProceduresConditions';

export default function LoginPage() {
  return (
    <section className="pt-2 pb-24 bg-gray-50 ">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="">
    
              <ProceduresConditions />
              <LoginForm />
    
            </div>
          </div>
    </section>
  );
}
