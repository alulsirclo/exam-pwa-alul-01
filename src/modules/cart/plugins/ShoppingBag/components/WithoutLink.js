import ShoppingCartIcon from '@heroicons/react/24/solid/ShoppingCartIcon';
import cx from 'classnames';

import BadgeCounter from '@common_badgecounter';

const WithoutLink = ({ cartData = 0 }) => (
    <BadgeCounter value={cartData}>
        <ShoppingCartIcon
            stroke="#5F6774"
            strokeWidth={1.5}
            fill="none"
            className={cx('w-[24px]', 'text-neutral-600', 'mt-3')}
        />
    </BadgeCounter>
);

export default WithoutLink;
