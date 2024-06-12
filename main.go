package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

type Todo struct {
	ID        int    `json:"_id"`
	Completed bool   `json:"completed"`
	Body      string `json:"body"`
	Colour    string `json:"colour"`
}

type User struct {
	ID     int    `json:"user_id"`
	Name   string `json:"name"`
	Colour string `json:"colour"`
}

func main() {
	fmt.Println("Hello World")
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173",
		AllowHeaders: "Origin,Content-Type,Accept",
	}))

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("error loading .env file")
	}
	PORT := os.Getenv("PORT")

	todos := []Todo{}
	users := []User{}

	app.Get("/api/todos", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(todos)
	})

	app.Post("/api/todos", func(c *fiber.Ctx) error {
		todo := &Todo{}
		if err := c.BodyParser(todo); err != nil {
			return err
		}

		if todo.Body == "" {
			return c.Status(400).JSON(fiber.Map{"error": "Todo body is required"})
		}
		todo.ID = len(todos) + 1
		todos = append(todos, *todo)

		return c.Status(201).JSON(todo)
	})

	//Update a Todo
	app.Patch("/api/todos/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid todo ID"})
		}
		var updateRequest struct {
			Completed bool   `json:"completed"`
			Colour    string `json:"colour"`
		}
		if err := c.BodyParser(&updateRequest); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
		}
		for i, todo := range todos {
			if fmt.Sprint(todo.ID) == id {
				todos[i].Completed = updateRequest.Completed
				todos[i].Colour = updateRequest.Colour

				return c.Status(200).JSON(todos[i])
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "todo not found"})
	})

	//Delete a Todo
	app.Delete("/api/todos/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		for i, todo := range todos {
			if fmt.Sprint(todo.ID) == id {
				todos = append(todos[:i], todos[i+1:]...)
				return c.Status(200).JSON(fiber.Map{"success": "true"})
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "todo not found"})
	})
	//USERS
	app.Get("/api/users", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(users)
	})
	app.Post("/api/users", func(c *fiber.Ctx) error {
		user := &User{}
		if err := c.BodyParser(user); err != nil {
			return err
		}

		if user.Name == "" {
			return c.Status(400).JSON(fiber.Map{"error": "User name is required"})
		}
		user.ID = len(users) + 1
		users = append(users, *user)
		return c.Status(201).JSON(user)
	})
	//Delete a Todo
	app.Delete("/api/users/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		for i, user := range users {
			if fmt.Sprint(user.ID) == id {
				users = append(users[:i], users[i+1:]...)
				return c.Status(200).JSON(fiber.Map{"success": "true"})
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "user not found"})
	})

	log.Fatal(app.Listen(":" + PORT))
}
