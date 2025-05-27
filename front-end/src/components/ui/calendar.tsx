'use client'

import React, { useState, useEffect } from 'react'
import { cn } from "@/lib/utils"

interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

const isSameDate = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate()

const getStartOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1)
const getEndOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0)

const Calendar: React.FC<CalendarProps> = ({ selected, onSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(() => selected ?? new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(selected ?? null)

  useEffect(() => {
    if (selected) setSelectedDate(selected)
  }, [selected])

  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  const handleToday = () => {
    const today = new Date()
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1))
    setSelectedDate(today)
    onSelect?.(today)
  }

  const handleSelect = (date: Date) => {
    setSelectedDate(date)
    onSelect?.(date)
  }

  const renderDayNames = () =>
    DAYS.map(day => (
      <div
        key={day}
        className="text-xs font-semibold text-center text-gray-600 dark:text-gray-400 select-none"
        aria-hidden="true"
      >
        {day}
      </div>
    ))

  const renderDays = () => {
    const startOfMonth = getStartOfMonth(currentMonth)
    const endOfMonth = getEndOfMonth(currentMonth)
    const startDay = startOfMonth.getDay()
    const daysInMonth = endOfMonth.getDate()

    const today = new Date()

    const cells = []

    // Empty cells before first day of month
    for (let i = 0; i < startDay; i++) {
      cells.push(<div key={`empty-${i}`} aria-hidden="true" />)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const selected = selectedDate ? isSameDate(selectedDate, date) : false
      const isToday = isSameDate(today, date)

      cells.push(
        <button
          key={day}
          type="button"
          onClick={() => handleSelect(date)}
          aria-current={selected ? "date" : undefined}
          className={cn(
            "flex items-center justify-center rounded-full text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
            "min-w-[2 rem] min-h-[2 rem] w-full aspect-square",
            selected
              ? "bg-blue-600 text-white font-semibold shadow"
              : isToday
                ? "border border-blue-500 text-blue-600 font-semibold"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-300"
          )}
        >
          {day}
        </button>
      )
    }

    return cells
  }

  return (
    <section
      aria-label="Calendar"
      className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm max-w-md mx-auto"
    >
      <header className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Previous Month"
          type="button"
        >
          &lt;
        </button>

        <h2
          className="text-lg font-semibold text-gray-800 dark:text-gray-100 select-none"
          aria-live="polite"
          aria-atomic="true"
        >
          {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
        </h2>

        <button
          onClick={handleNextMonth}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Next Month"
          type="button"
        >
          &gt;
        </button>
      </header>

      <div
        role="grid"
        aria-rowcount={7}
        className="grid grid-cols-7 gap-2 sm:gap-1 p-1 sm:p-0 auto-rows-fr"
      >
        {/* Day Names */}
        {renderDayNames()}

        {/* Dates */}
        {renderDays()}
      </div>

      <footer className="flex gap-3 mt-6 flex-col sm:flex-row">
        <button
          onClick={handleToday}
          className="flex-1 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="button"
        >
          Today
        </button>

        <button
          onClick={handlePrevMonth}
          className="flex-1 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="button"
        >
          Last Month
        </button>
      </footer>
    </section>
  )
}

export default Calendar
