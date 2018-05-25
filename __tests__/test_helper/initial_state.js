export const INITIAL_BUDGET_STATE = {
    budgetID: '',
    income: 0,
    budgetError: '',
    budgetIDError: '',
    budgetLoading: false,
    budgetInitialized: false
};

export const INITIAL_CATEGORY_STATE = {
    categories: [],
    categoriesOfDebt: [],
    selectedCategories: [],
    categorySubtractions: [],
    categoriesLoading: false,
    subtractionsLoading: false,
    categoriesError: '',
    totalGoalsAmount: 0,
    categoriesInitialized: false
};

export const INITIAL_DISPOSABLE_STATE = {
    disposable: 0,
    disposableLoading: false,
    disposableError: '',
    disposableCalculationLoading: false,
    disposableCategorySubtractions: []
};

export const INITIAL_ACCOUNT_STATE = {
    accounts: [],
    linkedAccounts: [],
    accountsLoading: false,
    linkLoading: false,
    accountsError: '',
    accountsInitialized: false,
};

export const INITIAL_DEBT_STATE = {
    name: '',
    totalAmount: '',
    amountPerMonth: '',
    expirationDate: '',
    debts: [],
    selectedDebt: '',
    categorySubtractions: [],
    debtLoading: false,
    debtError: '',
    debtsInitialized: false
};