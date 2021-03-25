import React from 'react';

import FormTemplate from '../../Form/FormTemplate';
import { JobRelatedFormFieldList } from './JobRelatedFormFieldList';

function AddFinanceRequestForJobRelatedForm() {
    
    return <FormTemplate
        title="Add Finance Request"
        formFieldsList={JobRelatedFormFieldList}
        line={false}
        header={false}
    />;
}

export default AddFinanceRequestForJobRelatedForm;