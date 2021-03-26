import React from 'react';
import { useHistory } from 'react-router-dom';
import SendIcon from '@material-ui/icons/Send';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';

import FormTemplate from '../Form/FormTemplate';
import MainButton from './../Button/MainButton';
import GridContainer from './../Grid/GridContainer';
import GridItem from './../Grid/GridItem';
import { getRegisteredFormField } from '../../../helpers/getRegisteredFormFields';
import FlexBoxGrow from '../Flexbox/FlexBoxGrow';


function Finance() {
    const history = useHistory();

    return (
        <div>
            <GridContainer margin="5px 0px 0px 0px" padding="0px 5px">
                <GridItem
                    md={12}
                    lg={12}
                >
                    <MainButton
                        label="Make Finance Request"
                        iconStyle={{ marginRight: '6px' }}
                        style={{
                            boxShadow: '0px 4px 8px #999',
                        }}
                        onClick={() => { history.push('/finance/request/new'); }}
                    />             
                </GridItem>
            </GridContainer>

            <GridContainer margin="5px 0px 0px 0px" padding="0px 5px">
                <GridItem
                    md={4}
                    lg={4}
                >
                    Card
                </GridItem>
                <GridItem
                    md={4}
                    lg={4}
                >
                    Card
                </GridItem>
                <GridItem
                    md={4}
                    lg={4}
                >
                    Card
                </GridItem>
            </GridContainer>

            <GridContainer margin="5px 0px 0px 0px" padding="0px 5px">
                <GridItem
                    md={12}
                    lg={12}
                >
                Table
                </GridItem>
            </GridContainer>
        </div>
    );
}

export default Finance;