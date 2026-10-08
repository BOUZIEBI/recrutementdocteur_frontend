import { adminItems } from '@/data/navigation';
import Sidebar from './Sidebar';


function AdminSidebar({ isOpen }: { isOpen: boolean }) {
  return <Sidebar isOpen={isOpen} items={adminItems} />;
}

export default AdminSidebar;
