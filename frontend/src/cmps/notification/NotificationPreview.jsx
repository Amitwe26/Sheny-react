
export function NotificationPreview({ notification }) {
    console.log('notification is:', notification);
    return (
        <section className="noti-preview">
            <span>{notification.byUser.fullname}</span>
            <span className="noti-content">{notification.content}</span>
        </section>
    )
}
