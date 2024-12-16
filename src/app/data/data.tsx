// Define the type for the items in the Technology array
type TechnologyType = {
    id: number;
    name: string;
};

// Define the Technology array with explicit typing
const Technology: TechnologyType[] = [
    { id: 1, name: 'General tech News' },
    { id: 2, name: 'Developer News' },
    { id: 3, name: 'Artificial intelligence' },
    { id: 4, name: 'Users contents' },
    { id: 5, name: 'Techs Competition' },
    { id: 6, name: 'Next Js' },
    { id: 7, name: 'git' },
    { id: 8, name: 'Python' },
    { id: 9, name: 'Others' },
];

// Export the array
export default Technology;
