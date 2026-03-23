import { useState } from 'react';
import ProductForm from "../components/ProductForm";
import AdminProduct from '../components/AdminProduct';
import Analytics from '../components/Analytics';
import CategoryForm from '../components/CategoryForm';
import Navbar from "../components/Navbar";
import { Cylinder, FunnelPlus, ChartNoAxesCombined, Columns4 } from "lucide-react";
import Footer from '../components/Footer';

const sections = [
  {
    title: "Category",
    Icon: Columns4
  },
  {
    title: "Create",
    Icon: FunnelPlus
  },
  {
    title: "Products",
    Icon: Cylinder
  },
  {
    title: "Analytics",
    Icon: ChartNoAxesCombined
  }
];

const AdminPage = () => {
  const [section, setSection] = useState("Create");

  return (
    <div
      className='w-full h-auto'
    >
      <Navbar />
      <h1
        style={{
          textShadow:
            "2px 2px 20px rgba(255, 255, 255, 0.3), 2px 2px 30px rgba(255, 255, 255, 0.4)"
        }}
        className="text-center my-6 font-bold text-2xl text-white"
      >
        Admin Desk
      </h1>
      <div className='grid grid-cols-3 gap-3 w-full md:w-5/12 mx-auto'>
        {
          sections.map((Section, index) => (
            <div
              key={index}
              onClick={() => { setSection(Section.title) }}
              className={`flex justify-center items-center gap-2 bg-zinc-800 text-white
              py-1 cursor-pointer rounded-md w-full ${section == Section.title ? "bg-zinc-600" : ""}`}>
              <span className='hidden md:inline-block whitespace-nowrap'>{Section.title}</span>
              <Section.Icon />
            </div>
          ))
        }
      </div>
      <div className='flex justify-center items-start h-auto pt-5 mt-10 mb-20'>
        {section === "Create" ? <ProductForm /> : section === "Products" ? <AdminProduct /> : section === "Category" ? <CategoryForm /> : <Analytics />}
      </div>
      <Footer />
    </div>
  )
}

export default AdminPage;