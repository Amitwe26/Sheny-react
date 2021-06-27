export function NotificationPreview({ notification }) {
  return (
    <section className='noti-preview'>
      <span>{notification.byUser.fullname}</span>
      <span className='noti-content'>{notification.content}</span>
    </section>
  );
}
