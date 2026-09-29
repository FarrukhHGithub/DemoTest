import React from "react";
import { Modal, Form, Input, InputNumber, Button, Card, Space } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const EditMedicalRecordModal = ({
  visible,
  onCancel,
  onSave,
  record,
  loading
}) => {
  const [form] = Form.useForm();

  // Set form values when record changes
  React.useEffect(() => {
    if (record && visible) {
      // console.log("Setting form values:", record); // Debug log
      form.setFieldsValue(record);
    }
  }, [record, visible, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form values:", values); // Debug log
      onSave(values);
    } catch (error) {
      console.log("Validation error:", error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={<span className="text-lg font-bold text-slate-800">Edit Medical Record</span>}
      open={visible}
      onCancel={handleCancel}
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
            onClick={handleCancel}
            className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleOk}
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
        initialValues={record || {}}
        requiredMark={false}
      >
        <Form.Item
          name="diagnosis"
          label={<span className="text-sm font-semibold text-slate-700">Diagnosis</span>}
          rules={[{ required: true, message: "Please enter diagnosis" }]}
          className="mb-5"
        >
          <Input.TextArea
            rows={3}
            placeholder="Enter diagnosis"
            className="rounded-lg border-slate-200 hover:border-slate-300 focus:border-subMain focus:ring-1 focus:ring-subMain/20 transition-all p-3 text-slate-700 text-sm"
          />
        </Form.Item>

        <Form.Item
          name="complaints"
          label={<span className="text-sm font-semibold text-slate-700">Complaints</span>}
          className="mb-5"
        >
          <Input.TextArea
            rows={2}
            placeholder="Enter complaints (comma separated)"
            className="rounded-lg border-slate-200 hover:border-slate-300 focus:border-subMain focus:ring-1 focus:ring-subMain/20 transition-all p-3 text-slate-700 text-sm"
          />
        </Form.Item>

        <Form.Item
          name="treatment"
          label={<span className="text-sm font-semibold text-slate-700">Treatment</span>}
          className="mb-5"
        >
          <Input.TextArea
            rows={2}
            placeholder="Enter treatments (comma separated)"
            className="rounded-lg border-slate-200 hover:border-slate-300 focus:border-subMain focus:ring-1 focus:ring-subMain/20 transition-all p-3 text-slate-700 text-sm"
          />
        </Form.Item>

        <Form.Item
          name="vitalSigns"
          label={<span className="text-sm font-semibold text-slate-700">Vital Signs</span>}
          className="mb-5"
        >
          <Input.TextArea
            rows={2}
            placeholder="Enter vital signs (comma separated)"
            className="rounded-lg border-slate-200 hover:border-slate-300 focus:border-subMain focus:ring-1 focus:ring-subMain/20 transition-all p-3 text-slate-700 text-sm"
          />
        </Form.Item>

        <Form.Item label={<span className="text-sm font-semibold text-slate-700">Prescription Medicines</span>}>
          <Form.List name="prescription">
            {(fields, { add, remove }) => (
              <div className="space-y-4">
                {fields.map(({ key, name, ...restField }, index) => (
                  <Card
                    key={key}
                    size="small"
                    className="bg-slate-50/50 border border-slate-150 rounded-xl shadow-sm overflow-hidden"
                    title={<span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Medicine #{index + 1}</span>}
                    extra={
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined className="text-sm text-red-500 hover:text-red-600" />}
                        onClick={() => remove(name)}
                        size="small"
                        className="hover:bg-red-50 rounded-full flex items-center justify-center p-2 border-0 transition-colors"
                      />
                    }
                  >
                    <div className="grid grid-cols-12 gap-4 p-2">
                      <div className="col-span-12 sm:col-span-6">
                        <Form.Item
                          {...restField}
                          name={[name, 'name']}
                          label={<span className="text-xs font-semibold text-slate-500">Medicine Name</span>}
                          rules={[{ required: true, message: 'Please enter medicine name' }]}
                          style={{ marginBottom: 0 }}
                        >
                          <Input
                            placeholder="Enter medicine name"
                            className="rounded-lg border-slate-200 hover:border-slate-300 focus:border-subMain focus:ring-1 focus:ring-subMain/20 transition-all h-10 p-2.5 text-slate-700 text-sm"
                          />
                        </Form.Item>
                      </div>

                      <div className="col-span-12 sm:col-span-6">
                        <Form.Item
                          {...restField}
                          name={[name, 'dosage']}
                          label={<span className="text-xs font-semibold text-slate-500">Dosage</span>}
                          style={{ marginBottom: 0 }}
                        >
                          <Input
                            placeholder="Enter dosage (e.g. 500mg)"
                            className="rounded-lg border-slate-200 hover:border-slate-300 focus:border-subMain focus:ring-1 focus:ring-subMain/20 transition-all h-10 p-2.5 text-slate-700 text-sm"
                          />
                        </Form.Item>
                      </div>

                      <div className="col-span-12 sm:col-span-4">
                        <Form.Item
                          {...restField}
                          name={[name, 'quantity']}
                          label={<span className="text-xs font-semibold text-slate-500">Quantity</span>}
                          style={{ marginBottom: 0 }}
                        >
                          <InputNumber
                            placeholder="Qty"
                            min={0}
                            className="rounded-lg border-slate-200 hover:border-slate-300 focus:border-subMain focus:ring-1 focus:ring-subMain/20 transition-all w-full h-10 flex items-center text-slate-700 text-sm"
                          />
                        </Form.Item>
                      </div>

                      <div className="col-span-12 sm:col-span-4">
                        <Form.Item
                          {...restField}
                          name={[name, 'amount']}
                          label={<span className="text-xs font-semibold text-slate-500">Price (Tsh)</span>}
                          style={{ marginBottom: 0 }}
                        >
                          <InputNumber
                            placeholder="Amount"
                            min={0}
                            step={1}
                            className="rounded-lg border-slate-200 hover:border-slate-300 focus:border-subMain focus:ring-1 focus:ring-subMain/20 transition-all w-full h-10 flex items-center text-slate-700 text-sm"
                          />
                        </Form.Item>
                      </div>

                      <div className="col-span-12 sm:col-span-12">
                        <Form.Item
                          {...restField}
                          name={[name, 'instructions']}
                          label={<span className="text-xs font-semibold text-slate-500">Instructions</span>}
                          style={{ marginBottom: 0 }}
                        >
                          <Input.TextArea
                            rows={1}
                            placeholder="Take after meals, etc."
                            className="rounded-lg border-slate-200 hover:border-slate-300 focus:border-subMain focus:ring-1 focus:ring-subMain/20 transition-all p-2.5 text-slate-700 text-sm"
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </Card>
                ))}

                {fields.length === 0 && (
                  <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl bg-slate-50/20 text-slate-400 text-sm">
                    No medicines added yet. Click "Add Medicine" to start.
                  </div>
                )}

                {/* <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  className="border-dashed hover:border-subMain hover:text-subMain text-slate-500 rounded-lg py-2.5 flex items-center justify-center font-medium bg-slate-50/50 hover:bg-subMain/5 transition-all mt-4"
                >
                  Add Medicine
                </Button> */}
              </div>
            )}
          </Form.List>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditMedicalRecordModal;