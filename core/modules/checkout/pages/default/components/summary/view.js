import Button from '@common_button';
import CircularProgress from '@common_circularprogress';
import Typography from '@common_typography';
import useStyles from '@core_modules/checkout/pages/default/components/summary/style';
import { formatPrice } from '@helper_currency';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useState } from 'react';

const SummaryView = (props) => {
    const styles = useStyles();
    const {
        handlePlaceOrder, loading, data, total, t, disabled,
    } = props;
    const [expanded, setExpanded] = useState(null);
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    return (
        <div className={styles.footer}>
            <ExpansionPanel expanded={expanded === 1} onChange={handleChange(1)} className={styles.expand}>
                <ExpansionPanelSummary
                    classes={{
                        root: styles.expanHead,
                        expanded: styles.expandHeadOpen,
                    }}
                >
                    {expanded === 1 ? <ExpandLess /> : <ExpandMore />}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={styles.expanBody}>
                    {data.map((list, index) => (
                        <div className={styles.listSummary} key={index}>
                            <Typography variant="span" letter="capitalize">
                                {list.item}
                            </Typography>
                            <Typography variant="span" letter="uppercase">
                                {list.value}
                            </Typography>
                        </div>
                    ))}
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <div className={styles.listSummary}>
                <Typography variant="title" type="bold" letter="capitalize">
                    Total
                </Typography>
                <Typography variant="title" type="bold" letter="uppercase">
                    {total.currency ? formatPrice(total.value, total.currency) : null}
                </Typography>
            </div>
            <Button onClick={handlePlaceOrder} className={styles.btnSave} disabled={loading || disabled}>
                {t('checkout:placeOrder')}
                {loading && <CircularProgress />}
            </Button>
        </div>
    );
};

export default SummaryView;
