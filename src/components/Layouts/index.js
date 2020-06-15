/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import Navigation from '@components/Navigation';
import Header from '@components/Header';
import Head from 'next/head';
import TagManager from 'react-gtm-module';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { custDataNameCookie } from '@config';
import { getHost } from '@helpers/config';

const Layout = (props) => {
    const {
        pageConfig,
        children,
        CustomHeader = false,
        i18n, storeConfig = {},
        isLogin,
    } = props;
    const { ogContent = {}, schemaOrg = null } = pageConfig;
    const router = useRouter();
    const ogData = {
        'og:title': pageConfig.title ? pageConfig.title : 'Swift PWA',
        'og:image': storeConfig.header_logo_src
            ? `${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`
            : `${getHost()}/assets/img/swift-logo.png`,
        'og:image:type': 'image/png',
        'og:url': `${getHost()}${router.asPath}`,
        'og:locale': i18n && i18n.language === 'id' ? 'id_ID' : 'en_US',
        'og:type': 'website',
        ...ogContent,
    };
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const custData = Cookies.getJSON(custDataNameCookie);
            const tagManagerArgs = {
                dataLayer: {
                    pageName: pageConfig.title,
                    customerGroup: isLogin === 1 ? 'GENERAL' : 'NOT LOGGED IN',
                },
            };
            if (custData && custData.email) tagManagerArgs.dataLayer.customerId = custData.email;
            TagManager.dataLayer(tagManagerArgs);
        }
    }, []);
    return (
        <>
            <Head>
                <meta name="keywords" content={pageConfig.title ? pageConfig.title : 'Swift PWA'} />
                <meta name="robots" content="INDEX,FOLLOW" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
                <meta name="format-detection" content="telephone=no" />
                {Object.keys(ogData).map((key, idx) => {
                    if (typeof ogData[key] === 'object' && ogData[key].type && ogData[key].type === 'meta') {
                        return <meta name={`${key}`} content={ogData[key].value} key={idx} />;
                    }
                    return <meta property={`${key}`} content={ogData[key]} key={idx} />;
                })}
                <title>{pageConfig.title ? pageConfig.title : 'Swift PWA'}</title>
                {schemaOrg
                    ? (
                        schemaOrg.map((val) => (
                            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(val) }} />
                        ))
                    ) : null}
            </Head>

            {React.isValidElement(CustomHeader) ? <>{React.cloneElement(CustomHeader, { pageConfig })}</> : <Header pageConfig={pageConfig} />}

            <main style={{ marginBottom: pageConfig.bottomNav ? '60px' : 0 }}>{children}</main>
            <footer>
                <Navigation active={pageConfig.bottomNav} />
            </footer>
        </>
    );
};

export default Layout;
