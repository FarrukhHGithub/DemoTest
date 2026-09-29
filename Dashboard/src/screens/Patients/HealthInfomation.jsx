import React from 'react';
import { sortsDatas } from '../../components/Datas';
import { Button, Input, Select, Textarea } from '../../components/Form';
import Modal from '../../components/Modals/Modal';
import { BiChevronDown, BiPlus } from 'react-icons/bi';
import { FiEye, FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { useHealthInformation } from './useHealthInformation';

function HealthInformation({ patientId, setHealthInfoData }) {
  const {
    healthRecords,
    selectedRecord,
    isAddOpen,
    setIsAddOpen,
    isEditOpen,
    setIsEditOpen,
    isViewOpen,
    setIsViewOpen,
    bloodType,
    setBloodType,
    weight,
    setWeight,
    height,
    setHeight,
    allergies,
    setAllergies,
    habits,
    setHabits,
    medicalHistory,
    setMedicalHistory,
    handleAddClick,
    handleEditClick,
    handleCreateSubmit,
    handleEditSubmit,
    handleDelete,
  } = useHealthInformation(patientId, setHealthInfoData);

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Header Block */}
        <div className="flex-btn gap-4">
          <h1 className="text-sm font-semibold text-main sm:block hidden">Health Information</h1>
          <div className="sm:w-1/4 w-full">
            <Button
              label="New Health Info"
              Icon={BiPlus}
              onClick={handleAddClick}
            />
          </div>
        </div>

        {/* Health Records List */}
        {healthRecords.length === 0 ? (
          <div className="text-center py-12 bg-dry rounded-2xl border border-dashed border-border">
            <p className="text-sm text-textGray">No health information records found for this patient.</p>
          </div>
        ) : (
          healthRecords.map((record) => (
            <div
              key={record._id || record.id}
              className="bg-white border border-border hover:shadow-md rounded-2xl p-6 transition-all duration-300 flex flex-col gap-4 relative overflow-hidden shadow-sm"
            >
              {/* Top Accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-subMain/40"></div>

              {/* Header Info Block */}
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-subMain/10 text-subMain rounded-xl flex items-center justify-center text-lg shadow-sm">
                    🩺
                  </div>
                  <div>
                    <h3 className="font-semibold text-main text-sm">Health Profile Details</h3>
                    <p className="text-[10px] text-textGray">
                      {record.createdAt ? new Date(record.createdAt).toLocaleString() : 'General Record'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 ml-auto">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                    Blood Type: {record.bloodType || 'N/A'}
                  </span>
                  
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => {
                        setIsViewOpen(true);
                      }}
                      title="View Health Info"
                      className="p-2.5 bg-blue-50 text-subMain hover:bg-subMain hover:text-white rounded-xl border border-blue-100/50 transition duration-200 text-xs shadow-sm"
                    >
                      <FiEye />
                    </button>
                    <button
                      onClick={() => handleEditClick(record)}
                      title="Edit Health Info"
                      className="p-2.5 bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white rounded-xl border border-amber-100/50 transition duration-200 text-xs shadow-sm"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(record.patientId || patientId)}
                      title="Delete Health Info"
                      className="p-2.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl border border-rose-100/50 transition duration-200 text-xs shadow-sm"
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </div>
              </div>

              {/* Grid content details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-dry p-4 rounded-xl border border-border/70">
                <div className="text-xs">
                  <span className="font-semibold text-main block mb-1">⚖️ Weight</span>
                  <p className="text-textGray leading-relaxed">{record.weight || 'N/A'}</p>
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-main block mb-1">📏 Height</span>
                  <p className="text-textGray leading-relaxed">{record.height || 'N/A'}</p>
                </div>
                {record.allergies && (
                  <div className="text-xs col-span-2 border-t border-border/40 pt-2">
                    <span className="font-semibold text-main block mb-1">🚫 Allergies</span>
                    <p className="text-textGray leading-relaxed">{record.allergies}</p>
                  </div>
                )}
                {record.habits && (
                  <div className="text-xs col-span-2 border-t border-border/40 pt-2">
                    <span className="font-semibold text-main block mb-1">🚬 Habits</span>
                    <p className="text-textGray leading-relaxed">{record.habits}</p>
                  </div>
                )}
                {record.medicalHistory && (
                  <div className="text-xs col-span-2 border-t border-border/40 pt-2">
                    <span className="font-semibold text-main block mb-1">📜 Medical History</span>
                    <p className="text-textGray leading-relaxed">{record.medicalHistory}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* View Modal */}
      {isViewOpen && selectedRecord && (
        <Modal
          closeModal={() => setIsViewOpen(false)}
          isOpen={isViewOpen}
          title="Health Information Details"
          width="max-w-xl"
        >
          <div className="space-y-4 text-left p-2">
            <div className="grid grid-cols-3 gap-4 pb-4 border-b border-border">
              <div>
                <p className="text-xs font-semibold text-textGray">Blood Type</p>
                <p className="text-sm font-bold text-main mt-1">{selectedRecord.bloodType || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-textGray">Weight</p>
                <p className="text-sm font-bold text-main mt-1">{selectedRecord.weight || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-textGray">Height</p>
                <p className="text-sm font-bold text-main mt-1">{selectedRecord.height || 'N/A'}</p>
              </div>
            </div>
            {selectedRecord.allergies && (
              <div className="pb-4 border-b border-border">
                <p className="text-xs font-semibold text-textGray">Allergies</p>
                <p className="text-sm text-main mt-1 leading-relaxed">{selectedRecord.allergies}</p>
              </div>
            )}
            {selectedRecord.habits && (
              <div className="pb-4 border-b border-border">
                <p className="text-xs font-semibold text-textGray">Habits</p>
                <p className="text-sm text-main mt-1 leading-relaxed">{selectedRecord.habits}</p>
              </div>
            )}
            {selectedRecord.medicalHistory && (
              <div>
                <p className="text-xs font-semibold text-textGray">Medical History</p>
                <p className="text-sm text-main mt-1 leading-relaxed">{selectedRecord.medicalHistory}</p>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Add Modal */}
      {isAddOpen && (
        <Modal
          closeModal={() => setIsAddOpen(false)}
          isOpen={isAddOpen}
          title="Add Health Information"
          width="max-w-xl"
        >
          <div className="flex flex-col gap-4 text-left p-2">
            <div className="flex w-full flex-col gap-2">
              <p className="text-main text-xs font-semibold uppercase tracking-wider">Blood Group</p>
              <Select
                selectedPerson={bloodType}
                setSelectedPerson={setBloodType}
                datas={sortsDatas.bloodTypeFilter}
              >
                <div className="w-full flex-btn text-main text-sm px-4 py-3 bg-dry border border-border font-medium rounded-xl focus:ring-2 focus:ring-subMain focus:border-transparent transition-all outline-none flex justify-between items-center cursor-pointer">
                  {bloodType?.name} <BiChevronDown className="text-lg text-gray-500" />
                </div>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Weight" color={true} type="text" placeholder={'e.g. 60kg'} value={weight} onChange={(e) => setWeight(e.target.value)} />
              <Input label="Height" color={true} type="text" placeholder={'e.g. 5.5ft'} value={height} onChange={(e) => setHeight(e.target.value)} />
            </div>

            <div className="flex flex-col gap-3">
              <Textarea label="Allergies" color={true} rows={3} placeholder={'e.g. Beans, nuts, penicillin, etc.'} value={allergies} onChange={(e) => setAllergies(e.target.value)} />
              <Textarea label="Habits" color={true} rows={3} placeholder={'e.g. Smoking, drinking, caffeine, etc.'} value={habits} onChange={(e) => setHabits(e.target.value)} />
              <Textarea label="Medical History" color={true} rows={3} placeholder={'e.g. Diabetes, malaria, glaucoma, hypertension, etc.'} value={medicalHistory} onChange={(e) => setMedicalHistory(e.target.value)} />
            </div>

            <div className="flex justify-end mt-4">
              <div className="w-full sm:w-1/3">
                <Button
                  label={'Save Record'}
                  Icon={HiOutlineCheckCircle}
                  onClick={handleCreateSubmit}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Modal */}
      {isEditOpen && selectedRecord && (
        <Modal
          closeModal={() => setIsEditOpen(false)}
          isOpen={isEditOpen}
          title="Edit Health Information"
          width="max-w-xl"
        >
          <div className="flex flex-col gap-4 text-left p-2">
            <div className="flex w-full flex-col gap-2">
              <p className="text-main text-xs font-semibold uppercase tracking-wider">Blood Group</p>
              <Select
                selectedPerson={bloodType}
                setSelectedPerson={setBloodType}
                datas={sortsDatas.bloodTypeFilter}
              >
                <div className="w-full flex-btn text-main text-sm px-4 py-3 bg-dry border border-border font-medium rounded-xl focus:ring-2 focus:ring-subMain focus:border-transparent transition-all outline-none flex justify-between items-center cursor-pointer">
                  {bloodType?.name} <BiChevronDown className="text-lg text-gray-500" />
                </div>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Weight" color={true} type="text" placeholder={'e.g. 60kg'} value={weight} onChange={(e) => setWeight(e.target.value)} />
              <Input label="Height" color={true} type="text" placeholder={'e.g. 5.5ft'} value={height} onChange={(e) => setHeight(e.target.value)} />
            </div>

            <div className="flex flex-col gap-3">
              <Textarea label="Allergies" color={true} rows={3} placeholder={'e.g. Beans, nuts, penicillin, etc.'} value={allergies} onChange={(e) => setAllergies(e.target.value)} />
              <Textarea label="Habits" color={true} rows={3} placeholder={'e.g. Smoking, drinking, caffeine, etc.'} value={habits} onChange={(e) => setHabits(e.target.value)} />
              <Textarea label="Medical History" color={true} rows={3} placeholder={'e.g. Diabetes, malaria, glaucoma, hypertension, etc.'} value={medicalHistory} onChange={(e) => setMedicalHistory(e.target.value)} />
            </div>

            <div className="flex justify-end mt-4">
              <div className="w-full sm:w-1/3">
                <Button
                  label={'Save Changes'}
                  Icon={HiOutlineCheckCircle}
                  onClick={handleEditSubmit}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default HealthInformation;
