const genAIErrorMap = {
  // API / response issues
  "NO_CHOICES":
    "AI could not generate a response. Please try again.",
  "EMPTY_RESPONSE":
    "The AI response was empty. Please retry.",
  "INVALID_RESPONSE":
    "Received an invalid response from AI.",
  "MODEL_ERROR":
    "AI model is currently unavailable.",

  // Network / quota
  "NETWORK_ERROR":
    "Network error while contacting AI service.",
  "RATE_LIMIT_EXCEEDED":
    "Too many requests. Please try again later.",

  // Safety / content
  "CONTENT_BLOCKED":
    "The generated content was blocked due to safety reasons.",

  // Fallback
  "UNKNOWN_ERROR":
    "Something went wrong while generating results.",
};

export const getGenAIError = (errorCode) =>
  genAIErrorMap[errorCode] ||
  "Something went wrong. Please try again.";

export default genAIErrorMap;
