import React from 'react';
import DashboardCard from './DashboardCard';
import DashboardCardItem from './DashboardCardItem';
import EmployeesManagement from '../EmployeesManagement/EmployeesManagement';
import { 
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ApartmentIcon from '@material-ui/icons/Apartment';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ReceiptIcon from '@material-ui/icons/Receipt';
import HistoryIcon from '@material-ui/icons/History';

import AddEmployeeForm from './../version-1.1.0/EmployeeManagement/AddEmployeeForm';
import AddFinanceRequestForNonJobRelatedForm from './../version-1.1.0/Finance/Requests/NonJobRelatedForm';

const cardItems = [
    {
        cardIcon: <PeopleAltIcon />,
        label: 'Total Employees',
        value: 0,
        docField: 'totalEmployees',
        collectionId: 'employees',
    },
    {
        cardIcon: <CreditCardIcon />,
        label: 'My Requests',
        value: 0,
    },
    {
        cardIcon: <ApartmentIcon />,
        label: 'Total Departments',
        value: 0,
    },
    {
        cardIcon: <AccountBalanceWalletIcon />,
        label: 'Total Payment Type',
        value: 0,
    },
    {
        cardIcon: <ReceiptIcon />,
        label: 'Total Leave Requests',
        value: 0,
    },
    {
        cardIcon: <HistoryIcon />,
        label: 'Total Benefits and Compensation',
        value: 0,
    },
];

export default function DashboardContent() {
    const cards = cardItems.map((cardItem, index) => {
        return (
            <DashboardCardItem 
                key={`dashboard_card_${index}`} 
                {...cardItem}
            />
        );
    });

    const RenderDashboardCard = () => (
        <DashboardCard children={cards} />
    );

    return (
        <div>

            {false && <AddEmployeeForm />}

            <Switch>
                <Route exact path="/human-resource/dashboard" component={RenderDashboardCard} />
                <Route path="/human-resource/employees-management" component={AddFinanceRequestForNonJobRelatedForm} />
                <Route 
                    render={() => <Redirect to="/human-resource/dashboard" />}
                />
            </Switch>
        </div>
    );
}
