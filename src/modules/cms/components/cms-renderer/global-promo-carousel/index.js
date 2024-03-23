/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable consistent-return */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import cx from 'classnames';
import parse, { domToReact } from 'html-react-parser';
import propTypes from 'prop-types';
import React from 'react';

import Button from '@common_button';
import { BREAKPOINTS } from '@core/theme/vars';

import ChevronLeftIcon from '@heroicons/react/20/solid/ChevronLeftIcon';
import ChevronRightIcon from '@heroicons/react/20/solid/ChevronRightIcon';

const WidgetSliderCarousel = (props) => {
    // WIP : AUTOPLAY
    const { content, className, autoPlaySpeed = 5000 } = props;

    const [activeTabs, setActiveTabs] = React.useState(0);
    const [showNav, setShowNav] = React.useState(false);
    let countTabs = 0;

    const optionSlider = {
        replace: ({ name, children }) => {
            if (name === 'ul') {
                return (
                    // eslint-disable-next-line no-return-assign
                    <div className={cx('slide-content-wrapper', 'relative', 'mobile:max-tablet:pt-1')}>{domToReact(children, optionSlider)}</div>
                );
            }
            if (name === 'li') {
                countTabs += 1;
                const id = countTabs - 1;
                return (
                    <div
                        className={cx('slide-content', {
                            hidden: activeTabs !== id,
                        })}
                        data-index={id}
                        key={id}
                    >
                        {domToReact(children, optionSlider)}
                    </div>
                );
            }
        },
    };

    const options = {
        replace: ({ attribs, children }) => {
            if (attribs) {
                if (attribs.id !== 'slides') {
                    return <div className="slide-container">{domToReact(children, optionSlider)}</div>;
                }
            }
        },
    };

    React.useEffect(() => {
        if (countTabs > 1) {
            setShowNav(true);
        }
    }, [countTabs]);

    // WIP : AUTOPLAY
    React.useEffect(() => {
        const autoPlayInterval = setInterval(() => {
            if (activeTabs + 1 === countTabs) {
                setActiveTabs(0);
            } else {
                setActiveTabs(activeTabs + 1);
            }
        }, autoPlaySpeed);

        return () => clearInterval(autoPlayInterval);
    }, [activeTabs]);

    if (content && content !== '') {
        return (
            <div className={className}>
                <div className={cx('slider-container', 'h-[45px]', 'overflow-hidden', 'text-center', 'p-[8px_25%]')}>
                    {showNav ? (
                        <Button
                            onClick={() => {
                                if (activeTabs - 1 < 0) {
                                    setActiveTabs(countTabs - 1);
                                } else {
                                    setActiveTabs(activeTabs - 1);
                                }
                            }}
                            className={cx(
                                'absolute',
                                'mobile:max-tablet:left-[0%]',
                                'tablet:left-[5%]',
                                'tablet:!top-[40%]',
                                'mobile:max-tablet:!top-[50%]',
                                '!py-0',
                                'bg-[transparent]',
                                'translate-y-[-50%]',
                            )}
                            variant="plain"
                            iconOnly
                            icon={<ChevronLeftIcon />}
                            iconProps={{ className: '!text-neutral-white !opacity-100 mobile:max-tablet:h-[20px] mobile:max-tablet:w-[20px]' }}
                        />
                    ) : null}

                    {parse(content, options)}
                    {showNav ? (
                        <Button
                            onClick={() => {
                                if (activeTabs + 1 === countTabs) {
                                    setActiveTabs(0);
                                } else {
                                    setActiveTabs(activeTabs + 1);
                                }
                            }}
                            className={cx(
                                'absolute',
                                'mobile:max-tablet:right-[0%]',
                                'tablet:right-[5%]',
                                'tablet:!top-[40%]',
                                'mobile:max-tablet:!top-[50%]',
                                '!py-0',
                                'bg-[transparent]',
                                'translate-y-[-50%]',
                            )}
                            variant="plain"
                            iconOnly
                            icon={<ChevronRightIcon />}
                            iconProps={{ className: '!text-neutral-white !opacity-100 mobile:max-tablet:h-[20px] mobile:max-tablet:w-[20px]' }}
                        />
                    ) : null}
                </div>
                <style jsx>
                    {`
                        .close-btn-widget-slider {
                            background: none;
                        }
                        .slider-container {
                            height: 45px;
                            overflow: hidden;
                            text-align: center;
                            padding: 8px;
                            font-size: 14px;
                            justify-content: center;
                        }

                        @media (max-width: ${BREAKPOINTS.md - 1}px) {
                            .slider-container {
                                height: auto;
                                padding: 5px 10px;
                                font-size: 12px;
                            }
                        }

                        .btn-bar {
                            display: none;
                        }
                    `}
                </style>
            </div>
        );
    }
    return null;
};

WidgetSliderCarousel.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    content: propTypes.string.isRequired,
    className: propTypes.string,
};

WidgetSliderCarousel.defaultProps = {
    className: '',
};

export default WidgetSliderCarousel;
