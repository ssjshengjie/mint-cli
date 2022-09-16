import prompts from "prompts";
export const init = async () => {
  try {
    return await prompts([
      {
        name: "projectName",
        type: "text",
        message: "Projec Name",
        initial: "vue-project",
      },
      {
        name: "needsTypeScript",
        type: "toggle",
        message: "Add TypeScript?",
        initial: false,
        active: "Yes",
        inactive: "No",
      },
      {
        name: "needsJsx",
        type: "toggle",
        message: "Add JSX Support?",
        initial: false,
        active: "Yes",
        inactive: "No",
      },
      {
        name: "needsRouter",
        type: "toggle",
        message: "Add Vue Router for Single Page Application development?",
        initial: false,
        active: "Yes",
        inactive: "No",
      },
      {
        name: "needsPinia",
        type: "toggle",
        message: "Add Pinia for state management?",
        initial: false,
        active: "Yes",
        inactive: "No",
      },
    ]);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
