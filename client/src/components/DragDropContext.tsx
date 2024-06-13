
// import React, { createContext, useContext, useState, useCallback } from 'react';

// interface Item {
//   colour: string;
// }

// interface DragDropContextState {
//   item: Item;
//   updateColor: (color: string) => Promise<void>;
// }

// const initialItem: Item = { colour: "white" };
// const DragDropContext = createContext<DragDropContextState>({
//   item: initialItem,
//   updateColor: async () => {}, // Placeholder function
// });

// export const useDragDropContext = () => useContext(DragDropContext);

// export const DragDropProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [item, setItem] = useState<Item>(initialItem);

//   const updateColor = useCallback(async (color: string) => {
//     setItem(prevItem => ({...prevItem, colour: color }));
//   }, []);

//   return (
//     <DragDropContext.Provider value={{ item, updateColor }}>
//       {children}
//     </DragDropContext.Provider>
//   );
// };