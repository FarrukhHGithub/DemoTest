import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import logo from '../../../images/logo.png';
import Footer from "../../Shared/Footer/Footer";
import Header from "../../Shared/Header/Header";
import { useGetPrescriptionQuery } from "../../../redux/api/prescriptionApi";
import moment from "moment";
import { Empty } from "antd";
import PrescriptionHeader from "./PrescriptionHeader";
import PrescriptionDetails from "./PrescriptionDetails";
import RxSection from "./RxSection";
import './index.css';

// Table columns configuration declared statically outside component to avoid recreation on every render
const columns = [
    {
        title: 'Medicine',
        dataIndex: 'medicine',
        key: 'medicine',
    },
    {
        title: 'Dosage',
        dataIndex: 'dosage',
        key: 'dosage',
    },
    {
        title: 'Frequency',
        dataIndex: 'frequency',
        key: 'frequency',
    },
    {
        title: 'Period',
        key: 'duration',
        render: function (data) {
            const durationDate = data.duration.split(',');
            const endDate = moment(durationDate[0]);
            const startDate = moment(durationDate[1]);
            const getDifferent = endDate.diff(startDate, "days");
            return (
                <>{getDifferent} days</>
            );
        }
    },
];

const PrescriptionView = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useGetPrescriptionQuery(id);

    const content = useMemo(() => {
        if (isLoading) return <div>Loading ...</div>;
        if (isError) return <div>Something went Wrong!</div>;
        if (!data) return <Empty />;

        return (
            <div className="col-lg-8 offset-lg-2">
                <div 
                  style={{ 
                    backgroundColor: "#ffffff", 
                    borderRadius: "16px", 
                    padding: "2.5rem", 
                    boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
                    border: "1px solid #e2e8f0"
                  }}
                >
                    <PrescriptionHeader data={data} logo={logo} />
                    <PrescriptionDetails data={data} />
                    <RxSection data={data} columns={columns} />
                </div>
            </div>
        );
    }, [data, isLoading, isError]);

    return (
        <>
            <Header />
            <div className="content" style={{ marginTop: '10rem', marginBottom: '7rem' }}>
                <div className="container-fluid">
                    <div className="row">
                        {content}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PrescriptionView;