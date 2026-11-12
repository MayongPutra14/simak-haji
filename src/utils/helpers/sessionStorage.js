const DRAFT_USER_KEY = 'draft_user_id';
const CURRENT_STEP_KEY = 'current_step';

export const createUserSession = (userId, step) => {
  if (userId) sessionStorage.setItem(DRAFT_USER_KEY, String(userId));
  if (step) sessionStorage.setItem(CURRENT_STEP_KEY, String(step));
};

export const getUserSession = () => {
  const userId = sessionStorage.getItem(DRAFT_USER_KEY);
  const step = sessionStorage.getItem(CURRENT_STEP_KEY);

  return {
    userId: userId || null,
    step: step ? parseInt(step, 10) : 1,
  };
};

export const deleteUserSession = () => {
  sessionStorage.removeItem(DRAFT_USER_KEY);
  sessionStorage.removeItem(CURRENT_STEP_KEY);
};
