"use client"
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import "./index.css"
// import MailerForm from '../Components/Mailerform';


// Dynamally import the components to enable code splitting
// iport ScheduledMailings from '../Components/ScheduleMailings';
const MailerForm = dynamic(() => import('../Components/Mailerform'));
const ScheduledMailings = dynamic(() => import('../Components/ScheduleMailings'));

export default function MailingScheduler() {
  const [mailers, setMailers] = useState([]);
  const [lists, setLists] = useState([]);
  const [selectedMailer, setSelectedMailer] = useState('');
  const [selectedList, setSelectedList] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduledMailings, setScheduledMailings] = useState([]);
  const [editMailing, setEditMailing] = useState(null);

  // Mock data 
  const mockMailers = [
    { id: 1, name: 'Welcome Email Template' },
    { id: 2, name: 'Monthly Newsletter' },
    { id: 3, name: 'Special Offer - 50% Off' },
    { id: 4, name: 'Product Update Notification' },
    { id: 5, name: 'Event Invitation' },
];

const mockLists = [
    { id: 1, name: 'VIP Customers' },
    { id: 2, name: 'New Subscribers' },
    { id: 3, name: 'Inactive Users' },
    { id: 4, name: 'Frequent Shoppers' },
    { id: 5, name: 'Event Attendees' },
];

  useEffect(() => {
    //  API calling to fetch mailers and lists
    setMailers(mockMailers);
    setLists(mockLists);

    // Loading fa the scheduled mailings from localStorage to storing and retreviwing
    const storedMailings = JSON.parse(localStorage.getItem('scheduledMailings')) || [];
    setScheduledMailings(storedMailings);
  }, []);

  const handleScheduleMailing = (e) => {
    e.preventDefault();

    const newMailing = {
      id: editMailing ? editMailing.id : Date.now(),
      mailerId: selectedMailer,
      listId: selectedList,
      schedule: scheduleDate,
    };

    if (editMailing) {
      setScheduledMailings(scheduledMailings.map((mailing) =>
        mailing.id === editMailing.id ? newMailing : mailing
      ));
      setEditMailing(null);
    } else {
      setScheduledMailings([...scheduledMailings, newMailing]);
    }

    // Saving the new list of scheduled mailings to localStorage
    localStorage.setItem('scheduledMailings', JSON.stringify([...scheduledMailings, newMailing]));

    setSelectedMailer('');
    setSelectedList('');
    setScheduleDate('');
  };

  const handleDeleteMailing = (id) => {
    const updatedMailings = scheduledMailings.filter((mailing) => mailing.id !== id);
    setScheduledMailings(updatedMailings);
    localStorage.setItem('scheduledMailings', JSON.stringify(updatedMailings));
  };

  const handleEditMailing = (mailing) => {
    setSelectedMailer(mailing.mailerId);
    setSelectedList(mailing.listId);
    setScheduleDate(mailing.schedule);
    setEditMailing(mailing);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Mailing Scheduler</h1>

      <MailerForm
        mailers={mailers}
        lists={lists}
        handleScheduleMailing={handleScheduleMailing}
        selectedMailer={selectedMailer}
        setSelectedMailer={setSelectedMailer}
        selectedList={selectedList}
        setSelectedList={setSelectedList}
        scheduleDate={scheduleDate}
        setScheduleDate={setScheduleDate}
        editMailing={editMailing}
      />

      <ScheduledMailings
        scheduledMailings={scheduledMailings}
        mailers={mailers}
        lists={lists}
        handleEditMailing={handleEditMailing}
        handleDeleteMailing={handleDeleteMailing}
      />
    </div>
  );
}
