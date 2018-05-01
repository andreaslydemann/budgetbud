// ----------*ALL* RELATED TYPES----------
export const GET_INITIAL_STATE = 'get_initial_state';

// ----------NAVIGATION RELATED TYPES----------
export const SCREEN_CHANGED = 'screen_changed';

// ----------AUTH RELATED TYPES----------
export const GET_INITIAL_AUTH_STATE = 'get_initial_auth_state';
export const RESET_AUTH_ERROR = 'reset_auth_error';
export const CPR_NUMBER_CHANGED = 'cpr_number_changed';
export const PHONE_NUMBER_CHANGED = 'phone_number_changed';
export const VALIDATE_CPR_NUMBER_FAIL = 'validate_cpr_number_fail';
export const VALIDATE_PHONE_NUMBER_FAIL = 'validate_phone_number_fail';
export const VALIDATE_ACTIVATION_CODE_FAIL = 'validate_activation_code_fail';
export const VALIDATE_CODE_FAIL = 'validate_code_fail';
export const VALIDATE_CODE_MATCH_FAIL = 'validate_code_match_fail';
export const CODE_CHANGED = 'code_changed';
export const REPEATED_CODE_CHANGED = 'repeated_code_changed';
export const ACTIVATION_CODE_CHANGED = 'activation_code_changed';
export const SIGN_UP = 'sign_up';
export const SIGN_UP_FAIL = 'sign_up_fail';
export const SIGN_IN = 'sign_in';
export const SIGN_IN_FAIL = 'sign_in_fail';
export const DELETE_USER = 'delete_user';
export const DELETE_USER_FAIL = 'delete_user_fail';
export const REQUEST_ACTIVATION_CODE = 'request_activation_code';
export const REQUEST_ACTIVATION_CODE_SUCCESS = 'request_activation_code_success';
export const REQUEST_ACTIVATION_CODE_FAIL = 'request_activation_code_fail';
export const VERIFY_ACTIVATION_CODE = 'verify_activation_code';
export const VERIFY_ACTIVATION_CODE_SUCCESS = 'verify_activation_code_success';
export const VERIFY_ACTIVATION_CODE_FAIL = 'verify_activation_code_fail';
export const GET_PHONE_NUMBER = 'get_phone_number';
export const GET_PHONE_NUMBER_SUCCESS = 'get_phone_number_success';
export const GET_PHONE_NUMBER_FAIL = 'get_phone_number_fail';
export const CHANGE_PHONE_NUMBER = 'change_phone_number';
export const CHANGE_PHONE_NUMBER_SUCCESS = 'change_phone_number_success';
export const CHANGE_PHONE_NUMBER_FAIL = 'change_phone_number_fail';
export const CHANGE_CODE = 'change_code';
export const CHANGE_CODE_SUCCESS = 'change_code_success';
export const CHANGE_CODE_FAIL = 'change_code_fail';

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
export const DELETE_BUDGET_SUCCESS = 'delete_budget_success';
export const DELETE_BUDGET_FAIL = 'delete_budget_fail';
export const INCOME_CHANGED = 'income_changed';
export const CATEGORY_CHANGED = 'category_changed';
export const RESET_BUDGET_ERROR = 'reset_budget_error';

// ----------DEBT RELATED TYPES----------
export const RESET_DEBT_FORM = 'reset_debt_form';
export const RESET_DEBT_ERROR = 'reset_debt_error';
export const DEBT_NAME_CHANGED = 'debt_name_changed';
export const DEBT_AMOUNT_CHANGED = 'debt_amount_changed';
export const DEBT_EXPIRATION_DATE_CHANGED = 'debt_expiration_date_changed';
export const VALIDATE_DEBT_NAME_FAIL = 'validate_debt_name_fail';
export const VALIDATE_DEBT_AMOUNT_FAIL = 'validate_debt_amount_fail';
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
export const DELETE_DEBT_FAIL = 'delete_debt_fail';
export const CALCULATE_DEBT_CATEGORY_SUBTRACTIONS = 'calculate_debt_category_subtractions';
export const CALCULATE_DEBT_CATEGORY_SUBTRACTIONS_SUCCESS = 'calculate_debt_category_subtractions_success';
export const CALCULATE_DEBT_CATEGORY_SUBTRACTIONS_FAIL = 'calculate_debt_category_subtractions_fail';

