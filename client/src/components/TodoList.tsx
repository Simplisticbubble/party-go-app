import { Flex, Spinner, Stack, Text } from "@chakra-ui/react";

import TodoItem from "./TodoItem";
import { useQueries } from "@tanstack/react-query";
import { BASE_URL } from "../App";


export type Todo = {
    _id: number;
    body: string;
    completed: boolean;
	colour: string
};
export type User = {
	_id: number;
	name: string;
	colour: string;
}

const TodoList = () => {

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
			}
			
		]
    })
	const todos = result[0].data;
    const isLoadingTodos = result[0].isLoading;
    // const users = result[1]?.data;
    // const isLoadingUsers = result[1].isLoading;

	return (
		<>
			<Text fontSize={"4xl"} textTransform={"uppercase"} fontWeight={"bold"} textAlign={"center"} my={2}>
				Party's Tasks
			</Text>
			{isLoadingTodos && (
				<Flex justifyContent={"center"} my={4}>
					<Spinner size={"xl"} />
				</Flex>
			)}
			{!isLoadingTodos && todos?.length === 0 && (
				<Stack alignItems={"center"} gap='3'>
					<Text fontSize={"xl"} textAlign={"center"} color={"gray.500"}>
						All tasks completed! 🤞
					</Text>
					<img src='/go.png' alt='Go logo' width={70} height={70} />
				</Stack>
			)}
			<Stack gap={3}>
				{todos?.map((todo: Todo) => (
					<TodoItem key={todo._id} todo={todo} />
				))}
				
			</Stack>
		</>
	);
};
export default TodoList;