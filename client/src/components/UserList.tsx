import { Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import { useQueries } from "@tanstack/react-query";
import UserItem from "./UserItem";
import { BASE_URL } from "../App";


export type Todo = {
    _id: number;
    body: string;
    completed: boolean;
};
export type User = {
	_id: number;
	name: string;
	colour: string;
}

const UserList = () => {
    
    const result = useQueries({
		queries: [
			{
				queryKey: ["todos"],
				queryFn: async()=>{
					try{
						const res = await fetch(BASE_URL + "/todos")
						const data = await res.json()
						if(!res.ok){
							throw new Error(data.error || "Something went wrong")
						}
						return data || []
					}catch (error){
						console.log(error)
					}
				}
			},
			{
				queryKey: ["users"],
				queryFn: async()=>{
					try{
						const res = await fetch( BASE_URL + "/users")
						const data = await res.json()
						if(!res.ok){
							throw new Error(data.error || "Something went wrong")
						}
						return data || []
					}catch (error){
						console.log(error)
					}
				}
			}
			
		]
    })
	// const todos = result[0].data;
	// console.log(todos);
    // const isLoadingTodos = result[0].isLoading;
	// console.log(isLoadingTodos);
    const users = result[1]?.data;
	console.log(users);
    const isLoadingUsers = result[1].isLoading;
	// console.log(isLoadingUsers);
	return (
		<>
			<Text fontSize={"3xl"} textTransform={"uppercase"} fontWeight={"bold"} textAlign={"center"} my={2}>
				Users
			</Text>
			{/* {isLoadingTodos && (
				<Flex justifyContent={"center"} my={4}>
					<Spinner size={"xl"} />
				</Flex>
			)} */}
			{!isLoadingUsers && users?.length === 0 && (
				<Stack alignItems={"center"} gap='3'>
					<Text fontSize={"xl"} textAlign={"center"} color={"gray.500"}>
						No Users Added 🤞
					</Text>
					<img src='/go.png' alt='Go logo' width={70} height={70} />
				</Stack>
			)}
			<Stack gap={3}>
				{users?.map((user: User) => (
					 <UserItem key={user._id} user={user} />
					
				))}
			</Stack>
		</>
	);
};
export default UserList;