import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { IconContext } from 'react-icons';
import { PiCatFill } from "react-icons/pi";
import { User } from "./TodoList";
import { BASE_URL } from "../App";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";



const UserItem = ({ user }: { user: User }) => {

    
	const handleDragStart = (e: React.DragEvent, colour: string) => {
		e.dataTransfer.setData("colour", colour)
	}
	const queryClient = useQueryClient();
	const {mutate:deleteTodo, isPending:isDeleting} = useMutation({
        mutationKey: ["deleteUser"],
        mutationFn:async()=>{
            try{
                const res = await fetch(BASE_URL + `/users/${user._id}`,{
                    method:"DELETE",
                })
                const data = await res.json()
                if(!res.ok){
                    throw new Error(data.error || "Something went wrong");
                }
                return data
            }catch (error){
                console.log(error);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["users"]})
        }
    })

	return (
		<Flex gap={2} alignItems={"center"}>
			<Flex
				flex={1}
				alignItems={"center"}
				border={"1px"}
				borderColor={"gray.600"}
				p={2}
				borderRadius={"lg"}
				justifyContent={"space-between"}
			>
				<div draggable onDragStart={(e) => handleDragStart(e, user.colour)}>
					<IconContext.Provider value={{ color: user.colour, size: '50px' }}>
					<div>
						<PiCatFill/>
					</div>
                	</IconContext.Provider>
				</div>
				<Text
					color={ "green.200"}
				>
					{user.name}
				</Text>
			</Flex>
			
			<Box color={"red.500"} cursor={"pointer"} onClick={() => deleteTodo()}>
                    {!isDeleting && <MdDelete size={25}/>}
                    {isDeleting && <Spinner size={"sm"}/>}
					
				</Box>
		</Flex>
	);
};
export default UserItem;