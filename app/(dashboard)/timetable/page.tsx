'use client'
import { useState } from 'react'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const SLOTS = ['8:00', '9:00', '10:00', '11:00', '13:00', '14:00', '15:00']

type Entry = { code: string; room: string }
type TT = Record<string, Entry>

const DEFAULT_TT: TT = {
  'Mon-1': { code: 'IS 4110', room: 'Lab 3' },
  'Tue-4': { code: 'IS 4102', room: 'E201' },
  'Thu-2': { code: 'IS 4104', room: 'B105' },
  'Fri-0': { code: 'IS 4106', room: 'A201' },
}

export default function TimetablePage() {
  const [tt, setTT] = useState<TT>(DEFAULT_TT)
  const [modal, setModal] = useState<{ day: string; slot: number } | null>(null)
  const [form, setForm] = useState({ code: '', room: '' })

  const save = () => {
    if (!modal || !form.code) return
    setTT(prev => ({ ...prev, [`${modal.day}-${modal.slot}`]: { ...form } }))
    setModal(null)
    setForm({ code: '', room: '' })
  }

  return (
    <div className="px-3 sm:px-4">

      <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#800000] mb-4 sm:mb-5">
        My Timetable
      </h2>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white dark:bg-stone-900 rounded-2xl border border-stone-200
        dark:border-stone-800 p-6 shadow-sm overflow-x-auto">

        <div className="grid gap-1" style={{ gridTemplateColumns: '72px repeat(5, 1fr)' }}>
          <div />
          {DAYS.map(d => (
            <div key={d} className="bg-[#800000] text-white text-xs font-semibold text-center py-2 rounded-lg">
              {d}
            </div>
          ))}

          {SLOTS.map((slot, si) => (
            <div key={slot} className="grid gap-1">
              <div className="flex items-center justify-center text-xs text-stone-400 bg-stone-50 dark:bg-stone-800 rounded-lg py-2">
                {slot}
              </div>

              {DAYS.map(day => {
                const key = `${day}-${si}`
                const entry = tt[key]

                return (
                  <div
                    key={key}
                    onClick={() => {
                      setModal({ day, slot: si })
                      if (entry) setForm(entry)
                    }}
                    className={`min-h-[52px] rounded-lg p-2 cursor-pointer text-xs
                      ${entry
                        ? 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900'
                        : 'border border-dashed border-stone-200 dark:border-stone-700'
                      }`}
                  >
                    {entry && (
                      <>
                        <p className="font-bold text-[#800000]">{entry.code}</p>
                        <p className="text-stone-400 text-[10px]">{entry.room}</p>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ================= MOBILE CARD VIEW ================= */}
      <div className="md:hidden space-y-3">

        {DAYS.map((day, di) => (
          <div key={day} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-3">

            <p className="font-semibold text-[#800000] mb-2">{day}</p>

            <div className="grid grid-cols-2 gap-2">
              {SLOTS.map((slot, si) => {
                const key = `${day}-${si}`
                const entry = tt[key]

                return (
                  <div
                    key={key}
                    onClick={() => {
                      setModal({ day, slot: si })
                      if (entry) setForm(entry)
                    }}
                    className="border border-stone-200 dark:border-stone-700 rounded-lg p-2 text-xs"
                  >
                    <p className="text-[10px] text-stone-400">{slot}</p>
                    {entry ? (
                      <>
                        <p className="font-bold text-[#800000]">{entry.code}</p>
                        <p className="text-[10px] text-stone-400">{entry.room}</p>
                      </>
                    ) : (
                      <p className="text-stone-400 text-[10px]">Free</p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

      </div>

      {/* ================= MODAL ================= */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-3">
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 w-full max-w-sm">

            <h3 className="font-semibold mb-4 text-sm">
              {modal.day} · {SLOTS[modal.slot]}:00
            </h3>

            <input
              value={form.code}
              onChange={e => setForm(f => ({ ...f, code: e.target.value }))}
              placeholder="Module Code"
              className="w-full mb-3 px-3 py-2 text-sm rounded-xl border"
            />

            <input
              value={form.room}
              onChange={e => setForm(f => ({ ...f, room: e.target.value }))}
              placeholder="Room"
              className="w-full mb-4 px-3 py-2 text-sm rounded-xl border"
            />

            <div className="flex gap-2">
              <button onClick={save} className="flex-1 bg-[#800000] text-white py-2 rounded-xl text-sm">
                Save
              </button>
              <button onClick={() => setModal(null)} className="flex-1 border py-2 rounded-xl text-sm">
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}