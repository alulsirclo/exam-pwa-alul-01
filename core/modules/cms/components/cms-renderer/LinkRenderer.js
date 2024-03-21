import React from 'react';
import Link from 'next/link';
import { domToReact } from 'html-react-parser';
import { getStoreHost } from '@helpers/config';
import { getAppEnv } from '@helpers/env';

const LinkRenderer = (props) => {
    const { domNode } = props;
    const { attribs, children } = domNode;

    const getUrl = () => {
        if (attribs.href.indexOf('media') !== -1) {
            const url = attribs.href.replace('{{media url=', '').replace('}}', '').replace(/"/g, '');

            return `${getStoreHost(getAppEnv())}media/${url}`;
        }
        return attribs.href;
    };

    const customChildren = children.map((item) => {
        // if has <img on text link
        if (item.name === 'img') {
            let { src } = item.attribs;
            if (src.includes('media url=')) {
                const urlClean = src.replace('{{media url=', '').replace('}}', '').replace(/"/g, '');
                src = `${getStoreHost(getAppEnv())}media/${urlClean}`;
            }
            return { ...item, attribs: { ...item.attribs, src } };
        }
        return item;
    });

    return (
        <Link {...attribs} href={getUrl()}>
            {domToReact(customChildren, domNode)}
        </Link>
    );
};

export default LinkRenderer;
