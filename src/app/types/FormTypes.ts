// types/FormTypes.ts
export interface InputFieldT {
    type: string; // Type of the input (e.g., "text", "password", "email")
    name: string; // Name of the input field, used for form data
    placeholder: string; // Placeholder text inside the input field
    label: string; // Label text that describes the input field
    register: any; // Register function from react-hook-form (you could be more specific if you want)
    error?: {
      message: string; // Error message to be displayed if the input is invalid
    };
  }
  