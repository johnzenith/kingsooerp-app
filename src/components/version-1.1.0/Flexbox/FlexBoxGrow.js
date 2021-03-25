import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

function FlexBoxGrow({ flexGrow = 1, items, style = {} }) {
    return (
        <div style={{ width: '100%', marginTop: '-5px', ...style }}>
            <Box display="flex" p={0}>

                {items.map((item, index) => {
                    const [itemKey, isFlexGrow] = [`flex_box_grow_item_${index}`, index < 1];
                    
                    return (
                        isFlexGrow ?  
                            <Box key={itemKey} p={0} flexGrow={flexGrow}>{item}</Box>
                            : 
                            <Box key={itemKey} p={0}>{item}</Box>
                    );
                })}

            </Box>
        </div>
    );
}

FlexBoxGrow.propTypes = {
    items:    PropTypes.arrayOf(PropTypes.node.isRequired),
    style:    PropTypes.object,
    flexGrow: PropTypes.number,
};

export default FlexBoxGrow;