import { useStore } from '@/store'
import CourseSelectionStu from './student'
import CourseSelectionTeacher from './teacher'

const CourseSelection = () => {
  const { userStore } = useStore()
  const Com =
    userStore.userInfo.userType === 1 ? (
      <CourseSelectionStu />
    ) : (
      <CourseSelectionTeacher />
    )
  return Com
}
export default CourseSelection
