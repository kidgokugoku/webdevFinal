import { useStore } from '@/store'
import { http } from '@/utils'
import { Layout, message, Popconfirm, Table, Tag, Typography } from 'antd'
import { useEffect, useState } from 'react'

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

const processCourses = (data) => {
  let newArray = data.reduce((total, cur, index) => {
    let hasValue = total.findIndex((current) => {
      return current.key === cur.key
    })
    if (hasValue === -1) {
      cur.teacherName = [cur.teacherName]
      cur.studentName = [cur.studentName]
      total.push(cur)
    } else {
      if (!total[hasValue].teacherName.includes(cur.teacherName))
        total[hasValue].teacherName.push(cur.teacherName)

      if (!total[hasValue].studentName.includes(cur.studentName))
        total[hasValue].studentName.push(cur.studentName)
    }
    return total
  }, [])
  console.log(newArray)
  return newArray
}

const CourseSelectionStu = () => {
  const { userStore } = useStore()
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [dataUpdateCounter, setDataUpdateCounter] = useState(0)

  const confirmSelection = async (courseId, studentId) => {
    let data = new FormData()
    data.append('courseId', courseId)
    data.append('studentId', studentId)
    const res = await http.post(
      'http://localhost:8080/api/v1/selections/StudentSelect',
      data
    )
    if (res.data.state === 200) {
      message.success(`成功选择`)
      setDataUpdateCounter(dataUpdateCounter + 1)
    } else {
      message.error(`error code:${res.data.state} 错误信息:${res.data.message}`)
    }
  }
  const confirmDeselection = async (courseId, studentId) => {
    console.log({ courseId, studentId })
    let data = new FormData()
    data.append('courseId', courseId)
    data.append('studentId', studentId)
    const res = await http.post(
      'http://localhost:8080/api/v1/selections/StudentDeselect',
      data
    )
    if (res.data.state === 200) {
      message.success(`成功取消`)
      setDataUpdateCounter(dataUpdateCounter + 1)
    } else {
      message.error(`error code:${res.data.state} 错误信息:${res.data.message}`)
    }
  }
  useEffect(() => {
    setLoading(true)
    try {
      getCourses().then((courses) => {
        setData(processCourses(courses))
        setLoading(false)
      })
    } catch {}
  }, [dataUpdateCounter])

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
      title: 'CurrentSelected',
      dataIndex: 'currentSelected',
      key: 'currentSelected',
      align: 'center',
      sorter: (a, b) => a.currentSelected - b.currentSelected,
      sortOrder:
        sortedInfo.columnKey === 'currentSelected' ? sortedInfo.order : null,
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
      title: 'Teacher',
      dataIndex: 'teacherName',
      key: 'teacherName',
      align: 'center',
      render: (teacherNames) => (
        <span>
          {teacherNames.map((teacherName) => {
            return (
              <Tag color={'orange'} key={teacherName}>
                {teacherName}
              </Tag>
            )
          })}
        </span>
      ),
    },

    {
      title: 'operation',
      key: 'operation',
      fixed: 'right',
      // @ts-ignore
      render: (_, { studentName = [], key }) => {
        return studentName.includes(userStore.userInfo.name) ? (
          <span>
            <Popconfirm
              title="Are you sure to deselect this course?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                confirmDeselection(key, userStore.userInfo.uid)
              }}
            >
              <Typography.Link>deselect</Typography.Link>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Popconfirm
              title="Are you sure to select this course?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                confirmSelection(key, userStore.userInfo.uid)
              }}
            >
              <Typography.Link>select</Typography.Link>
            </Popconfirm>
          </span>
        )
      },
    },
  ]

  return (
    <Layout>
      <Table
        size="small"
        onChange={handleChange}
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          showSizeChanger: true,
          defaultPageSize: 100,
          pageSizeOptions: [10, 20, 50, 100],
          position: ['topRight', 'bottomRight'],
        }}
      ></Table>
    </Layout>
  )
}
export default CourseSelectionStu
