export interface FinancialData {
    balance: number;
    savings: number;
    income_value: number;
    expense_value: number;
};

export interface Bills {
    description: string;
    due_date: string;
    is_paid: boolean;
    amount: number;
}

export interface FetchBillsResult {bills: Bills[], count: number};