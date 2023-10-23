import {
  deleteStudentHonorUsingPOST,
  updateStudentHonorUsingPOST,
} from '@/services/hatch4tech-user/studentHonorController';
import { Form, Input, InputNumber, message, Popconfirm, Space, Table, Typography } from 'antd';
import React, { useState } from 'react';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: API.StudentHonorVO;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

interface Props {
  honorList: API.StudentHonorVO[];
}

const HonorTable: React.FC<Props> = (props) => {
  const { honorList } = props;
  const [form] = Form.useForm();
  const [data, setData] = useState<API.StudentHonorVO[]>(honorList);
  const [editingKey, setEditingKey] = useState<number>(0);

  const isEditing = (record: API.StudentHonorVO) => record.honorId === editingKey;

  const edit = (record: Partial<API.StudentHonorVO> & { honorId: React.Key }) => {
    form.setFieldsValue({ honorName: '', ...record });
    setEditingKey(record.honorId);
  };

  const deleteHonor = async (record: Partial<API.StudentHonorVO> & { honorId: React.Key }) => {
    const honorId = record.honorId;
    try {
      const res = await deleteStudentHonorUsingPOST({ id: honorId });
      if (res.code === 0) {
        message.success('删除个人荣誉记录成功');
        const newData = data.filter((item) => item.honorId !== honorId);
        setData(newData);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const cancel = () => {
    setEditingKey(0);
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as API.StudentHonorVO;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.honorId);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey(0);
        if (item.honorName === newData[index].honorName) {
          return;
        }
        try {
          const honorUpdateRequest: API.HonorUpdateRequest = {
            honorId: newData[index].honorId,
            honorName: newData[index].honorName,
          };
          console.log(honorUpdateRequest);
          const res = await updateStudentHonorUsingPOST(honorUpdateRequest);
          if (res.code === 0) {
            message.success('个人荣誉修改成功');
          }
        } catch (error: any) {
          console.log(error);
        }
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey(0);
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: '荣誉名称',
      dataIndex: 'honorName',
      width: '75%',
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_: any, record: API.StudentHonorVO) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.honorId ?? 0)} style={{ marginRight: 8 }}>
              保存
            </Typography.Link>
            <Popconfirm title="确定取消修改?" onConfirm={cancel}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <Space>
            <Typography.Link disabled={editingKey !== 0} onClick={() => edit(record as any)}>
              编辑
            </Typography.Link>
            <Popconfirm title="确认删除？" onConfirm={() => deleteHonor(record as any)}>
              <a>删除</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: API.StudentHonorVO) => ({
        record,
        inputType: col.dataIndex,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
        />
      </Form>
    </>
  );
};

export default HonorTable;
