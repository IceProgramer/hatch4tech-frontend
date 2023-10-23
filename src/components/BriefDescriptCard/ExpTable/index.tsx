import {
  deleteStudentExpUsingPOST,
  updateStudentExpUsingPOST,
} from '@/services/hatch4tech-user/studentExpController';
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
  expList: API.StudentExpVO[];
}

const ExpTable: React.FC<Props> = (props) => {
  const { expList } = props;
  const [form] = Form.useForm();
  const [data, setData] = useState<API.StudentExpVO[]>(expList);
  const [editingKey, setEditingKey] = useState<number>(0);

  const isEditing = (record: API.StudentExpVO) => record.expId === editingKey;

  const edit = (record: Partial<API.StudentExpVO> & { expId: React.Key }) => {
    form.setFieldsValue({ expName: '', ...record });
    setEditingKey(record.expId);
  };

  const deleteHonor = async (record: Partial<API.StudentExpVO> & { expId: React.Key }) => {
    const expId = record.expId;
    try {
      const res = await deleteStudentExpUsingPOST({ id: expId });
      if (res.code === 0) {
        message.success('删除个人经验记录成功');
        const newData = data.filter((item) => item.expId !== expId);
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
      const row = (await form.validateFields()) as API.StudentExpVO;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.expId);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey(0);
        if (item.expName === newData[index].expName) {
          return;
        }
        try {
          const expUpdateRequest: API.ExpUpdateRequest = {
            expId: newData[index].expId,
            expName: newData[index].expName,
          };
          console.log(expUpdateRequest);
          const res = await updateStudentExpUsingPOST(expUpdateRequest);
          if (res.code === 0) {
            message.success('个人经验修改成功');
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
      title: '经验名称',
      dataIndex: 'expName',
      width: '75%',
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_: any, record: API.StudentExpVO) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.expId ?? 0)} style={{ marginRight: 8 }}>
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
      onCell: (record: API.StudentExpVO) => ({
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

export default ExpTable;
