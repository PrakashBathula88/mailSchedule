import "./schedule.css";

const ScheduledMailings = ({ scheduledMailings, mailers, lists, handleEditMailing, handleDeleteMailing }) => {
  return (
    <div className="scheduled-mailings-container">
      <h2 className="scheduled-mailings-title">Scheduled Mailings</h2>
      
      {scheduledMailings.length === 0 ? (
        <p className="no-mailings">No mailings scheduled yet.</p>
      ) : (
        <ul className="mailings-list">
          {scheduledMailings.map((mailing) => {
            const mailer = mailers.find((m) => m.id === mailing.mailerId);
            const list = lists.find((l) => l.id === mailing.listId);
            
            return (
              <li key={mailing.id} className="mailings-item">
                <p>
                  <strong>Mailer:</strong> {mailer ? mailer.name : 'Unknown Mailer'}
                </p>
                <p>
                  <strong>List:</strong> {list ? list.name : 'Unknown List'}
                </p>
                <p>
                  <strong>Schedule:</strong> {new Date(mailing.schedule).toLocaleString()}
                </p>

                <div className="action-buttons">
                  <button 
                    onClick={() => handleEditMailing(mailing)}
                    className="edit"
                    aria-label="Edit mailing"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteMailing(mailing.id)}
                    className="delete"
                    aria-label="Delete mailing"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ScheduledMailings;
