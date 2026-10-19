import PreinscriptionForm from '../components/PreinscriptionForm';
import ProceduresConditions from '@/features/home/components/ProceduresConditions';

export default function PreinscriptionPage() {
  return (
    <div className="min-h-screen bg-white">
      <ProceduresConditions />
      <PreinscriptionForm />
    </div>
  );
}
