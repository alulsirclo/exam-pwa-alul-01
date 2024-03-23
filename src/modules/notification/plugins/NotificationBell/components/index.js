/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import cx from 'classnames';
import Link from 'next/link';

import BadgeCounter from '@common_badgecounter';

// eslint-disable-next-line no-unused-vars
const Content = ({ withLink, totalUnread }) => {
    if (withLink) {
        return (
            <Link href={withLink && '/inboxnotification/notification'} className={cx('cursor-pointer', 'group')}>
                <BadgeCounter value={totalUnread}>
                    <BellIcon
                        stroke="#5F6774"
                        strokeWidth={1.5}
                        fill="none"
                        className={cx('w-[24px]', 'text-neutral-600', 'hover:text-primary-700', 'group-hover:text-primary-700', 'mt-3')}
                    />
                </BadgeCounter>
            </Link>
        );
    }

    return (
        <div className={cx('cursor-pointer', 'group')}>
            <BellIcon
                stroke="#5F6774"
                strokeWidth={1.5}
                fill="none"
                className={cx('w-[24px]', 'text-neutral-600', 'hover:text-primary-700', 'group-hover:text-primary-700', 'mt-3')}
            />
        </div>
    );
};

export default Content;
