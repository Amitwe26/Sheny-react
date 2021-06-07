import { NotificationPreview } from "./NotificationPreview"

export function NotificationList({ notifications }) {
    return (
        <section>
            {notifications?.map((notification, idx) => {
                return (
                    <NotificationPreview
                        key={idx}
                        notification={notification}
                    />
                )
            })}
        </section>
    )
}
