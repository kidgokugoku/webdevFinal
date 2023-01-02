import { http } from '@/utils'
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Layout,
  message,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd'
import { useEffect, useState } from 'react'
import AssignTeacher from './AssignTeacher'
import CoursesNew from './New'

const changeOnclick = (row) => {}
const deleteOnclick = async (uid) => {
  let data = new FormData()
  data.append('uid', uid)
  const res = await http.post(
    'http://localhost:8080/api/v1/courses/Delete',
    data
  )
  if (res.data.state === 200) {
    message.success(`成功删除`)
    window.location.reload()
  } else {
    message.error(`error code:${res.data.state} 错误信息:${res.data.message}`)
  }
}

const getCourses = async () => {
  const res = await http.get('http://localhost:8080/api/v1/courses/GetAll')
  if (res.data.state === 200) {
    let courses = res.data.data
    courses.forEach((course) => {
      course.key = course.id
    })
    return courses
  } else {
    message.error(`error code:${res.data.state} message:${res.data.message}`)
    return []
  }
}

const Courses = () => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [dataUpdateCounter, setDataUpdateCounter] = useState(0)

  useEffect(() => {
    setLoading(true)
    try {
      getCourses().then((courses) => {
        setData(courses)
        setLoading(false)
      })
    } catch {}
  }, [dataUpdateCounter])

  const [resState, setResState] = useState('')

  const getDataFromForm = (dataFromForm) => {
    setResState(dataFromForm)
  }

  const [openNewItem, setOpenNewItem] = useState(false)
  const [openAssignTeacher, setOpenAssignTeacher] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const newItemOnclick = () => {
    setOpenNewItem(true)
  }
  const assignTeacherOnclick = () => {
    setOpenAssignTeacher(true)
  }
  useEffect(() => {
    if (resState === '200') {
      setConfirmLoading(false)
      setOpenNewItem(false)
    } else {
      setConfirmLoading(false)
    }
  }, [resState, confirmLoading])

  const handleOk = () => {
    setConfirmLoading(true)
  }
  const handleCancel = () => {
    setOpenNewItem(false)
    setOpenAssignTeacher(false)
  }

  const [form] = Form.useForm()
  const [editingKey, setEditingKey] = useState('')
  const isEditing = (record) => record.key === editingKey
  const assignTeacher = (record) => {
    form.setFieldsValue({
      ...record,
    })
    setEditingKey(record.key)
  }
  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    })
    setEditingKey(record.key)
  }
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode =
      inputType === 'number' ? (
        <InputNumber />
      ) : inputType === 'text' ? (
        <Input />
      ) : inputType === 'selectCampus' ? (
        <Select
          options={[
            {
              value: 0,
              label: 'campus1',
            },
            {
              value: 1,
              label: 'campus2',
            },
            {
              value: 2,
              label: 'campus3',
            },
          ]}
        />
      ) : (
        <Select
          options={[
            {
              value: 0,
              label: 'specialty',
            },
            {
              value: 1,
              label: 'public basic',
            },
            {
              value: 2,
              label: 'common',
            },
          ]}
        />
      )
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
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
    )
  }
  const save = async (key) => {
    try {
      const row = await form.validateFields()
      const newData = [...data]
      const index = newData.findIndex((item) => key === item.key)
      reqEditCourse({
        ...row,
        id: editingKey,
      })
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row,
        })
        setLoading(true)
        setEditingKey('')
      } else {
        newData.push(row)
        setLoading(true)
        setEditingKey('')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }
  const cancel = () => {
    setEditingKey('')
  }
  const reqEditCourse = async (rawData) => {
    let data = new FormData()
    data.append('id', rawData.id)
    data.append('name', rawData.name)
    data.append('credit', rawData.credit)
    data.append('duration', rawData.duration)
    data.append('capacity', rawData.capacity)
    data.append('courseType', rawData.courseType)
    data.append('campus', rawData.campus)

    let url = 'http://localhost:8080/api/v1/courses/Edit'
    const res = await http.post(url, data)
    getDataFromForm(res.data.state)
    if (res.data.state === 200) {
      message.success(`成功修改`)
      setDataUpdateCounter(dataUpdateCounter + 1)
    } else {
      message.error(`error code:${res.data.state} 错误信息:${res.data.message}`)
      setDataUpdateCounter(dataUpdateCounter + 1)
    }
  }
  const [filteredInfo, setFilteredInfo] = useState({})
  const [sortedInfo, setSortedInfo] = useState({})
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters)
    setSortedInfo(sorter)
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: '20%',
      editable: true,
    },
    {
      title: 'credit',
      dataIndex: 'credit',
      key: 'credit',
      align: 'center',
      editable: true,
      sorter: (a, b) => a.credit - b.credit,
      sortOrder: sortedInfo.columnKey === 'credit' ? sortedInfo.order : null,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      align: 'center',
      editable: true,
      sorter: (a, b) => a.duration - b.duration,
      sortOrder: sortedInfo.columnKey === 'duration' ? sortedInfo.order : null,
    },
    {
      title: 'capacity',
      dataIndex: 'capacity',
      key: 'capacity',
      align: 'center',
      editable: true,
      sorter: (a, b) => a.capacity - b.capacity,
      sortOrder: sortedInfo.columnKey === 'capacity' ? sortedInfo.order : null,
    },
    {
      title: 'CourseType',
      dataIndex: 'courseType',
      key: 'courseType',
      editable: true,
      filters: [
        {
          text: 'specialty',
          value: 0,
        },
        {
          text: 'public basic',
          value: 1,
        },
        {
          text: 'common',
          value: 2,
        },
      ],
      filteredValue: filteredInfo.courseType || null,
      onFilter: (value, record) => record.courseType === value,
      render: (_, { courseType }) => {
        const color =
          courseType === 0 ? 'volcano' : courseType === 1 ? 'green' : 'geekblue'
        const text =
          courseType === 0
            ? 'specialty'
            : courseType === 1
            ? 'public basic'
            : 'common'
        return (
          <Tag color={color} key={courseType}>
            {text}
          </Tag>
        )
      },
    },
    {
      title: 'Campus',
      dataIndex: 'campus',
      key: 'campus',
      editable: true,
      filters: [
        {
          text: 'campus1',
          value: 0,
        },
        {
          text: 'campus2',
          value: 1,
        },
        {
          text: 'campus3',
          value: 2,
        },
      ],
      filteredValue: filteredInfo.campus || null,
      onFilter: (value, record) => record.campus === value,
      render: (_, { campus }) => {
        const color =
          campus === 0 ? 'volcano' : campus === 1 ? 'green' : 'geekblue'
        const text =
          campus === 0 ? 'campus1' : campus === 1 ? 'campus2' : 'campus3'
        return (
          <Tag color={color} key={campus}>
            {text}
          </Tag>
        )
      },
    },
    {
      title: 'TeacherId',
      dataIndex: 'teacherId',
      key: 'teacherId',
      align: 'center',
    },
    {
      title: 'CurrentSelected',
      dataIndex: 'currentSelected',
      key: 'currentSelected',
      align: 'center',
      sorter: (a, b) => a.currentSelected - b.currentSelected,
      sortOrder:
        sortedInfo.columnKey === 'currentSelected' ? sortedInfo.order : null,
    },
    {
      title: 'CreatedTime',
      dataIndex: 'createdTime',
      key: 'createdTime',
      sorter: (a, b) => (a.createdTime < b.createdTime ? 1 : -1),
      sortOrder:
        sortedInfo.columnKey === 'createdTime' ? sortedInfo.order : null,
    },
    {
      title: 'ModifiedTime',
      dataIndex: 'modifiedTime',
      key: 'modifiedTime',
      sorter: (a, b) => (a.modifiedTime < b.modifiedTime ? 1 : -1),
      sortOrder:
        sortedInfo.columnKey === 'modifiedTime' ? sortedInfo.order : null,
    },
    {
      title: 'CreatedUser',
      dataIndex: 'createdUser',
      key: 'createdUser',
    },
    {
      title: 'ModifiedUser',
      dataIndex: 'modifiedUser',
      key: 'modifiedUser',
    },
    {
      title: 'operation',
      key: 'operation',
      fixed: 'right',
      // @ts-ignore
      render: (_, record) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
              style={{
                marginRight: 8,
              }}
            >
              Edit
            </Typography.Link>
            <Modal
              destroyOnClose={true}
              title="assign teacher"
              open={openAssignTeacher}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
              okButtonProps={{
                form: 'AssignTeacher',
                key: 'submit',
                htmlType: 'submit',
              }}
              pagination={{
                onChange: cancel,
              }}
            >
              <AssignTeacher
                getDataFromForm={getDataFromForm}
                courseId={record.key}
              />
            </Modal>
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={assignTeacherOnclick}
              style={{
                marginRight: 8,
              }}
            >
              Assign
            </Typography.Link>
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={() => deleteOnclick(record.key)}
              okText="Yes"
              cancelText="No"
            >
              <Typography.Link disabled={editingKey !== ''}>
                delete
              </Typography.Link>
            </Popconfirm>
          </span>
        )
      },
    },
  ]
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === 'name'
            ? 'text'
            : col.dataIndex === 'courseType'
            ? 'selectCourseType'
            : col.dataIndex === 'campus'
            ? 'selectCampus'
            : 'number',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })

  return (
    <Layout>
      <Space align="end">
        <Button onClick={newItemOnclick}>new</Button>
        <Modal
          destroyOnClose={true}
          title="New Course"
          open={openNewItem}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          okButtonProps={{
            form: 'newCourse',
            key: 'submit',
            htmlType: 'submit',
          }}
          pagination={{
            onChange: cancel,
          }}
        >
          <CoursesNew getDataFromForm={getDataFromForm} />
        </Modal>
      </Space>
      <Divider type="vertical" />
      <Form form={form} component={false}>
        <Table
          size="small"
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          onChange={handleChange}
          columns={mergedColumns}
          dataSource={data}
          loading={loading}
          rowClassName="editable-row"
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50, 100],
            defaultPageSize: 100,
            position: ['topRight', 'bottomRight'],
            onChange: cancel,
          }}
        ></Table>
      </Form>
    </Layout>
  )
}
export default Courses
