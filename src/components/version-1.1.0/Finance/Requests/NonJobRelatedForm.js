import React from 'react';

import FormTemplate from '../../Form/FormTemplate';
import { NonJobRelatedFormFieldList } from './NonJobRelatedFormFieldList';

function AddFinanceRequestForNonJobRelatedForm() {
    
    return <FormTemplate
        title="Add Finance Request | Non Job Related"
        formFieldsList={NonJobRelatedFormFieldList}
    />;
}

export default AddFinanceRequestForNonJobRelatedForm;