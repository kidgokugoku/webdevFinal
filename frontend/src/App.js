import { Route, Routes } from 'react-router-dom'

import { AuthRoute } from '@/components/AuthRoute'
import IndexLayout from '@/pages/Layout'
import Login from '@/pages/Login'
import Courses from './pages/Manage/Courses'
import Users from './pages/Manage/Users'
import CourseSelection from './pages/Selection/Course'
import Selection from './pages/Selection/Now'
import { history, HistoryRouter } from './utils/history'

function App() {
  return (
    <HistoryRouter history={history}>
      <div className="App">
        <Routes>
          <Route
            path="/*"
            element={
              <AuthRoute>
                <IndexLayout />
              </AuthRoute>
            }
          >
            <Route path="manage">
              <Route path="users" element={<Users />}></Route>
              <Route path="courses" element={<Courses />}></Route>
            </Route>
            <Route path="selection/now" element={<Selection />}></Route>
            <Route path="selection/course" element={<CourseSelection />} />
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </HistoryRouter>
  )
}

export default App
