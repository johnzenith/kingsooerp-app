import React from 'react';

import FormTemplate from '../../Form/FormTemplate';
import { NonJobRelatedFormFieldList } from './NonJobRelatedFormFieldList';

function AddFinanceRequestForNonJobRelatedForm() {
    
    return <FormTemplate
        title="Add Finance Request"
        formFieldsList={NonJobRelatedFormFieldList}
        line={false}
        header={false}
    />;
}

export default AddFinanceRequestForNonJobRelatedForm;