const firebaseAuthErrorMap = {
 // General
  "auth/internal-error":
    "An internal error occurred. Please try again.",
  "auth/invalid-credential":
    "Invalid email or password.",
  "auth/invalid-email":
    "Please enter a valid email address.",
  "auth/missing-email":
    "Email address is required.",
  "auth/missing-password":
    "Password is required.",
  "auth/operation-not-allowed":
    "This sign-in method is not enabled.",
  "auth/too-many-requests":
    "Too many attempts. Please try again later.",

  // Sign up
  "auth/email-already-in-use":
    "This email is already registered. Please sign in.",
  "auth/weak-password":
    "Password should be at least 6 characters.",

  // Sign in
  "auth/user-not-found":
    "Invalid email or password.",
  "auth/wrong-password":
    "Invalid email or password.",
  "auth/user-disabled":
    "This account has been disabled. Contact support.",

  // Token / session
  "auth/id-token-expired":
    "Your session has expired. Please sign in again.",
  "auth/id-token-revoked":
    "Your session has been revoked. Please sign in again.",
  "auth/session-cookie-expired":
    "Session expired. Please sign in again.",

  // Network / environment
  "auth/network-request-failed":
    "Network error. Check your internet connection.",

  // Provider related
  "auth/account-exists-with-different-credential":
    "An account already exists with a different sign-in method.",

  // Admin / server-side (fallback friendly messages)
  "auth/project-not-found":
    "Authentication service is temporarily unavailable.",
  "auth/insufficient-permission":
    "Permission denied. Please contact support.",
};

export const getFirebaseAuthError = (errorCode) => {
  return (
    firebaseAuthErrorMap[errorCode] ||
    "Something went wrong. Please try again."
  );
};
