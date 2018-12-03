import React from 'react';
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';

const TwoCol = props => {
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={8}
        >
            <Grid item md={4} xs={12}>
                {props.left}
            </Grid>
            <Grid item md={8} xs={12}>
                {props.right}
            </Grid>
        </Grid>
    );
};

TwoCol.propTypes = {
    left: PropTypes.node.isRequired,
    right: PropTypes.node.isRequired,
};

export default TwoCol;