'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { UserPlus, LogOut, GraduationCap, ShieldAlert, CheckCircle } from 'lucide-react'

interface Student {
  id: string
  name: string
  uniId: string
  uniEmail: string
  faculty: string
  department: string
  joinedDate: string
}

export default function AdminDashboardClient() {
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    name: '', password: '', faculty: '', department: '', uniId: '', uniEmail: '',
  })

  const [students, setStudents] = useState<Student[]>([])
  const [message, setMessage] = useState({ text: '', isError: false })
  const [loading, setLoading] = useState(false)

  // Fetch registered student records
  useEffect(() => {
    async function loadStudents() {
      try {
        const res = await fetch('/api/admin/register-student')
        if (!res.ok) throw new Error('Failed to fetch student database records')
        
        const json = await res.json() 
        if (json && Array.isArray(json.students)) {
          const formatted = json.students.map((student: any) => ({
            ...student,
            // Fallback default format layout logic
            joinedDate: student.joinedDate ? new Date(student.joinedDate).toLocaleDateString() : 'N/A'
          }))
          setStudents(formatted)
        }
      } catch (e) {
        console.error("Dashboard table population load error:", e)
      }
    }
    loadStudents()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Submit form payload details to your updated backend POST route
  const handleRegisterStudent = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ text: '', isError: false })

    try {
      const response = await fetch('/api/admin/register-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Registration failed.')

      // Format current timestamp dynamically for smooth local table updating
      const formattedStudent = {
        ...data.student,
        id: data.student.id || Math.random().toString(36).substr(2, 9),
        joinedDate: data.student.joinedDate ? new Date(data.student.joinedDate).toLocaleDateString() : new Date().toLocaleDateString()
      }

      setStudents((prev) => [formattedStudent, ...prev])
      setFormData({ name: '', password: '', faculty: '', department: '', uniId: '', uniEmail: '' })
      setMessage({ text: 'Student registered successfully in the database!', isError: false })
    } catch (err: any) {
      setMessage({ text: err.message, isError: true })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin-logout', { method: 'POST' })
    } catch (err) {
      console.error("Logout runtime clearing error:", err)
    } finally {
      router.push('/dashboard/login')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-100">
      
      {/* Upper Management Navigation Navbar */}
      <nav className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-4 py-3 sm:px-6 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <GraduationCap size={28} color="#800000" />
          <span className="font-bold text-lg tracking-tight">SmartUni Admin Gateway</span>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-1.5 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 text-xs sm:text-sm px-3 py-2 rounded-xl font-medium transition shadow-sm">
          <LogOut size={15} /> Sign Out
        </button>
      </nav>

      {/* Main Workspace Frame */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Registration Form Box */}
        <div className="lg:col-span-1 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 sm:p-5 rounded-2xl shadow-sm h-fit">
          <div className="flex items-center gap-2 mb-4 border-b border-stone-100 dark:border-stone-800 pb-3">
            <UserPlus size={18} color="#800000" />
            <h2 className="font-semibold text-base">Register New Student</h2>
          </div>

          <form onSubmit={handleRegisterStudent} className="space-y-3">
            <div>
              <label className="text-[11px] font-medium text-stone-500">Full Name</label>
              <input type="text" required name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" className="w-full mt-1 px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 outline-none text-stone-900 dark:text-stone-100 placeholder-stone-400"/>
            </div>
            <div>
              <label className="text-[11px] font-medium text-stone-500">University Email</label>
              <input type="email" required name="uniEmail" value={formData.uniEmail} onChange={handleInputChange} placeholder="johndoe@smartuni.com" className="w-full mt-1 px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 outline-none text-stone-900 dark:text-stone-100 placeholder-stone-400"/>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-medium text-stone-500">University ID</label>
                <input type="text" required name="uniId" value={formData.uniId} onChange={handleInputChange} placeholder="SU-2026-042" className="w-full mt-1 px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 outline-none text-stone-900 dark:text-stone-100 placeholder-stone-400"/>
              </div>
              <div>
                <label className="text-[11px] font-medium text-stone-500">Password</label>
                <input type="password" required name="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" className="w-full mt-1 px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 outline-none text-stone-900 dark:text-stone-100 placeholder-stone-400"/>
              </div>
            </div>
            <div>
              <label className="text-[11px] font-medium text-stone-500">Faculty</label>
              <select required name="faculty" value={formData.faculty} onChange={handleInputChange} className="w-full mt-1 px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 outline-none text-stone-900 dark:text-stone-100">
                <option value="">Select Faculty</option>
                <option value="Computing">Faculty of Computing</option>
                <option value="Engineering">Faculty of Engineering</option>
                <option value="Management">Faculty of Management</option>
                <option value="Science">Faculty of Science</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-medium text-stone-500">Department</label>
              <input type="text" required name="department" value={formData.department} onChange={handleInputChange} placeholder="Software Engineering" className="w-full mt-1 px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 outline-none text-stone-900 dark:text-stone-100 placeholder-stone-400"/>
            </div>

            {message.text && (
              <div className={`p-2.5 rounded-xl flex items-start gap-2 text-xs mt-2 ${message.isError ? 'bg-red-50 dark:bg-red-950/30 text-red-500 border border-red-100 dark:border-red-900/30' : 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 border border-emerald-100 dark:border-emerald-900/30'}`}>
                {message.isError ? <ShieldAlert size={16} className="shrink-0 mt-0.5" /> : <CheckCircle size={16} className="shrink-0 mt-0.5" />}
                <span>{message.text}</span>
              </div>
            )}

            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-[#800000] hover:bg-[#660000] text-white text-sm py-2.5 rounded-xl transition disabled:opacity-60 mt-4 font-medium shadow-sm">
              {loading ? 'Writing to Database...' : 'Register Student'}
            </button>
          </form>
        </div>

        {/* Live Registry Table Data Panel */}
        <div className="lg:col-span-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 sm:p-5 rounded-2xl shadow-sm">
          <div className="mb-4">
            <h2 className="font-semibold text-base">Registered Students Registry</h2>
            <p className="text-xs text-stone-400 mt-0.5">Live view fetched from PostgreSQL Tables</p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-stone-100 dark:border-stone-800">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-stone-50 dark:bg-stone-800/50 text-stone-500 border-b border-stone-100 dark:border-stone-800">
                  <th className="p-3 font-medium">Student Info</th>
                  <th className="p-3 font-medium">Uni ID</th>
                  <th className="p-3 font-medium">Faculty & Dept</th>
                  <th className="p-3 font-medium">Enrolled</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {students.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center p-8 text-stone-400">
                      No students found in the PostgreSQL database.
                    </td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr key={student.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/20 transition">
                      <td className="p-3">
                        <div className="font-medium text-stone-900 dark:text-stone-100">{student.name}</div>
                        <div className="text-[11px] text-stone-400">{student.uniEmail}</div>
                      </td>
                      <td className="p-3 font-mono text-stone-600 dark:text-stone-300">{student.uniId}</td>
                      <td className="p-3">
                        <div className="text-stone-700 dark:text-stone-200">{student.faculty}</div>
                        <div className="text-[11px] text-stone-400">{student.department}</div>
                      </td>
                      <td className="p-3 text-stone-400 font-mono text-[11px]">{student.joinedDate}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}