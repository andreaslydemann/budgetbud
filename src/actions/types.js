// ----------NAVIGATION RELATED TYPES----------
export const SCREEN_CHANGED = 'screen_changed';

// ----------AUTH RELATED TYPES----------
export const GET_INITIAL_AUTH_STATE = 'get_initial_auth_state';
export const CPR_NUMBER_CHANGED = 'cpr_number_changed';
export const PHONE_NUMBER_CHANGED = 'phone_number_changed';
export const VALIDATE_CPR_NUMBER_FAIL = 'validate_cpr_number_fail';
export const VALIDATE_PHONE_NUMBER_FAIL = 'validate_phone_number_fail';
export const VALIDATE_CODE_FAIL = 'validate_code_fail';
export const CODE_CHANGED = 'code_changed';
export const SIGN_UP = 'sign_up';
export const SIGN_UP_FAIL = 'sign_up_fail';
export const SIGN_IN = 'sign_in';
export const SIGN_IN_FAIL = 'sign_in_fail';
export const DELETE_USER = 'delete_user';

// ----------BUDGET RELATED TYPES----------
export const GET_BUDGET_ID_SUCCESS = 'get_budget_id_success';
export const GET_BUDGET_ID_FAIL = 'get_budget_id_fail';
export const CREATE_BUDGET = 'create_budget';
export const CREATE_BUDGET_SUCCESS = 'create_budget_success';
export const CREATE_BUDGET_FAIL = 'create_budget_fail';
export const GET_INITIAL_BUDGET_STATE = 'get_initial_budget_state';
export const GET_BUDGET = 'get_budget';
export const GET_BUDGET_SUCCESS = 'get_budget_success';
export const GET_BUDGET_FAIL = 'get_budget_fail';
export const EDIT_BUDGET = 'edit_budget';
export const EDIT_BUDGET_SUCCESS = 'edit_budget_success';
export const EDIT_BUDGET_FAIL = 'edit_budget_fail';
export const DELETE_BUDGET = 'delete_budget';
export const INCOME_CHANGED = 'income_changed';
export const CATEGORY_CHANGED = 'category_changed';

// ----------DEBT RELATED TYPES----------
export const RESET_DEBT_FORM = 'reset_debt_form';
export const DEBT_NAME_CHANGED = 'debt_name_changed';
export const DEBT_AMOUNT_CHANGED = 'debt_amount_changed';
export const DEBT_EXPIRATION_DATE_CHANGED = 'debt_expiration_date_changed';
export const GET_DEBTS = 'get_debts';
export const GET_DEBTS_SUCCESS = 'get_debts_success';
export const GET_DEBTS_FAIL = 'get_debts_fail';
export const DEBT_SELECTED = 'debt_selected';
export const CREATE_DEBT = 'create_debt';
export const CREATE_DEBT_SUCCESS = 'create_debt_success';
export const CREATE_DEBT_FAIL = 'create_debt_fail';
export const EDIT_DEBT = 'edit_debt';
export const EDIT_DEBT_SUCCESS = 'edit_debt_success';
export const EDIT_DEBT_FAIL = 'edit_debt_fail';
export const DELETE_DEBT = 'delete_debt';

// ----------CATEGORY RELATED TYPES----------
export const GET_CATEGORIES = 'get_categories';
export const GET_CATEGORIES_SUCCESS = 'get_categories_success';
export const GET_CATEGORIES_FAIL = 'get_categories_fail';
export const GET_CATEGORIES_OF_DEBT = 'get_categories_of_debt';
export const GET_CATEGORIES_OF_DEBT_SUCCESS = 'get_categories_of_debt_success';
export const GET_CATEGORIES_OF_DEBT_FAIL = 'get_categories_of_debt_fail';
export const CATEGORIES_OF_DEBT_SELECTED = 'categories_of_debt_selected';
export const CALCULATE_CATEGORY_SUBTRACTIONS = 'calculate_category_subtractions';
export const CALCULATE_CATEGORY_SUBTRACTIONS_SUCCESS  = 'calculate_category_subtractions_success';

// ----------ACCOUNT RELATED TYPES----------
export const GET_ACCOUNTS = 'get_ebanking_accounts';
export const GET_ACCOUNTS_SUCCESS = 'get_ebanking_accounts_success';
export const GET_ACCOUNTS_FAIL = 'get_ebanking_accounts_fail';
export const LINK_ACCOUNTS = 'link_accounts';
export const LINK_ACCOUNTS_SUCCESS = 'link_accounts_success';
export const LINK_ACCOUNTS_FAIL = 'link_accounts_fail';
export const ACCOUNTS_SELECTED = 'accounts_selected';

// ----------DISPOSABLE RELATED TYPES----------
export const RESET_DISPOSABLE_FORM = 'reset_disposable_form';
export const DISPOSABLE_AMOUNT_CHANGED = 'disposable_amount_changed';
export const CREATE_DISPOSABLE = 'create_disposable';
export const CREATE_DISPOSABLE_SUCCESS = 'create_disposable_success';