// ----------CATEGORY RELATED TYPES----------
export const MAP_EXPENSES = 'map_expenses';
export const MAP_EXPENSES_SUCCESS = 'map_expenses_success';
export const MAP_EXPENSES_FAIL = 'map_expenses_fail';
export const CREATE_CATEGORIES = 'create_categories';
export const CREATE_CATEGORIES_SUCCESS = 'create_categories_success';
export const CREATE_CATEGORIES_FAIL = 'create_categories_fail';
export const GET_CATEGORIES = 'get_categories';
export const GET_CATEGORIES_SUCCESS = 'get_categories_success';
export const GET_CATEGORIES_FAIL = 'get_categories_fail';
export const GET_CATEGORIES_OF_DEBT = 'get_categories_of_debt';
export const GET_CATEGORIES_OF_DEBT_SUCCESS = 'get_categories_of_debt_success';
export const GET_CATEGORIES_OF_DEBT_FAIL = 'get_categories_of_debt_fail';
export const SETUP_EDIT_BUDGET = 'setup_edit_budget';
export const SETUP_EDIT_BUDGET_SUCCESS = 'setup_edit_budget_success';
export const SETUP_EDIT_BUDGET_FAIL = 'setup_edit_budget_fail';
export const CATEGORIES_SELECTED = 'categories_selected';
export const EDIT_CATEGORIES = 'edit_categories';
export const EDIT_CATEGORIES_SUCCESS = 'edit_categories_success';
export const EDIT_CATEGORIES_FAIL = 'edit_categories_fail';
export const VALIDATE_DEBT_CATEGORIES_FAIL = 'validate_debt_categories_fail';
export const CALCULATE_CATEGORY_SUBTRACTIONS_FAIL = 'calculate_category_subtractions_fail';
export const GET_TOTAL_GOALS_AMOUNT_SUCCESS = 'get_total_goals_amount';
export const RESET_CATEGORIES_ERROR = 'reset_categories_error';

// ----------ACCOUNT RELATED TYPES----------
export const RESET_ACCOUNTS_ERROR = 'reset_accounts_error';
export const GET_ACCOUNTS = 'get_ebanking_accounts';
export const GET_ACCOUNTS_SUCCESS = 'get_ebanking_accounts_success';
export const GET_ACCOUNTS_FAIL = 'get_ebanking_accounts_fail';
export const LINK_ACCOUNTS = 'link_accounts';
export const LINK_ACCOUNTS_SUCCESS = 'link_accounts_success';
export const LINK_ACCOUNTS_FAIL = 'link_accounts_fail';
export const ACCOUNTS_SELECTED = 'accounts_selected';
export const GET_LINKED_ACCOUNTS = 'get_linked_accounts';
export const GET_LINKED_ACCOUNTS_SUCCESS = 'get_linked_accounts_success';
export const GET_LINKED_ACCOUNTS_FAIL = 'get_linked_accounts_fail';

// ----------DISPOSABLE RELATED TYPES----------
export const RESET_DISPOSABLE_FORM = 'reset_disposable_form';
export const RESET_DISPOSABLE_ERROR = 'reset_disposable_error';
export const DISPOSABLE_AMOUNT_CHANGED = 'disposable_amount_changed';
export const EDIT_DISPOSABLE = 'edit_disposable';
export const EDIT_DISPOSABLE_SUCCESS = 'edit_disposable_success';
export const EDIT_DISPOSABLE_FAIL = 'edit_disposable_fail';
export const GET_DISPOSABLE_SUCCESS = 'get_disposable_success';
export const SET_TMP_DISPOSABLE = 'set_tmp_disposable';
export const CALCULATE_DISPOSABLE_CATEGORY_DIFFERENCES = 'calculate_disposable_category_differences';
export const CALCULATE_DISPOSABLE_CATEGORY_DIFFERENCES_SUCCESS = 'calculate_disposable_category_differences_success';
export const CALCULATE_DISPOSABLE_CATEGORY_DIFFERENCES_FAIL = 'calculate_disposable_category_differences_fail';

// ----------EXPENSES RELATED TYPES----------
export const GET_EXPENSES_OF_MONTH = 'get_expenses_of_month';
export const GET_EXPENSES_OF_MONTH_SUCCESS = 'get_expenses_of_month_success';
export const GET_EXPENSES_OF_MONTH_FAIL = 'get_expenses_of_month_fail';
export const RESET_EXPENSES_ERROR = 'reset_expenses_error';

// ----------ALARM RELATED TYPES----------
export const RESET_ALARMS_ERROR = 'reset_alarms_error';
export const BUDGET_EXCEEDED_TOGGLED = 'budget_exceeded_toggled';
export const WEEKLY_STATUS_TOGGLED = 'weekly_status_toggled';
export const TOGGLE_BUDGET_ALARMS = 'toggle_budget_alarms';
export const TOGGLE_BUDGET_ALARMS_SUCCESS = 'toggle_budget_alarms_success';
export const TOGGLE_BUDGET_ALARMS_FAIL = 'toggle_budget_alarms_fail';
export const TOGGLE_CATEGORY_ALARM = 'toggle_category_alarm';
export const TOGGLE_CATEGORY_ALARM_SUCCESS = 'toggle_category_alarm_success';
export const TOGGLE_CATEGORY_ALARM_FAIL = 'toggle_category_alarm_fail';
export const GET_BUDGET_ALARMS = 'get_budget_alarms';
export const GET_BUDGET_ALARMS_SUCCESS = 'get_budget_alarms_success';
export const GET_BUDGET_ALARMS_FAIL = 'get_budget_alarms_fail';
export const GET_CATEGORY_ALARMS = 'get_category_alarms';
export const GET_CATEGORY_ALARMS_SUCCESS = 'get_category_alarms_success';
export const GET_CATEGORY_ALARMS_FAIL = 'get_category_alarms_fail';
