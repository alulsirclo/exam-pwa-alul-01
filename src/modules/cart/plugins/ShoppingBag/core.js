/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */
import { useApolloClient, useQuery } from '@apollo/client';
import { getCountCart } from '@core_modules/cart/services/graphql';
import { getCartIdUser } from '@core_modules/cart/services/graphql/schema';
import { getCountCart as getCountCartRoot } from '@core_modules/theme/services/graphql';
import { getLoginInfo } from '@helper_auth';
import { getCartId, removeCartId, setCartId } from '@helper_cartid';
import { localTotalCart } from '@services/graphql/schema/local';
import dynamic from 'next/dynamic';
import propTypes from 'prop-types';

const MiniCart = dynamic(() => import('@plugin_minicart'), { ssr: false });

const ShoppingBagIcon = ({
    withLink, WihtLinkView, WithoutLinkView, storeConfig,
}) => {
    const clientApollo = useApolloClient();
    let isLogin = 0;
    let cartId = '';
    const [open, setOpen] = React.useState(false);
    if (typeof window !== 'undefined') {
        isLogin = getLoginInfo();
        cartId = getCartId();
    }
    const cartUser = useQuery(getCartIdUser, {
        context: {
            request: 'internal',
        },
        fetchPolicy: 'no-cache',
        skip: !isLogin,
    });

    if (isLogin && (cartId === '' || !cartId || cartId === undefined)) {
        if (cartUser.data) {
            const cartToken = cartUser.data.customerCart.id || '';
            cartId = cartToken;
            setCartId(cartToken);
        }
    }
    const {
        loading: getQtyLoading, data: getQtyData, error: getQtyError, refetch: getQtyRefetch,
    } = getCountCart(cartId);

    const reloadCartQty = typeof window !== 'undefined' && window && window.reloadCartQty;
    const [getCart, RespondCart] = getCountCartRoot();
    if (typeof window !== 'undefined') {
        cartId = getCartId();
    }

    React.useEffect(() => {
        if (RespondCart && RespondCart.data) {
            clientApollo.writeQuery({
                query: localTotalCart,
                data: { totalCart: RespondCart.data.cart.total_quantity },
            });
        }
    }, [RespondCart]);

    React.useEffect(() => {
        if (reloadCartQty && cartId) {
            getQtyRefetch();
            // query get cart
            getCart({
                variables: {
                    cartId,
                },
            });
            window.reloadCartQty = false;
        }
    }, [reloadCartQty]);

    // remove cart id if invalid
    if (!getQtyLoading && (!getQtyData || getQtyError)) {
        removeCartId();
    }
    const { data, client } = useQuery(localTotalCart);
    React.useEffect(() => {
        if (!getQtyLoading && getQtyData) {
            client.writeQuery({ query: localTotalCart, data: { totalCart: getQtyData.cart.total_quantity } });
        }
    }, [getQtyData, getQtyLoading, getQtyError]);

    const cartData = data && data.totalCart ? data.totalCart : 0;
    const handleLink = () => {
        setOpen(true);
    };
    if (withLink) {
        return (
            <>
                {typeof window !== 'undefined' && open ? (
                    <MiniCart storeConfig={storeConfig} open={open} setOpen={() => setOpen(!open)} count={cartData} />
                ) : null}
                <WihtLinkView cartData={cartData} handleLink={handleLink} />
            </>
        );
    }
    return (
        <>
            {typeof window !== 'undefined' && open && cartData > 0 ? (
                <MiniCart storeConfig={storeConfig} open={open} setOpen={() => setOpen(!open)} count={cartData} />
            ) : null}
            <WithoutLinkView cartData={cartData} />
        </>
    );
};

ShoppingBagIcon.propTypes = {
    withLink: propTypes.bool,
    WihtLinkView: propTypes.func.isRequired,
    WithoutLinkView: propTypes.func.isRequired,
};

export default ShoppingBagIcon;
