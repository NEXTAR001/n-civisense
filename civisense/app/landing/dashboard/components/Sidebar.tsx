import { Car, CarTaxiFront, CreditCard, FileText, GraduationCap, HeartPulse, Leaf, LeafIcon } from 'lucide-react';
import React, { useState } from 'react';
import { FaFirstAid } from 'react-icons/fa';
import { FiFileText, FiCreditCard, FiUsers, FiLogOut } from 'react-icons/fi';
import { GiFirstAidKit } from 'react-icons/gi';
import { MdDashboard, MdOutlineDashboard } from 'react-icons/md';

interface SidebarItem {
  id: string;
  icon: React.ReactNode;
  label: string;
}

const sidebarItems: SidebarItem[] = [
  { id: 'nimc', icon: <FileText size={18} />, label: "NIMC" },
  { id: 'firs', icon: <CreditCard size={18} />, label: "FIRS" },
  { id: 'frsc', icon: <Car size={18} />, label: "FRSC" },
  { id: 'education', icon: <GraduationCap size={18} />, label: "Education" },
  { id: 'health', icon: <HeartPulse size={18} />, label: "Health" },
  { id: 'agriculture', icon: <Leaf size={18} />, label: "Agriculture" },
];

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('nimc'); // Set NIMC as default active

  return (
    <aside className="w-52 xl:w-60 2xl:w-64 bg-gray-50 border-r border-gray-200 p-6 flex flex-col">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-lg 2xl:text-xl font-medium">n-CIVISENSE</h1>
        <button className="text-gray-500 hover:text-gray-700" aria-label="Toggle Sidebar">
          <MdOutlineDashboard className='xl:size-5'/>
        </button>
      </div>

      <nav className="space-y-2">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 text-[10px] xl:text-xs 2xl:text-sm font-medium rounded-lg transition-colors ${
              activeItem === item.id
                ? 'bg-[#16A34A10] text-black'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveItem(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <button className="mt-auto flex items-center space-x-4 text-gray-600 hover:text-gray-900">
        <FiLogOut className="text-lg" />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
