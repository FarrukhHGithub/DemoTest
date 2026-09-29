import React from "react";
import { useForm } from "react-hook-form";

const ContactForm = ({ onSubmit, isSending, sendError, sendSuccess }) => {
  const { handleSubmit, register, formState: { errors } } = useForm();

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "2.5rem",
        boxShadow: "0 10px 40px rgba(0,0,0,0.03)",
        border: "1px solid #f1f5f9",
        height: "100%"
      }}
    >
      <form className="row" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-md-6 mb-4">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13.5px', fontWeight: '600', color: '#475569' }}>First Name <span className="text-danger">*</span></label>
            <input
              type="text"
              {...register("firstName", { required: "First name is required" })}
              placeholder="First Name"
              style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '10px 12px', outline: 'none' }}
            />
            {errors.firstName && (
              <p style={{ color: '#ef4444', fontSize: '12px', margin: '4px 0 0 0' }}>{errors.firstName.message}</p>
            )}
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13.5px', fontWeight: '600', color: '#475569' }}>Last Name <span className="text-danger">*</span></label>
            <input
              type="text"
              {...register("lastName", { required: "Last name is required" })}
              placeholder="Last Name"
              style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '10px 12px', outline: 'none' }}
            />
            {errors.lastName && (
              <p style={{ color: '#ef4444', fontSize: '12px', margin: '4px 0 0 0' }}>{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="col-md-12 mb-4">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13.5px', fontWeight: '600', color: '#475569' }}>Email Address <span className="text-danger">*</span></label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Email"
              style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '10px 12px', outline: 'none' }}
            />
            {errors.email && (
              <p style={{ color: '#ef4444', fontSize: '12px', margin: '4px 0 0 0' }}>{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="col-md-12 mb-4">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13.5px', fontWeight: '600', color: '#475569' }}>Subject <span className="text-danger">*</span></label>
            <input
              type="text"
              {...register("subject", { required: "Subject is required" })}
              placeholder="Enter subject"
              style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '10px 12px', outline: 'none' }}
            />
            {errors.subject && (
              <p style={{ color: '#ef4444', fontSize: '12px', margin: '4px 0 0 0' }}>{errors.subject.message}</p>
            )}
          </div>
        </div>

        <div className="col-md-12 mb-4">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13.5px', fontWeight: '600', color: '#475569' }}>Message <span className="text-danger">*</span></label>
            <textarea
              {...register("message", { required: "Message is required" })}
              cols="10"
              rows="5"
              placeholder="Enter your message"
              style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '10px 12px', outline: 'none', resize: 'vertical' }}
            />
            {errors.message && (
              <p style={{ color: '#ef4444', fontSize: '12px', margin: '4px 0 0 0' }}>{errors.message.message}</p>
            )}
          </div>
        </div>

        <div className="col-md-12 mt-2">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
            <button
              type="submit"
              disabled={isSending}
              style={{
                backgroundColor: "#1890ff",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                padding: "12px 30px",
                fontWeight: "600",
                cursor: isSending ? "not-allowed" : "pointer",
                transition: "background-color 0.2s ease",
                boxShadow: "0 4px 12px rgba(24, 144, 255, 0.2)"
              }}
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>
            {sendError && <p style={{ color: '#ef4444', fontSize: '13px', margin: 0 }}>{sendError}</p>}
            {sendSuccess && (
              <p style={{ color: '#10b981', fontSize: '13.5px', fontWeight: '600', margin: 0 }}>Email sent successfully!</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
