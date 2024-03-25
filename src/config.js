export const getMissingEnvironmentVariables = () => {
  const missingEnvironmentVariables = [];
  if (!process.env.OPEN_AI_KEY) {
    missingEnvironmentVariables.push("OPEN_AI_KEY");
  }
  if (!process.env.SERPER_API_KEY) {
    missingEnvironmentVariables.push("SERPER_API_KEY");
  }
  if (!process.env.TAVILY_API_KEY) {
    missingEnvironmentVariables.push("TAVILY_API_KEY");
  }
  return missingEnvironmentVariables;
}
