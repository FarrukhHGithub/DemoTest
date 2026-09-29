import React, { useState, useEffect } from 'react';
import { BiPlus, BiTrash } from 'react-icons/bi';
import { Button, Checkbox, Input } from '../../components/Form';
import axios from 'axios';
import DentalChartTable from './DentalChartTable';
import { useParams } from 'react-router-dom';
import BASE_URL from '../../baseUrl.jsx';

function DentalChart() {
  const { id } = useParams();
  const [seriousDisease, setSeriousDisease] = useState('');
  const [dentalConditions, setDentalConditions] = useState([
    { name: 'cavity', checked: false },
    { name: 'gumDisease', checked: false },
    { name: 'toothDecay', checked: false },
    { name: 'gingivitis', checked: false },
    { name: 'halitosis', checked: false },
    { name: 'oralCancer', checked: false }
  ]);
  const [mentalHealthIssues, setMentalHealthIssues] = useState(['Anxiety', 'Depression', 'Bipolar Disorder']);
  const [otherFields, setOtherFields] = useState({
    allergies: '',
    medications: ''
  });
  const [newDentalCondition, setNewDentalCondition] = useState('');
  const [newMentalHealthIssue, setNewMentalHealthIssue] = useState('');
  const [submittedData, setSubmittedData] = useState([]);

  useEffect(() => {
    if (!id) return;
  
    // console.log("Fetching data for patient ID:", id);
  
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/api/dental-chart/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        // console.log("Full Response:", response); // Debugging log
        // console.log("Response Data:", response.data);
  
        setSubmittedData(response.data); // Set the array properly
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response) {
          console.error("Error message:", error.response.data);
        }
      }
    };
  
    fetchData();
  }, [id]);

  const handleInputChange = (event) => {
    setSeriousDisease(event.target.value);
  };

  const handleCheckboxChange = (index) => {
    const newConditions = [...dentalConditions];
    newConditions[index].checked = !newConditions[index].checked;
    setDentalConditions(newConditions);
  };

  const handleMentalHealthChange = (event) => {
    const { value } = event.target;
    setMentalHealthIssues((prevState) => [...prevState, value]);
  };

  const handleOtherFieldChange = (event) => {
    const { name, value } = event.target;
    setOtherFields((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BASE_URL}/api/dental-chart/`,
        {
          patientId: id, // Include patient ID
          seriousDisease,
          dentalConditions: dentalConditions.filter(condition => condition.checked).map(condition => condition.name),
          mentalHealthIssues,
          ...otherFields
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setSubmittedData((prevData) => [...prevData, response.data]);
      setSeriousDisease('');
      setDentalConditions([
        { name: 'cavity', checked: false },
        { name: 'gumDisease', checked: false },
        { name: 'toothDecay', checked: false },
        { name: 'gingivitis', checked: false },
        { name: 'halitosis', checked: false },
        { name: 'oralCancer', checked: false }
      ]);
      setMentalHealthIssues(['Anxiety', 'Depression', 'Bipolar Disorder']);
      setOtherFields({
        allergies: '',
        medications: ''
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${BASE_URL}/api/dental-chart/${id.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSubmittedData((prevData) => prevData.filter(data => data._id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addNewCondition = () => {
    if (newDentalCondition.trim() === '') return;
    setDentalConditions((prevState) => [
      ...prevState,
      { name: newDentalCondition.toLowerCase(), checked: true }
    ]);
    setNewDentalCondition('');
  };

  const removeCondition = (index) => {
    const newConditions = [...dentalConditions];
    newConditions.splice(index, 1);
    setDentalConditions(newConditions);
  };

  const addNewMentalHealthIssue = () => {
    if (newMentalHealthIssue.trim() === '') return;
    setMentalHealthIssues((prevState) => [...prevState, newMentalHealthIssue]);
    setNewMentalHealthIssue('');
  };

  const removeMentalHealthIssue = (index) => {
    const newIssues = [...mentalHealthIssues];
    newIssues.splice(index, 1);
    setMentalHealthIssues(newIssues);
  };

  return (
    <div className="p-6 bg-white border border-border rounded-2xl shadow-sm">
      <h2 className="text-base font-bold text-main mb-6">Dental Chart</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="seriousDisease" className="block text-xs font-semibold text-main uppercase tracking-wider mb-2">
            Serious Disease (if any)
          </label>
          <input
            type="text"
            id="seriousDisease"
            name="seriousDisease"
            value={seriousDisease}
            onChange={handleInputChange}
            placeholder="e.g. Heart disease, Diabetes"
            className="w-full text-sm text-main rounded-xl bg-dry border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-subMain focus:border-transparent transition-all"
          />
        </div>
        
        <div>
          <label className="block text-xs font-semibold text-main uppercase tracking-wider mb-2">Dental Conditions</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-dry p-4 rounded-xl border border-border">
            {dentalConditions.map((condition, index) => (
              <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-border" key={index}>
                <div className="flex items-center">
                  <Checkbox
                    id={condition.name}
                    name={condition.name}
                    checked={condition.checked}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <label htmlFor={condition.name} className="ml-2.5 text-xs font-medium text-main capitalize">
                    {condition.name.replace(/([A-Z])/g, ' $1')}
                  </label>
                </div>
                <button onClick={() => removeCondition(index)} className="text-red-500 hover:text-red-700 transition">
                  <BiTrash className="text-sm" />
                </button>
              </div>
            ))}
            <div className="flex items-center gap-2 col-span-1 sm:col-span-2 mt-2">
              <input
                type="text"
                value={newDentalCondition}
                onChange={(e) => setNewDentalCondition(e.target.value)}
                placeholder="Add condition"
                className="flex-grow text-xs text-main rounded-lg bg-white border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-subMain focus:border-transparent transition-all"
              />
              <button
                onClick={addNewCondition}
                className="bg-subMain hover:bg-opacity-95 text-white p-2 rounded-lg transition duration-200 flex items-center justify-center shadow-sm"
              >
                <BiPlus className="text-base" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="mentalHealth" className="block text-xs font-semibold text-main uppercase tracking-wider mb-2">
          Mental Health Issues
        </label>
        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-dry border-b border-border">
                <th className="px-4 py-2.5 text-xs font-semibold text-textGray uppercase tracking-wider">Issue</th>
                <th className="px-4 py-2.5 text-xs font-semibold text-textGray uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {mentalHealthIssues.map((issue, index) => (
                <tr key={index} className="border-b border-border hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-sm text-main font-medium">{issue}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => removeMentalHealthIssue(index)} className="text-red-500 hover:text-red-700 transition">
                      <BiTrash className="text-sm inline-block" />
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="bg-dry/40">
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={newMentalHealthIssue}
                    onChange={(e) => setNewMentalHealthIssue(e.target.value)}
                    placeholder="Add new mental health issue"
                    className="w-full text-xs text-main rounded-lg bg-white border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-subMain focus:border-transparent transition-all"
                  />
                </td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={addNewMentalHealthIssue}
                    className="bg-subMain hover:bg-opacity-95 text-white p-2 rounded-lg transition duration-200 inline-flex items-center justify-center shadow-sm"
                  >
                    <BiPlus className="text-sm" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label htmlFor="allergies" className="block text-xs font-semibold text-main uppercase tracking-wider mb-2">
            Allergies
          </label>
          <input
            type="text"
            id="allergies"
            name="allergies"
            value={otherFields.allergies}
            onChange={handleOtherFieldChange}
            placeholder="e.g. Peanuts, Penicillin"
            className="w-full text-sm text-main rounded-xl bg-dry border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-subMain focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label htmlFor="medications" className="block text-xs font-semibold text-main uppercase tracking-wider mb-2">
            Current Medications
          </label>
          <input
            type="text"
            id="medications"
            name="medications"
            value={otherFields.medications}
            onChange={handleOtherFieldChange}
            placeholder="e.g. Aspirin, Lipitor"
            className="w-full text-sm text-main rounded-xl bg-dry border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-subMain focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="flex justify-end mt-6 pb-6 border-b border-border">
        <button
          onClick={handleSubmit}
          className="bg-subMain hover:bg-opacity-95 text-white py-3 px-6 rounded-xl font-semibold transition duration-200 shadow-sm text-xs uppercase tracking-wider"
        >
          Submit Chart
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold text-main uppercase tracking-wider mb-4">Submitted Chart Records</h3>
        <div className="overflow-x-auto border border-border rounded-xl">
          <table className="table-auto w-full border-collapse">
            <thead className="bg-dry border-b border-border">
              <tr>
                <th className="text-start text-xs font-semibold text-textGray uppercase tracking-wider py-3 px-4">Serious Disease</th>
                <th className="text-start text-xs font-semibold text-textGray uppercase tracking-wider py-3 px-4">Dental Conditions</th>
                <th className="text-start text-xs font-semibold text-textGray uppercase tracking-wider py-3 px-4">Mental Health Issues</th>
                <th className="text-start text-xs font-semibold text-textGray uppercase tracking-wider py-3 px-4">Allergies</th>
                <th className="text-start text-xs font-semibold text-textGray uppercase tracking-wider py-3 px-4">Medications</th>
                <th className="text-start text-xs font-semibold text-textGray uppercase tracking-wider py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((data) => (
                <DentalChartTable key={data._id} data={data} onDelete={handleDelete} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DentalChart;