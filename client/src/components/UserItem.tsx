import { Flex, Text } from "@chakra-ui/react";
import { IconContext } from 'react-icons';
import { FaBeer } from 'react-icons/fa';
import { User } from "./TodoList";


const TodoUser = ({ user }: { user: User }) => {
   

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
                <IconContext.Provider value={{ color: user.colour, size: '50px' }}>
                <div>
                    <FaBeer />
                </div>
                </IconContext.Provider>
				<Text
					color={ "green.200"}
				>
					{user.name}
				</Text>
			</Flex>
		</Flex>
	);
};
export default TodoUser;