import React from 'react';
import { Link } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import Layout from '../../Layout';
import PersonalInfo from '../../components/UsedComp/PersonalInfo';

function CreatePatient() {
  return (
    <Layout>
      <div className="flex items-center gap-3">
        <Link
          to="/patients"
          className="bg-white border border-subMain border-dashed rounded-lg py-2 px-3 text-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <IoArrowBackOutline />
        </Link>
        <h1 className="text-lg sm:text-xl font-bold text-main">Create Patient</h1>
      </div>
      <div
        className="bg-white my-5 rounded-xl border border-border p-4 sm:p-5 shadow-xs"
      >
        <PersonalInfo titles={false} />
      </div>
    </Layout>
  );
}

export default CreatePatient;