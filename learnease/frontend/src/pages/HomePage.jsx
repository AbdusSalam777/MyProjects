import React from 'react'
import HeroSection from '../components/HeroComponent'
import HomeDashboard from '../components/HomeDashboard'
import PreFooter from '../components/Homeprefoot'
import NextClassReminder from '../components/Reminder'
import NextAssignmentReminder from '../components/NextAssignmentReminder'
import NextQuizReminder from '../components/NextQuizReminder'
import UpcomingAlerts from '../components/ReminderComponent'
import Testinomials from '../components/testinomials'
import Coursecard from '../components/coursecard'
const HomePage = () => {

  return (
    <>
    <HeroSection/>
    <UpcomingAlerts/>
    <HomeDashboard/>
    <NextClassReminder/>
    <NextAssignmentReminder/>
    <NextQuizReminder/>
    <Coursecard/>
    <Testinomials/>
    <PreFooter/>

    </>
  )
}
export default HomePage;