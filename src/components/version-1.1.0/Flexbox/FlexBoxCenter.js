import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

function FlexBoxCenter({ items, style = {} }) {
    return (
        <div style={{ width: '100%', marginTop: '-5px', ...style }}>
            <Box display="flex" p={0} justifyContent="center" alignItems="center">

                {items.map((item, index) => {
                    const flex = item?.flex instanceof Object ? item.flex : {flex: item?.flex ?? 1};

                    return (
                        <Box 
                            key={`flex_box_center_item_${index}`} 
                            p={0} 
                            justifyContent="center" 
                            alignItems="center"
                            {...{ flex: 1, ...flex}}
                        >
                            {item?.content ?? item}
                        </Box>
                    );
                })}

            </Box>
        </div>
    );
}

FlexBoxCenter.propTypes = {
    style: PropTypes.object,

    items: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.node,
        ])).isRequired,
};

export default FlexBoxCenter;