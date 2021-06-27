import { NotificationList } from './NotificationList';

export function NotificationModal({ notifications }) {
  return (
    <section className='noti-modal'>
      <span className='noti-header'>notifications:</span>
      <NotificationList notifications={notifications} />
    </section>
  );
}
