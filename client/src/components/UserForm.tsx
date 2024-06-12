import { Button, Flex, Input, Select, Spinner, Text } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { BASE_URL } from "../App";

const UserForm = () => {
    const [newUser, setNewUser] = useState("");
    const [selectedColor, setSelectedColor] = useState(""); // Default color
    const queryClient = useQueryClient();
  
    const { mutate: createUser, isPending: isCreating } = useMutation({
      mutationKey: ['createUser'],
      mutationFn: async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const res = await fetch(BASE_URL + '/users', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: newUser, colour: selectedColor }),
          });
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.error || "Something went wrong");
          }
          setNewUser("");
          setSelectedColor("#FFFFFF"); // Reset color after successful creation
          return data;
        } catch (error: any) {
          throw new Error(error);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
      onError: (error: any) => {
        alert(error.message);
      },
    });
  
    return (
      <form onSubmit={createUser}>
        <Text fontSize={"2xl"} textTransform={"uppercase"} fontWeight={"bold"} textAlign={"center"} my={2}>
          Add Users
        </Text>
        <Flex gap={2}>
          <Input
            type='text'
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
            ref={(input) => input && input.focus()}
          />
          <Select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
            <option value="#FFFFFF">White</option>
            <option value="#000000">Black</option>
            <option value="#FF0000">Red</option>
            <option value="#00FF00">Green</option>
            <option value="#0000FF">Blue</option>
          </Select>
          <Button mx={2} type='submit' _active={{ transform: "scale(.97)" }}>
            {isCreating? <Spinner size={"xs"} /> : <IoMdAdd size={30} />}
          </Button>
        </Flex>
      </form>
    );
  };
  
  export default UserForm;