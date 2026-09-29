import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Select, InputNumber, Space, message } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

// Generic Edit Modal for different data types
export const EditModal = ({ 
  visible, 
  onCancel, 
  onSave, 
  title, 
  data, 
  fields,
  loading = false 
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && data) {
      form.setFieldsValue(data);
    }
  }, [visible, data, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSave(values);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title={<span className="text-lg font-bold text-slate-800">{title}</span>}
      open={visible}
      onCancel={onCancel}
      confirmLoading={loading}
      width={800}
      destroyOnClose
      centered
      styles={{
        mask: {
          backdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(15, 23, 42, 0.3)'
        },
        content: {
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
          border: '1px solid #f1f5f9'
        },
        header: {
          borderBottom: '1px solid #f1f5f9',
          paddingBottom: '16px',
          marginBottom: '20px'
        },
        body: {
          maxHeight: '60vh',
          overflowY: 'auto',
          paddingRight: '8px'
        }
      }}
      footer={(
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-subMain hover:bg-opacity-90 rounded-lg transition-all shadow-sm disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={data}
        requiredMark={false}
      >
        {fields.map((field) => (
          <Form.Item
            key={field.name}
            name={field.name}
            label={<span className="text-sm font-semibold text-slate-700">{field.label}</span>}
            rules={field.rules || []}
            className="mb-5"
          >
            {field.type === 'textarea' && (
              <TextArea 
                rows={field.rows || 4} 
                className="rounded-lg border-slate-200 hover:border-slate-300 focus:border-subMain focus:ring-1 focus:ring-subMain/20 transition-all p-3 text-slate-700 text-sm"
              />
            )}
            {field.type === 'number' && (
              <InputNumber 
                className="rounded-lg border-slate-200 hover:border-slate-300 focus:border-subMain focus:ring-1 focus:ring-subMain/20 transition-all w-full p-1.5 text-slate-700 text-sm" 
              />
            )}
            {field.type === 'select' && (
              <Select className="w-full h-11 text-slate-700 text-sm">
                {field.options?.map(opt => (
                  <Option key={opt.value} value={opt.value}>
                    {opt.label}
                  </Option>
                ))}
              </Select>
            )}
            {field.type === 'dynamic' && (
              <Form.List name={field.name}>
                {(fields, { add, remove }) => (
                  <div className="space-y-4">
                    {fields.map(({ key, name, ...restField }) => (
                      <div key={key} className="flex gap-4 items-end p-4 border border-slate-100 bg-slate-50/50 rounded-xl relative group">
                        <div className="grid grid-cols-12 gap-4 flex-1">
                          {field.subFields?.map((subField) => (
                            <div key={subField.name} className="col-span-12 sm:col-span-4">
                              <Form.Item
                                {...restField}
                                name={[name, subField.name]}
                                label={<span className="text-xs font-semibold text-slate-500">{subField.label}</span>}
                                style={{ marginBottom: 0 }}
                              >
                                {subField.type === 'input' && (
                                  <Input 
                                    placeholder={subField.placeholder} 
                                    className="rounded-lg border-slate-200 h-10 hover:border-slate-300 focus:border-subMain focus:ring-1 focus:ring-subMain/20 transition-all" 
                                  />
                                )}
                                {subField.type === 'number' && (
                                  <InputNumber 
                                    placeholder={subField.placeholder} 
                                    className="rounded-lg border-slate-200 w-full h-10 flex items-center hover:border-slate-300 focus:border-subMain focus:ring-1 focus:ring-subMain/20 transition-all" 
                                  />
                                )}
                                {subField.type === 'textarea' && (
                                  <TextArea 
                                    placeholder={subField.placeholder} 
                                    rows={1} 
                                    className="rounded-lg border-slate-200 p-2 hover:border-slate-300 focus:border-subMain focus:ring-1 focus:ring-subMain/20 transition-all" 
                                  />
                                )}
                              </Form.Item>
                            </div>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(name)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 mb-1"
                        >
                          <MinusCircleOutlined className="text-lg" />
                        </button>
                      </div>
                    ))}
                    <Button 
                      type="dashed" 
                      onClick={() => add()} 
                      block 
                      icon={<PlusOutlined />}
                      className="border-dashed hover:border-subMain hover:text-subMain text-slate-500 rounded-lg py-2.5 flex items-center justify-center font-medium bg-slate-50/50 hover:bg-subMain/5 transition-all"
                    >
                      Add {field.label}
                    </Button>
                  </div>
                )}
              </Form.List>
            )}
            {!field.type && (
              <Input 
                className="rounded-lg border-slate-200 hover:border-slate-300 focus:border-subMain focus:ring-1 focus:ring-subMain/20 transition-all p-3 text-slate-700 text-sm h-11"
              />
            )}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};