import "../styles/styles.css"
import './Mailform.css';
const MailerForm = ({
  mailers,
  lists,
  handleScheduleMailing,
  selectedMailer,
  setSelectedMailer,
  selectedList,
  setSelectedList,
  scheduleDate,
  setScheduleDate,
  editMailing,
}) => {
  return (
    <form onSubmit={handleScheduleMailing}>
      <div>
        <label htmlFor="mailer">Select Mailer</label>
        <select
          id="mailer"
          value={selectedMailer}
          onChange={(e) => setSelectedMailer(e.target.value)}
          required
        >
          <option value="">Select Mailer</option>
          {mailers.map((mailer) => (
            <option key={mailer.id} value={mailer.id}>
              {mailer.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="list">Select List</label>
        <select
          id="list"
          value={selectedList}
          onChange={(e) => setSelectedList(e.target.value)}
          required
        >
          <option value="">Select List</option>
          {lists.map((list) => (
            <option key={list.id} value={list.id}>
              {list.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="schedule">Schedule Date and Time</label>
        <input
          type="datetime-local"
          id="schedule"
          value={scheduleDate}
          onChange={(e) => setScheduleDate(e.target.value)}
          required
        />
      </div>

      <button type="submit">{editMailing ? 'Update Mailing' : 'Schedule Mailing'}</button>
    </form>
  );
};

export default MailerForm;
