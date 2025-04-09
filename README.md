# Sample TODO Server


Starting the server:

```sh
node simple-todo-server.mjs
```

## API Documentation

### Endpoints

#### `GET /todos`
- **Description**: Retrieve a list of all tasks.
- **Response** (JSON): 
  - `200 OK`: Returns an array of tasks, each containing:
    - `id` (number): The unique identifier of the task.
    - `title` (string): The title of the task.
    - `completed` (boolean): The completion status of the task.

#### `POST /todos`
- **Description**: Create a new task.
- **Request Body** (JSON):
  - `title` (string, required): The title of the task.
  - `completed` (boolean, optional): The completion status of the task (default: `false`).
- **Response** (JSON):
  - `201 Created`: Returns the created task, including:
    - `id` (number): The unique identifier of the task.
    - `title` (string): The title of the task.
    - `completed` (boolean): The completion status of the task.

#### `PUT /todos/:id`
- **Description**: Update an existing task.
- **Path Parameters**:
  - `id` (number, required): The ID of the task to update.
- **Request Body** (JSON):
  - `title` (string, optional): The updated title of the task.
  - `completed` (boolean, optional): The updated completion status.
- **Response** (JSON):
  - `200 OK`: Returns the updated task, including:
    - `id` (number): The unique identifier of the task.
    - `title` (string): The updated title of the task.
    - `completed` (boolean): The updated completion status.

#### `DELETE /todos/:id`
- **Description**: Delete a task.
- **Path Parameters**:
  - `id` (number, required): The ID of the task to delete.
- **Response**:
  - `204 No Content`: Indicates successful deletion.

