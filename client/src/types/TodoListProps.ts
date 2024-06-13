export interface TodoListProps {
    newColour: string;
    setNewColour: React.Dispatch<React.SetStateAction<string>>;
    isFilter: boolean;
    setIsFilter: React.Dispatch<React.SetStateAction<boolean>>;
  }
  